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

export const deleteAnimal = async (id: string) => {
  try {
    const res = await api.delete(`/animal/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting animal:", error);
    throw error;
  }
};
