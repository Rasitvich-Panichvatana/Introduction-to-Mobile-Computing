import { Stack, Redirect, useSegments } from "expo-router";

export default function RootLayout() {
  const isLoggedIn = false;
  const segments = useSegments();

  const inAuthScreen = segments[0] === "login" || segments[0] === "register";

  if (!isLoggedIn && !inAuthScreen) {
    return <Redirect href="/login" />;
  }

  return <Stack />;
}
