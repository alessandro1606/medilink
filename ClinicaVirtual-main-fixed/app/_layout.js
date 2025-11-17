import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'MediLink' }} />
      <Stack.Screen name="exams" options={{ title: 'Exames' }} />
      <Stack.Screen name="planos" options={{ title: 'Planos' }} />
    </Stack>
  );
}