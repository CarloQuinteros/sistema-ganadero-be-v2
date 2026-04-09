import api from "@/api/axios";

export const loginRequest = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Email or password incorrect" };
  }
};
