import { useEffect, useState } from "react";
import Nav from "../../components/Nav.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Footer.jsx";
import { Link } from "wouter";
import {
  fetchHelados,
  deleteHelado,
  getIngredientsByHeladoId,
} from "../../api/helados";
import "../../assets/styles/heladoList.css";
import Helado1 from "../../assets/photos/helados/helado1.jpg";
import Helado2 from "../../assets/photos/helados/helado2.jpg";
import Helado3 from "../../assets/photos/helados/helado3.jpg";

const HeladoList = () => {
  const [helados, setHelados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ingredientesMap, setIngredientesMap] = useState({});

  const imagenes = [Helado1, Helado2, Helado3];

  // Carga ingredientes para cada helado y guarda en el estado ingredientesMap
  const loadIngredientes = async (heladosList) => {
    const map = {};
    await Promise.all(
      heladosList.map(async (helado) => {
        try {
          const ingredientes = await getIngredientsByHeladoId(helado.id);
          map[helado.id] = ingredientes;
        } catch {
          map[helado.id] = [];
        }
      })
    );
    setIngredientesMap(map);
  };

  const loadHelados = async () => {
    try {
      setLoading(true);
      const data = await fetchHelados();
      setHelados(data);
      await loadIngredientes(data);
    } catch (error) {
      console.error("Error al cargar los helados", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHelados();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (helado) => {
    const newCart = [
      ...cart,
      { nombre: helado.nombreHelado, precio: helado.precio },
    ];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    alert(`${helado.nombreHelado} agregado al carrito`);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro que deseas eliminar este helado?"
    );
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      await deleteHelado(id);
      await loadHelados();
      alert("Helado eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el helado:", error);
      alert("Error al eliminar el helado");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p className="loading">Cargando helados...</p>;
  if (updating) return <p>Actualizando lista de helados...</p>;

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
              helado.nombreHelado
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((helado) => {
              const randomImg =
                imagenes[Math.floor(Math.random() * imagenes.length)];

              return (
                <div key={helado.id} className="helado-card">
                  <img
                    src={randomImg}
                    alt={`Helado ${helado.nombreHelado}`}
                    className="helado-img"
                  />
                  <h3>{helado.nombreHelado}</h3>
                  <p>Precio: ${helado.precio}</p>

                  <Link
                    className="details-button"
                    href={`/helados/${helado.id}`}
                  >
                    Ver detalles
                  </Link>

                  <FontAwesomeIcon
                    icon={faCartPlus}
                    className="add-cart-icon"
                    onClick={() => addToCart(helado)}
                    title="Agregar al carrito"
                  />

                  <div className="admin-actions">
                    <Link
                      href={`/helados/editar/${helado.id}`}
                      className="edit-button"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(helado.id)}
                      className="delete-button"
                      disabled={deletingId === helado.id}
                    >
                      {deletingId === helado.id ? "Eliminando..." : "Eliminar"}
                    </button>
                  </div>
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
