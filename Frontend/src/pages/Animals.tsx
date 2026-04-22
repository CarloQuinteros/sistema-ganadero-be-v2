import { useState, useEffect } from "react";
import { getAnimals, deleteAnimal } from "@/services/AnimalService";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AnimalFormModal from "@/components/animals/AnimalFormModal";

function Animals() {
  const [animals, setAnimals] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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
      <div className="flex justify-between ">
        <h1 className="text-2xl mb-5">Lista de animales</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-green-600 hover:bg-green-800 text-white font-bold py-1 px-2 rounded mb-4"
              onClick={() => setIsOpen(true)}
            >
              Añadir Animal
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Registrar nuevo animal</DialogTitle>
            </DialogHeader>

            {/* Le pasamos una función al modal para que sepa cerrarse */}
            <AnimalFormModal onSuccess={() => setIsOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
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
    </div>
  );
}

export default Animals;
