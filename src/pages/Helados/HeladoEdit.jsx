import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import Nav from "../../components/Nav.jsx";
import Footer from "../../components/Footer.jsx";
import FormHeladoUpdate from "../../components/FormHeladoUpdate";
import {
  fetchHeladoById,
  fetchCategorias,
  fetchIngredientes,
} from "../../api/helados"; // crea estas funciones en api

const HeladoEdit = () => {
  const [match, params] = useRoute("/helados/editar/:id");
  const [helado, setHelado] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!params?.id) return;

    const loadData = async () => {
      try {
        setLoading(true);
        const [heladoData, categoriasData, ingredientesData] =
          await Promise.all([
            fetchHeladoById(params.id),
            fetchCategorias(),
            fetchIngredientes(),
          ]);
        setHelado(heladoData);
        setCategorias(categoriasData);
        setIngredientes(ingredientesData);
      } catch {
        setError("Error al cargar datos.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [params.id]);

  const handleUpdateSuccess = () => {
    alert("Helado actualizado correctamente");
    setLocation("/helados");
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>{error}</p>;
  if (!helado) return <p>Helado no encontrado.</p>;

  return (
    <>
      <Nav />
      <div className="helado-edit-container">
        <h2>Editar Helado: {helado.nombreHelado}</h2>
        <FormHeladoUpdate
          id={helado.id}
          initialData={helado}
          categorias={categorias} // array obtenido desde API o estado
          ingredientes={ingredientes} // array completo obtenido desde API o estado
          onSuccess={handleUpdateSuccess}
          onCancel={() => setLocation("/helados")}
        />
      </div>
      <Footer />
    </>
  );
};

export default HeladoEdit;
