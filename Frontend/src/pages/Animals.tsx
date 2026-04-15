import { useState, useEffect } from "react";
import { getAnimals, deleteAnimal } from "@/services/AnimalService";

function Animals() {
  const [animals, setAnimals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    sex: "",
    breed: "",
    ageAtEntry: "",
    weightAtEntry: "",
    earTag: "",
    purpose: "",
  });

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    try {
      const res = await getAnimals();
      setAnimals(res.data);
    } catch (error) {}
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este animal?",
    );
    if (!confirmDelete) return;

    try {
      await deleteAnimal(id);
      fetchAnimals();
    } catch (error) {
      console.error("Error deleting animal:", error);
    }
  };
  return (
    <div>
      <h1 className="text-2xl mb-5">Lista de animales</h1>
      <button
        className="bg-green-600 hover:bg-green-800 text-white font-bold py-1 px-2 rounded mb-4"
        onClick={() => setShowForm(true)}
      >
        Crear Animal
      </button>
      <table className="w-full  table-fixed text-center">
        <thead className="bg-gray-200">
          <tr>
            <th className="w-20 p-3">N° Caravana</th>
            <th className="w-24 p-3">Fotos</th>
            <th className="w-18 p-3">Raza</th>
            <th className="w-24 p-3">Proposito</th>
            <th className="w-16 p-3">Sexo</th>
            <th className="w-16 p-3">Peso</th>
            <th className="w-20 p-3">Acciones</th>
          </tr>
        </thead>
        <tbody className="mt-5">
          {animals.map((animal: any) => (
            <tr key={animal.id} className="items-center border-b">
              <td>{animal.earTag}</td>
              <td>
                <img
                  src={`http://localhost:3000${animal.imageUrl}`}
                  alt={`Foto de ${animal.earTag}`}
                  className="w-16 h-16 object-cover rounded mx-auto"
                />
              </td>
              <td>{capitalizeFirstLetter(animal.breed)}</td>

              <td>{capitalizeFirstLetter(animal.purpose)}</td>
              <td>{capitalizeFirstLetter(animal.sex)}</td>
              <td>{`${animal.weightAtEntry} Kg`}</td>
              <td>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                  Editar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-3"
                  onClick={() => handleDelete(animal.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form className="bg-white p-6 rounded w-96">
            <label htmlFor="earTag">EarTag:</label>
            <input id="earTag" type="number" placeholder="EarTag" />
            <label htmlFor="breed">Breed:</label>
            <input id="breed" type="text" placeholder="Breed" />
            <label htmlFor="purpose">Purpose:</label>
            <input id="purpose" type="text" placeholder="Purpose" />
            <label htmlFor="sex">Sex:</label>
            <input id="sex" type="text" placeholder="Sex" />
            <label htmlFor="weightAtEntry">Weight at Entry:</label>
            <input
              id="weightAtEntry"
              type="number"
              placeholder="Weight at Entry"
            />

            <button type="submit" className="bg-green-700 border rounded">
              Crear Animal
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Animals;
