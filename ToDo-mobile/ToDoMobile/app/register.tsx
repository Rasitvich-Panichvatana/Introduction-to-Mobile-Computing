import { View, Text, Button, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Register() {
  return (
    <View style={styles.main}>
      <Text>Register Page</Text>

      <Button title="Back to Login" onPress={() => router.replace("/login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingVertical: 100,
    paddingHorizontal: 20,
  },
});
