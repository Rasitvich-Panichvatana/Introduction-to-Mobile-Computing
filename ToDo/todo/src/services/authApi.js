const BASE_URL = "http://localhost:5555";

// ✅ LOGIN
export const login = async (nationalId, password) => {
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

  // 🔐 save token
  localStorage.setItem("token", data.token);

  return data;
};

// ✅ REGISTER
export const register = async (userData) => {
  const res = await fetch(`${BASE_URL}/Users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return await res.json();
};
