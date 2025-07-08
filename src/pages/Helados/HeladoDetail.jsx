import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { fetchHeladoById } from "../../api/helados"; // Ajustá la ruta según tu estructura

const HeladoDetail = () => {
  const [helado, setHelado] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const cargarHelado = async () => {
      try {
        const data = await fetchHeladoById(id);
        setHelado(data);
      } catch (error) {
        console.error("Error al cargar el helado", error);
      }
    };

    cargarHelado();
  }, [id]);

  if (!helado) return <p>Cargando...</p>;

  return (
    <div>
      <p>{helado.nombreHelado}</p> 
      <p>Precio: ${helado.precio}</p>
      <p>Estado: {helado.nombreEstado}</p>
    </div>
  );
};

export default HeladoDetail;
