import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://localhost:5555";

interface LoginRequest {
  nationalId: string;
  password: string;
}

interface UserData {
  title: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  password: string;
}

// Login
export const login = async ({ nationalId, password }: LoginRequest) => {
  const res = await fetch(`${BASE_URL}/Tokens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nationalId,
      password,
    }),
  });

  if (!res.ok) throw new Error("Login failed");

  const data = await res.json();

  // Save token in AsyncStorage
  await AsyncStorage.setItem("token", data.token);

  return data;
};

// Register
export const register = async (userData: UserData) => {
  const res = await fetch(`${BASE_URL}/Users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Register failed");
  }

  return await res.json();
};
