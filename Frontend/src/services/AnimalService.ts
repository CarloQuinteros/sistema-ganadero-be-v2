import api from "@/api/axios";

export const getAnimals = async () => {
  try {
    const res = await api.get("/animal");
    return res.data;
  } catch (error) {
    console.error("Error fetching animals:", error);
    throw error;
  }
};
