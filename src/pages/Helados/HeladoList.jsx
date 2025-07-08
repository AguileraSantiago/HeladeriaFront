import { useEffect, useState } from "react";
import { Link } from "wouter";

const HeladoList = () => {
  const [helados, setHelados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHelados = async () => {
      try {
        const response = await fetch("https://localhost:7051/api/helados");
        const data = await response.json();
        setHelados(data);
      } catch (error) {
        console.error("Error al cargar los helados", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHelados();
  }, []);

  if (loading) return <p>Cargando helados...</p>;

  return (
    <>
    <div>
      <h2>Lista de Helados</h2>
      <ol>
        {helados.map((helado) => (
          <li key={helado.id}>
            {helado.nombre} -{" "}
            <Link href={`/helados/${helado.id}`}>Ver detalles</Link>
          </li>
        ))}
      </ol>
    </div>
    <div>
      <Link href="/helados/create">Crear nuevo helado</Link>
    </div>
    </>
  );
};

export default HeladoList;
