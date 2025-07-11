import { useState, useEffect } from "react";
import {
  getIngredientes,
  createIngrediente,
  updateIngrediente,
  deleteIngrediente,
} from "../api/ingredientes";

const IngredientesForm = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [nombreIngrediente, setNombreIngrediente] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarIngredientes();
  }, []);

  const cargarIngredientes = async () => {
    try {
      const data = await getIngredientes();
      setIngredientes(data);
    } catch (error) {
      alert("Error al cargar los ingredientes");
    } finally {
      setCargando(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombreIngrediente.trim()) return;

    try {
      if (editandoId) {
        await updateIngrediente(editandoId, { nombreIngrediente });
      } else {
        await createIngrediente({ nombreIngrediente });
      }

      setNombreIngrediente("");
      setEditandoId(null);
      cargarIngredientes();
    } catch (error) {
      alert("Error al guardar el ingrediente");
    }
  };

  const handleEdit = (ingrediente) => {
    setNombreIngrediente(ingrediente.nombreIngrediente);
    setEditandoId(ingrediente.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este ingrediente?")) {
      try {
        await deleteIngrediente(id);
        cargarIngredientes();
      } catch (error) {
        alert("Error al eliminar el ingrediente");
      }
    }
  };

  return (
    <div>
      <h2>🧂 Ingredientes</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nombreIngrediente}
          onChange={(e) => setNombreIngrediente(e.target.value)}
          placeholder="Nombre del ingrediente"
        />
        <button type="submit">{editandoId ? "Actualizar" : "Agregar"}</button>
      </form>

      {cargando ? (
        <p>Cargando ingredientes...</p>
      ) : (
        <ul>
          {ingredientes.map((ing) => (
            <li key={ing.id}>
              <span style={{ color: "black", marginRight: "10px" }}>
                {ing.nombreIngrediente}
              </span>
              <button onClick={() => handleEdit(ing)}>✏️</button>
              <button onClick={() => handleDelete(ing.id)}>🗑️</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IngredientesForm;
