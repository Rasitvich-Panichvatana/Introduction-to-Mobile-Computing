import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const user = () => {
  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("token");

      router.replace("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <View style={styles.main}>
      <Text>user</Text>
      <Pressable style={styles.btnSignOut} onPress={handleSignOut}>
        <Text style={styles.btnSignOutText}>Sign Out</Text>
      </Pressable>
    </View>
  );
};

export default user;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
    paddingVertical: 100,
  },
  btnSignOut: {},
  btnSignOutText: {
    textAlign: "center",
  },
});
