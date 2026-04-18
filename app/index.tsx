import { Redirect } from 'expo-router';
import { useApp } from '../src/context/AppContext';

export default function Index() {
  const { state } = useApp();
  return <Redirect href={state.isLoggedIn ? '/(tabs)/' : '/auth'} />;
}
