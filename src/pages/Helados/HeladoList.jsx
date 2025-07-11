import { useEffect, useState } from "react";
import Nav from "../../components/Nav.jsx";
import Footer from "../../components/Footer.jsx";
import { Link } from "wouter";
import "../../assets/styles/heladoList.css"; 

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

  if (loading) return <p className="loading">Cargando helados...</p>;

  return (
    <>
      <Nav />
      <div className="helado-list-container">
        <h2 className="title">🍦 Lista de Helados</h2>

        <div className="cards-container">
          {helados.map((helado) => (
            <div key={helado.id} className="helado-card">
              <h3>{helado.nombre}</h3>
              <p>ID: {helado.id}</p>
              <Link className="details-button" href={`/helados/${helado.id}`}>
                Ver detalles
              </Link>
            </div>
          ))}
        </div>

        <div className="create-button-container">
          <Link href="/helados/create" className="create-button">
            ➕ Crear nuevo helado
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HeladoList;
