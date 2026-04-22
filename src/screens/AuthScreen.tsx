import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { useTheme, useLang, useApp } from '../context/AppContext';
import { IEElf, IEButton, IEInput, IEIcon } from '../components';

const STORAGE_KEY = 'itemelf_users';
const LAST_USER_KEY = 'itemelf_last_user';
const AVATAR_COLORS = ['#b8764a', '#6b8e5a', '#6a9ad9', '#d99b4a', '#9b6ad9', '#d96a6a'];

interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

function avatarColor(email: string) {
  let h = 0;
  for (let i = 0; i < email.length; i++) h = (h * 31 + email.charCodeAt(i)) % AVATAR_COLORS.length;
  return AVATAR_COLORS[h];
}

async function getUsers(): Promise<StoredUser[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

async function saveUser(user: StoredUser) {
  const users = await getUsers();
  users.push(user);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

async function getLastUser(): Promise<StoredUser | null> {
  try {
    const raw = await AsyncStorage.getItem(LAST_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

async function saveLastUser(user: StoredUser) {
  await AsyncStorage.setItem(LAST_USER_KEY, JSON.stringify(user));
}

interface Props { onDone: () => void }

export function AuthScreen({ onDone }: Props) {
  const t = useTheme();
  const lang = useLang();
  const { set } = useApp();
  const [step, setStep] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const txt = lang === 'en' ? {
    tagline: 'Your family item finder',
    email: 'Email', password: 'Password', name: 'Full name',
    login: 'Sign in', signup: 'Create account',
    bio: 'Use Face ID / Fingerprint',
    or: 'or',
    switchToSignup: "Don't have an account? Sign up",
    switchToLogin: 'Already have an account? Sign in',
    errName: 'Please enter your name',
    errEmail: 'Please enter a valid email',
    errPassword: 'Password must be at least 6 characters',
    errNotFound: 'No account found with this email and password',
    errExists: 'An account with this email already exists',
  } : {
    tagline: '你的家庭尋物小精靈',
    email: '電子郵件', password: '密碼', name: '姓名',
    login: '登入', signup: '建立帳號',
    bio: '使用 Face ID / 生物辨識',
    or: '或',
    switchToSignup: '還沒有帳號？立即註冊',
    switchToLogin: '已經有帳號？直接登入',
    errName: '請輸入姓名',
    errEmail: '請輸入有效的電子郵件',
    errPassword: '密碼至少需要 6 個字元',
    errNotFound: '找不到符合的帳號，請確認信箱或密碼',
    errExists: '此電子郵件已有帳號',
  };

  function validate(): string {
    if (step === 'signup' && !name.trim()) return txt.errName;
    if (!email.includes('@') || !email.includes('.')) return txt.errEmail;
    if (password.length < 6) return txt.errPassword;
    return '';
  }

  async function handleSignup() {
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    setError('');
    const users = await getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      setError(txt.errExists);
      setLoading(false);
      return;
    }
    const newUser: StoredUser = {
      id: `u_${Date.now()}`,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      avatar: avatarColor(email),
    };
    await saveUser(newUser);
    set({
      isLoggedIn: true,
      currentUser: { id: newUser.id, name: newUser.name, email: newUser.email, avatar: newUser.avatar },
    });
    setLoading(false);
    onDone();
  }

  async function handleLogin() {
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    setError('');
    const users = await getUsers();
    const found = users.find(
      u => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
    );
    if (!found) {
      setError(txt.errNotFound);
      setLoading(false);
      return;
    }
    await saveLastUser(found);
    set({
      isLoggedIn: true,
      currentUser: { id: found.id, name: found.name, email: found.email, avatar: found.avatar },
    });
    setLoading(false);
    onDone();
  }

  function handleSubmit() {
    if (step === 'signup') handleSignup();
    else handleLogin();
  }

  async function handleBiometric() {
    if (Platform.OS === 'web') { handleSubmit(); return; }
    const supported = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!supported || !enrolled) {
      Alert.alert(
        lang === 'en' ? 'Face ID not available' : 'Face ID 無法使用',
        lang === 'en'
          ? `Hardware: ${supported}, Enrolled: ${enrolled}. Please set up Face ID in iPhone Settings.`
          : `硬體支援: ${supported}，已設定: ${enrolled}。\n請至「設定 → Face ID 與密碼」確認已設定。`
      );
      return;
    }
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: lang === 'en' ? 'Sign in to ItemElf' : '登入 ItemElf',
      fallbackLabel: lang === 'en' ? 'Use password' : '使用密碼',
    });
    if (!result.success) return;
    // Use last logged-in user after biometric passes
    const last = await getLastUser();
    if (!last) {
      Alert.alert('', lang === 'en' ? 'Please sign in with your password first.' : '請先用密碼登入一次。');
      return;
    }
    set({
      isLoggedIn: true,
      currentUser: { id: last.id, name: last.name, email: last.email, avatar: last.avatar },
    });
    onDone();
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.bg }}
      contentContainerStyle={s.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={s.hero}>
        <IEElf size={112} />
        <Text style={[s.appName, { color: t.text }]}>ItemElf</Text>
        <Text style={[s.tagline, { color: t.textMuted }]}>{txt.tagline}</Text>
      </View>

      <View style={s.form}>
        {step === 'signup' && (
          <IEInput
            placeholder={txt.name}
            value={name}
            onChangeText={v => { setName(v); setError(''); }}
            icon={<IEIcon name="face" size={18} color={t.textMuted} />}
            autoCapitalize="words"
          />
        )}
        <IEInput
          placeholder={txt.email}
          value={email}
          onChangeText={v => { setEmail(v); setError(''); }}
          keyboardType="email-address"
          autoCapitalize="none"
          icon={<Text style={{ color: t.textMuted, fontSize: 14 }}>@</Text>}
        />
        <IEInput
          placeholder={txt.password}
          value={password}
          onChangeText={v => { setPassword(v); setError(''); }}
          secureTextEntry
          icon={<IEIcon name="lock" size={18} color={t.textMuted} />}
        />

        {!!error && (
          <Text style={[s.errorText, { color: t.danger }]}>{error}</Text>
        )}

        <IEButton variant="primary" full size="lg" onPress={handleSubmit} disabled={loading}>
          {loading ? '…' : (step === 'signup' ? txt.signup : txt.login)}
        </IEButton>

        {step === 'login' && (
          <>
            <View style={s.divider}>
              <View style={[s.line, { backgroundColor: t.border }]} />
              <Text style={[s.or, { color: t.textSubtle }]}>{txt.or}</Text>
              <View style={[s.line, { backgroundColor: t.border }]} />
            </View>
            <IEButton
              variant="soft" full size="lg"
              onPress={handleBiometric}
              icon={<IEIcon name="finger" size={20} color={t.text} />}
            >
              {txt.bio}
            </IEButton>
          </>
        )}

        <TouchableOpacity
          onPress={() => { setStep(step === 'login' ? 'signup' : 'login'); setError(''); }}
          style={s.switchBtn}
        >
          <Text style={[s.switchText, { color: t.primary }]}>
            {step === 'login' ? txt.switchToSignup : txt.switchToLogin}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container:  { flexGrow: 1, paddingHorizontal: 24, paddingVertical: 40 },
  hero:       { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 40 },
  appName:    { fontSize: 26, fontWeight: '700', marginTop: 20 },
  tagline:    { fontSize: 14 },
  form:       { gap: 10 },
  divider:    { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 6 },
  line:       { flex: 1, height: 1 },
  or:         { fontSize: 12 },
  switchBtn:  { paddingVertical: 10, alignItems: 'center' },
  switchText: { fontSize: 13, fontWeight: '500' },
  errorText:  { fontSize: 13, textAlign: 'center', marginVertical: 2 },
});
