import api from "./api.js"

export async function loginUser(loginData){
    const response = await api.post("/auth/login", loginData);
    return response.data;
}

export async function registerUser(registerData) {
  const response = await api.post("/auth/register", registerData);
  return response.data;
}