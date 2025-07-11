import { useEffect, useState } from "react";
import Nav from "../../components/Nav.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Footer.jsx";
import { Link } from "wouter";
import "../../assets/styles/heladoList.css";
import Helado1 from "../../assets/photos/helados/helado1.jpg";
import Helado2 from "../../assets/photos/helados/helado2.jpg";
import Helado3 from "../../assets/photos/helados/helado3.jpg";

const HeladoList = () => {
  const [helados, setHelados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const imagenes = [Helado1, Helado2, Helado3];

  // Fetch de helados
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

  // Inicializar carrito desde localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Función para agregar al carrito
  const addToCart = (helado) => {
    const newCart = [...cart, { nombre: helado.nombreHelado, precio: helado.precio }];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    alert(`${helado.nombreHelado} agregado al carrito`);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (loading) return <p className="loading">Cargando helados...</p>;

  return (
    <>
      <Nav />
      <div className="helado-list-container">
        <h2 className="title">🍦 Lista de Helados</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar helado por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="cards-container">
          {helados
            .filter((helado) =>
              helado.nombreHelado.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((helado) => {
              const randomImg = imagenes[Math.floor(Math.random() * imagenes.length)];

              return (
                <div key={helado.id} className="helado-card">
                  <img
                    src={randomImg}
                    alt={`Helado ${helado.nombreHelado}`}
                    className="helado-img"
                  />
                  <h3>{helado.nombreHelado}</h3>
                  <p>Precio: ${helado.precio}</p>

                  <Link className="details-button" href={`/helados/${helado.id}`}>
                    Ver detalles
                  </Link>

                  <FontAwesomeIcon
                    icon={faCartPlus}
                    className="add-cart-icon"
                    onClick={() => addToCart(helado)}
                    title="Agregar al carrito"
                  />
                </div>
              );
            })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HeladoList;
