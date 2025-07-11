import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { fetchHeladoById } from "../../api/helados";
import Nav from "../../components/Nav.jsx";
import Footer from "../../components/Footer.jsx";
import "../../assets/styles/heladoDetail.css"; // importá tu CSS
import Helado1 from "../../assets/photos/helados/helado1.jpg";
import Helado2 from "../../assets/photos/helados/helado2.jpg";
import Helado3 from "../../assets/photos/helados/helado3.jpg";

const HeladoDetail = () => {
  const [helado, setHelado] = useState(null);
  const { id } = useParams();

  const imagenes = [Helado1, Helado2, Helado3];
  const randomImg = imagenes[Math.floor(Math.random() * imagenes.length)];

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

  if (!helado) return <p className="loading">Cargando helado...</p>;

  let artesanal;

  if (helado.IsArtesanal == true) {
    artesanal = "Si";
  } else {
    artesanal = "No";
  }

  return (
    <>
      <Nav />
      <div className="helado-detail-container">
        <div className="helado-detail-card">
          <img src={randomImg} alt={`Helado ${helado.nombreHelado}`} />
          <h2>{helado.nombreHelado}</h2>
          <p>{helado.descripcion}</p>
          <p>Precio: ${helado.precio}</p>
          <p>Artesanal: {artesanal}</p>
          <p>Categoria: {helado.nombreCategoria}</p>
          <p>Estado: {helado.nombreEstado}</p>
          <p>Ingredientes: {helado.ingredientes.join(", ")}</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HeladoDetail;
