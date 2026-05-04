import api from "@/api/axios";
import type { AnimalFormValues } from "@/schemas/animalSchema";

export const getAnimals = async () => {
  try {
    const res = await api.get("/animal");
    return res.data;
  } catch (error) {
    console.error("Error fetching animals:", error);
    throw error;
  }
};

export const createAnimal = async (data: AnimalFormValues) => {
  try {
    console.log("DATA QUE ENVÍAS:", data);
    const res = await api.post("/animal", data);

    return res.data;
  } catch (error: any) {
    console.log("BACKEND RESPONSE:", error.response?.data);

    throw error;
  }
};

export const deleteAnimal = async (id: string) => {
  try {
    const res = await api.delete(`/animal/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting animal:", error);
    throw error;
  }
};
