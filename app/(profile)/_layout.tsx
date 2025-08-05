import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="personal-info" />
      <Stack.Screen name="edit-info" />
      <Stack.Screen name="change-password" />
      <Stack.Screen name="language" />
      <Stack.Screen name="theme" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="security" />
      <Stack.Screen name="help" />
    </Stack>
  );
}