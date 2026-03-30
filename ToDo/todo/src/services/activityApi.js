const BASE_URL = "https://localhost:5001/Activities";

// 🔐 Get token
const getToken = () => localStorage.getItem("token");

// 🔐 Common headers
const getHeaders = () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
};

// 🛠️ Handle response
const handleResponse = async (res) => {
  if (res.status === 204) return [];

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }

  return res.json();
};

// ✅ GET ALL ACTIVITIES
export const getActivities = async () => {
  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: getHeaders(),
  });

  return handleResponse(res);
};

// ✅ GET ONE ACTIVITY
export const getActivityById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });

  return handleResponse(res);
};

// ✅ CREATE ACTIVITY
export const createActivity = async (activity) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(activity),
  });

  return handleResponse(res);
};

// ✅ UPDATE ACTIVITY
export const updateActivity = async (id, activity) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(activity),
  });

  return handleResponse(res);
};

// ✅ DELETE ACTIVITY
export const deleteActivity = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  return handleResponse(res);
};
