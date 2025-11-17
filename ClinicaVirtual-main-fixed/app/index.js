import React from 'react';
import HomeView from './view/HomeView';
import { useNavigation } from 'expo-router';

export default function Page() {
  const navigation = useNavigation();
  return <HomeView navigation={navigation} />;
}