import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useTheme, useLang, useApp } from '../context/AppContext';
import { IEElf, IEButton, IEInput, IEIcon } from '../components';

interface Props { onDone: () => void }

export function AuthScreen({ onDone }: Props) {
  const t = useTheme();
  const lang = useLang();
  const { set } = useApp();
  const [step, setStep] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const txt = lang === 'en' ? {
    tagline: 'Your family item finder',
    email: 'Email', password: 'Password', name: 'Full name',
    login: 'Sign in', signup: 'Create account',
    bio: 'Use Face ID / Fingerprint',
    or: 'or',
    switchToSignup: "Don't have an account? Sign up",
    switchToLogin: 'Already have an account? Sign in',
  } : {
    tagline: '你的家庭尋物小精靈',
    email: '電子郵件', password: '密碼', name: '姓名',
    login: '登入', signup: '建立帳號',
    bio: '使用 Face ID / 生物辨識',
    or: '或',
    switchToSignup: '還沒有帳號？立即註冊',
    switchToLogin: '已經有帳號？直接登入',
  };

  async function handleBiometric() {
    const supported = await LocalAuthentication.hasHardwareAsync();
    if (!supported) {
      Alert.alert(lang === 'en' ? 'Not supported' : '不支援', lang === 'en' ? 'Biometric not available' : '此裝置不支援生物辨識');
      return;
    }
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: lang === 'en' ? 'Sign in to ItemElf' : '登入 ItemElf',
      fallbackLabel: lang === 'en' ? 'Use password' : '使用密碼',
    });
    if (result.success) {
      set({ isLoggedIn: true });
      onDone();
    }
  }

  function handleSubmit() {
    set({ isLoggedIn: true });
    onDone();
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.bg }}
      contentContainerStyle={[s.container]}
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
            onChangeText={setName}
            icon={<IEIcon name="face" size={18} color={t.textMuted} />}
            autoCapitalize="words"
          />
        )}
        <IEInput
          placeholder={txt.email}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          icon={<Text style={{ color: t.textMuted, fontSize: 14 }}>@</Text>}
        />
        <IEInput
          placeholder={txt.password}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          icon={<IEIcon name="lock" size={18} color={t.textMuted} />}
        />

        <IEButton variant="primary" full size="lg" onPress={handleSubmit}>
          {step === 'signup' ? txt.signup : txt.login}
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

        <TouchableOpacity onPress={() => setStep(step === 'login' ? 'signup' : 'login')} style={s.switchBtn}>
          <Text style={[s.switchText, { color: t.primary }]}>
            {step === 'login' ? txt.switchToSignup : txt.switchToLogin}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flexGrow: 1, paddingHorizontal: 24, paddingVertical: 40 },
  hero:      { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 40 },
  appName:   { fontSize: 26, fontWeight: '700', marginTop: 20 },
  tagline:   { fontSize: 14 },
  form:      { gap: 10 },
  divider:   { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 6 },
  line:      { flex: 1, height: 1 },
  or:        { fontSize: 12 },
  switchBtn: { paddingVertical: 10, alignItems: 'center' },
  switchText:{ fontSize: 13, fontWeight: '500' },
});
