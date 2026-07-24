import { Tabs } from 'expo-router';
import React from 'react';
import { TabBar } from '@/components/layouts/Tapbar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Accueil' }}
      />
      <Tabs.Screen
        name="posts"
        options={{ title: 'Posts' }}
      />
      <Tabs.Screen
        name="bourses"
        options={{ title: 'Bourses' }}
      />
      <Tabs.Screen
        name="services"
        options={{ title: 'Services' }}
      />
      <Tabs.Screen
        name="profil"
        options={{ title: 'Profil' }}
      />
    </Tabs>
  );
}
