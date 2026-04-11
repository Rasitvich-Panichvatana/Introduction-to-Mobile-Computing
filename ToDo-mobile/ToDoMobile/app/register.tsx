import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { register } from "@/lib/api/authApi";

export default function Register() {
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState("");

  const handleRegister = async () => {
    try {
      await register({ title, firstName, lastName, nationalId, password });
      alert("Register successful");
    } catch (err) {
      console.error(err);
      alert("Register failed");
    }
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.subTitle}>Create new account</Text>
      <Text style={styles.inputLabel}>Title</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        keyboardType="default"
        maxLength={10}
        style={[styles.input, focusedInput === "title" && styles.inputFocused]}
        onFocus={() => setFocusedInput("title")}
        onBlur={() => setFocusedInput("")}
      />
      <Text style={styles.inputLabel}>First Name</Text>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        keyboardType="default"
        maxLength={10}
        style={[
          styles.input,
          focusedInput === "firstName" && styles.inputFocused,
        ]}
        onFocus={() => setFocusedInput("firstName")}
        onBlur={() => setFocusedInput("")}
      />
      <Text style={styles.inputLabel}>Last Name</Text>
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        keyboardType="default"
        maxLength={10}
        style={[
          styles.input,
          focusedInput === "lastName" && styles.inputFocused,
        ]}
        onFocus={() => setFocusedInput("lastName")}
        onBlur={() => setFocusedInput("")}
      />
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

      <Pressable style={styles.btnRegister} onPress={handleRegister}>
        <Text style={styles.btnRegisterText}>Create an account</Text>
      </Pressable>

      <Pressable
        style={styles.btnLogin}
        onPress={() => router.replace("/login")}
      >
        <Text style={styles.btnLoginText}>Back to Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    paddingVertical: 42,
    paddingHorizontal: 28,
    flex: 1,
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    marginTop: 56,
    marginBottom: 6,
    color: "#000",
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 24,
    color: "#222",
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
  btnRegister: {
    marginVertical: 16,
    backgroundColor: "#0a7ea4",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#0a7ea4",
    borderRadius: 20,
  },
  btnRegisterText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },
  btnLogin: {
    alignSelf: "center",
    marginTop: 8,
  },
  btnLoginText: {
    fontSize: 16,
  },
});
