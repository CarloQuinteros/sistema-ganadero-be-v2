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
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value === null || value === undefined) return;

      if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (value instanceof File) {
        formData.append("image", value);
      } else {
        formData.append(key, String(value));
      }
    });
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    const res = await api.post("/animal", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error: any) {
    console.log("BACKEND RESPONSE:", error.response?.data);

    throw error;
  }
};

export const updateAnimal = async (id: string, data: AnimalFormValues) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    if (value instanceof Date) {
      formData.append(key, value.toISOString());
    } else if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  });

  const res = await api.put(`/animal/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
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
