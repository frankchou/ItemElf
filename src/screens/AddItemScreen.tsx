import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput,
} from 'react-native';
import { useTheme, useLang, useApp } from '../context/AppContext';
import { IEButton, IEIcon, IEImage } from '../components';
import { categories } from '../data/mock';

interface Props { onDone: () => void; onBack: () => void }

export function AddItemScreen({ onDone, onBack }: Props) {
  const t = useTheme();
  const lang = useLang();
  const { state } = useApp();
  const variant = state.addVariant;
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [loc, setLoc] = useState('');
  const [cat, setCat] = useState('food');
  const [scope, setScope] = useState<'family' | 'personal'>('family');
  const [purchased, setPurchased] = useState('');
  const [expires, setExpires] = useState('');
  const [note, setNote] = useState('');

  const T = lang === 'en' ? {
    name: 'Item name', nameHint: 'e.g. Fresh milk 1L',
    photo: 'Item photo', locPhoto: 'Location photo',
    loc: 'Location', locHint: 'e.g. Fridge · Shelf 2',
    exp: 'Expires on', purchased: 'Purchased on',
    cat: 'Category', scope: 'Scope',
    family: 'Family', personal: 'Personal only',
    note: 'Note (optional)', save: 'Save item',
    next: 'Next', back: 'Back',
    tapPhoto: 'Tap to take photo', addLocPhoto: 'Add location photo',
    stepTitles: ['Photos', 'Basics', 'Dates & scope'],
  } : {
    name: '品名', nameHint: '例：鮮奶 1L',
    photo: '物品照片', locPhoto: '放置位置照片',
    loc: '放置位置', locHint: '例：冰箱 第二層',
    exp: '有效期限', purchased: '購買日期',
    cat: '物品分類', scope: '通知範圍',
    family: '家庭共用', personal: '僅個人可見',
    note: '備註（可選）', save: '儲存',
    next: '下一步', back: '上一步',
    tapPhoto: '點擊拍照', addLocPhoto: '加入位置照片',
    stepTitles: ['拍照', '基本資料', '日期與範圍'],
  };

  const labelSt = { fontSize: 12, fontWeight: '600' as const, color: t.textMuted, marginBottom: 6 };
  const inputSt = {
    fontSize: 15, color: t.text, borderWidth: 1,
    borderColor: t.border, borderRadius: 12,
    backgroundColor: t.surface, padding: 12,
  };

  const photoStep = (
    <View style={{ gap: 20 }}>
      <View>
        <Text style={labelSt}>{T.photo}</Text>
        <TouchableOpacity style={[s.photoBox, { borderColor: t.border, backgroundColor: t.surface2 }]}>
          <IEIcon name="camera" size={32} color={t.textMuted} />
          <Text style={{ fontSize: 13, color: t.textMuted, marginTop: 8 }}>{T.tapPhoto}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={labelSt}>{T.locPhoto}</Text>
        <TouchableOpacity style={[s.photoBoxSm, { borderColor: t.border, backgroundColor: t.surface2 }]}>
          <IEIcon name="pin" size={24} color={t.textMuted} />
          <Text style={{ fontSize: 13, color: t.textMuted, marginTop: 8 }}>{T.addLocPhoto}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const basicsStep = (
    <View style={{ gap: 18 }}>
      <View>
        <Text style={labelSt}>{T.name}</Text>
        <TextInput style={inputSt} placeholder={T.nameHint} placeholderTextColor={t.textSubtle} value={name} onChangeText={setName} />
      </View>
      <View>
        <Text style={labelSt}>{T.loc}</Text>
        <TextInput style={inputSt} placeholder={T.locHint} placeholderTextColor={t.textSubtle} value={loc} onChangeText={setLoc} />
      </View>
      <View>
        <Text style={labelSt}>{T.cat}</Text>
        <View style={s.catGrid}>
          {categories.map(c => (
            <TouchableOpacity key={c.id} onPress={() => setCat(c.id)}
              style={[s.catBtn, { backgroundColor: cat === c.id ? t.primarySoft : t.surface, borderColor: cat === c.id ? t.primary : t.border }]}>
              <Text style={{ fontSize: 20 }}>{c.icon}</Text>
              <Text style={{ fontSize: 11, color: t.text, textAlign: 'center' }}>{lang === 'en' ? c.en : c.zh}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const datesStep = (
    <View style={{ gap: 18 }}>
      <View>
        <Text style={labelSt}>{T.purchased}</Text>
        <TextInput style={inputSt} placeholder="YYYY-MM-DD" placeholderTextColor={t.textSubtle} value={purchased} onChangeText={setPurchased} />
      </View>
      <View>
        <Text style={labelSt}>{T.exp}</Text>
        <TextInput style={inputSt} placeholder="YYYY-MM-DD" placeholderTextColor={t.textSubtle} value={expires} onChangeText={setExpires} />
      </View>
      <View>
        <Text style={labelSt}>{T.scope}</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {(['family', 'personal'] as const).map(v => (
            <TouchableOpacity key={v} onPress={() => setScope(v)}
              style={[s.scopeBtn, { flex: 1, backgroundColor: scope === v ? t.primarySoft : t.surface, borderColor: scope === v ? t.primary : t.border }]}>
              <Text style={{ fontSize: 13, fontWeight: '700', color: t.text }}>{v === 'family' ? T.family : T.personal}</Text>
              <Text style={{ fontSize: 11, color: t.textMuted, marginTop: 4 }}>
                {lang === 'en' ? (v === 'family' ? 'Visible to all family' : 'Only you') : (v === 'family' ? '家中成員都看得到' : '僅本人可見')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View>
        <Text style={labelSt}>{T.note}</Text>
        <TextInput
          style={[inputSt, { minHeight: 72, textAlignVertical: 'top' }]}
          placeholder={lang === 'en' ? 'Optional note…' : '選填備註…'}
          placeholderTextColor={t.textSubtle}
          value={note} onChangeText={setNote}
          multiline numberOfLines={3}
        />
      </View>
    </View>
  );

  const steps = [photoStep, basicsStep, datesStep];

  if (variant === 'single') {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={s.single}>
        {steps.map((st, i) => <React.Fragment key={i}>{st}</React.Fragment>)}
        <IEButton variant="primary" full size="lg" onPress={onDone}>{T.save}</IEButton>
      </ScrollView>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      {/* Progress */}
      <View style={s.progress}>
        {[0, 1, 2].map(i => (
          <View key={i} style={[s.progressBar, { flex: 1, backgroundColor: i <= step ? t.primary : t.border }]} />
        ))}
      </View>
      <View style={s.stepHeader}>
        <Text style={[s.stepSub, { color: t.textMuted }]}>
          {lang === 'en' ? `Step ${step + 1} of 3` : `步驟 ${step + 1} / 3`}
        </Text>
        <Text style={[s.stepTitle, { color: t.text }]}>{T.stepTitles[step]}</Text>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={s.stepBody}>
        {steps[step]}
      </ScrollView>
      <View style={s.stepActions}>
        {step > 0 && <IEButton variant="soft" size="lg" onPress={() => setStep(s => s - 1)}>{T.back}</IEButton>}
        <IEButton variant="primary" full size="lg" onPress={() => step < 2 ? setStep(s => s + 1) : onDone()}>
          {step < 2 ? T.next : T.save}
        </IEButton>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  single:       { padding: 16, paddingBottom: 140, gap: 20 },
  photoBox:     { height: 200, borderRadius: 16, borderWidth: 2, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' },
  photoBoxSm:   { height: 140, borderRadius: 16, borderWidth: 2, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' },
  catGrid:      { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  catBtn:       { width: '22%', paddingVertical: 10, borderRadius: 10, borderWidth: 1, alignItems: 'center', gap: 4 },
  scopeBtn:     { padding: 14, borderRadius: 12, borderWidth: 1 },
  progress:     { flexDirection: 'row', gap: 4, padding: 16 },
  progressBar:  { height: 4, borderRadius: 2 },
  stepHeader:   { paddingHorizontal: 16, marginBottom: 8 },
  stepSub:      { fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.6 },
  stepTitle:    { fontSize: 20, fontWeight: '700', marginTop: 2 },
  stepBody:     { paddingHorizontal: 16, paddingBottom: 20 },
  stepActions:  { flexDirection: 'row', gap: 10, padding: 16 },
});
