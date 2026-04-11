import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { login } from "@/lib/api/authApi";

export default function Login() {
  const [nationalId, setNationalId] = useState("");
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState("");

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

      <Text style={styles.inputLabel}>National ID</Text>
      <TextInput
        placeholder="National ID"
        value={nationalId}
        onChangeText={setNationalId}
        keyboardType="number-pad"
        maxLength={13}
        style={[
          styles.input,
          focusedInput === "nationalId" && styles.inputFocused,
        ]}
        onFocus={() => setFocusedInput("nationalId")}
        onBlur={() => setFocusedInput("")}
      />

      <Text style={styles.inputLabel}>Password</Text>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        keyboardType="default"
        secureTextEntry={true}
        autoCorrect={false}
        style={[
          styles.input,
          focusedInput === "password" && styles.inputFocused,
        ]}
        onFocus={() => setFocusedInput("password")}
        onBlur={() => setFocusedInput("")}
      />

      <Pressable style={styles.btnLogin} onPress={handleLogin}>
        <Text style={styles.btnLoginText}>Login</Text>
      </Pressable>

      <Pressable
        style={styles.btnRegister}
        onPress={() => router.replace("/register")}
      >
        <Text style={styles.btnRegisterText}>Create new account</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    paddingVertical: 100,
    paddingHorizontal: 28,
    flex: 1,
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    marginTop: 56,
    marginBottom: 42,
    color: "#000",
  },
  inputLabel: {
    fontSize: 14,
  },
  input: {
    height: 40,
    marginTop: 6,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#d0d0d0",
    padding: 10,
    color: "#333",
  },
  inputFocused: {
    borderColor: "#222",
    color: "#222",
  },

  btnLogin: {
    marginVertical: 16,
    backgroundColor: "#0a7ea4",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#0a7ea4",
    borderRadius: 20,
  },
  btnLoginText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },
  btnRegister: {
    alignSelf: "center",
    marginTop: 8,
  },
  btnRegisterText: {
    fontSize: 16,
  },
});
