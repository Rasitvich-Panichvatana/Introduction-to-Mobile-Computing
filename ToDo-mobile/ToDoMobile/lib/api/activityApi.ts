import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://localhost:5555/Activities";

export interface Activity {
  id: number;
  name: string;
  when: string;
}

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

// GET ALL ACTIVITY
export const getActivities = async () => {
  const headers = await getHeaders();

  const res = await fetch(BASE_URL, {
    method: "GET",
    headers,
  });

  return handleResponse(res);
};

// GET ONE ACTIVITY
export const getActivityById = async (id: number) => {
  const headers = await getHeaders();

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
    headers,
  });

  return handleResponse(res);
};

// CREATE ACTIVITY
export const createActivity = async (activity: Activity) => {
  const headers = await getHeaders();
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(activity),
  });

  return handleResponse(res);
};

// UPDATE ACTIVITY
export const updateActivity = async (id: number, activity: Activity) => {
  const headers = await getHeaders();
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(activity),
  });

  return handleResponse(res);
};

// DELETE ACTIVITY
export const deleteActivity = async (id: number) => {
  const headers = await getHeaders();
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers,
  });

  return handleResponse(res);
};
