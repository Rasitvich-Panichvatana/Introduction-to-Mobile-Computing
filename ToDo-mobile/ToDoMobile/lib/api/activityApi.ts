import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://localhost:5555/Activities";

// Get token
const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

// Common headers
const getHeaders = async () => {
  const token = await getToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Handle response
const handleResponse = async (res: Response) => {
  if (res.status === 204) return [];

  if (res.status === 401) {
    return;
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }

  return res.json();
};

// GET all Activities
export const getActivities = async () => {
  const headers = await getHeaders();

  const res = await fetch(BASE_URL, {
    method: "GET",
    headers,
  });

  return handleResponse(res);
};
