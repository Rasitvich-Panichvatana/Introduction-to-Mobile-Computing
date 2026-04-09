import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function Register() {
  return (
    <View>
      <Text>Register Page</Text>

      <Button title="Back to Login" onPress={() => router.replace("/login")} />
    </View>
  );
}
