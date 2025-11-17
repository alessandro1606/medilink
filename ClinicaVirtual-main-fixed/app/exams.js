import React from 'react';
import ExamsView from './view/ExamsView';
import { useNavigation } from 'expo-router';

export default function Page() {
  const navigation = useNavigation();
  return <ExamsView navigation={navigation} />;
}