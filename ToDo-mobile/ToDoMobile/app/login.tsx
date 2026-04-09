import { View, Button, Text, TextInput, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { login } from "@/lib/api/authApi";

export default function Login() {
  const [nationalId, setNationalId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login({ nationalId, password });

      router.replace("/(tabs)");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="National ID"
        value={nationalId}
        onChangeText={setNationalId}
        keyboardType="number-pad"
        style={styles.loginInput}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        keyboardType="default"
        style={styles.loginInput}
      />

      <Button title="Login" onPress={handleLogin} />

      <Button
        title="Go to Register"
        onPress={() => router.replace("/register")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#222",
  },
  loginInput: {
    height: 40,
    marginVertical: 12,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#d0d0d0",
    padding: 10,
  },
});
