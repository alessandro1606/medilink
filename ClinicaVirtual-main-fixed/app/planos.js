import React from 'react';
import PlanosView from './view/PlanosView';
import { useNavigation } from 'expo-router';

export default function Page() {
  const navigation = useNavigation();
  return <PlanosView navigation={navigation} />;
}