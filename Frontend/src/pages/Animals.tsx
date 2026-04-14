import { useState, useEffect } from "react";
import { getAnimals } from "@/services/AnimalService";

function Animals() {
  const [animals, setAnimals] = useState([]);

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
  return (
    <div>
      <h1 className="text-2xl mb-5">Lista de animales</h1>
      <table className="w-full  table-fixed text-center">
        <thead className="bg-gray-200">
          <tr>
            <th className="w-20 p-3">N° Caravana</th>
            <th className="w-24 p-3">Fotos</th>
            <th className="w-18 p-3">Raza</th>
            <th className="w-24 p-3">Proposito</th>
            <th className="w-16 p-3">Sexo</th>
            <th className="w-16 p-3">Peso</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Animals;
