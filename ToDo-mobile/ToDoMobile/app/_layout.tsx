import { Stack, Redirect, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const segments = useSegments();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuth();
  }, []);

  if (isLoggedIn === null) {
    return null;
  }

  const inAuthScreen = segments[0] === "login" || segments[0] === "register";

  if (!isLoggedIn && !inAuthScreen) {
    return <Redirect href="/login" />;
  }

  if (isLoggedIn && inAuthScreen) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
