import { useEffect, useState } from "react";
import { Link } from "wouter";
import FormHeladoUpdate from "../../components/FormHeladoUpdate";
import { getHelados, deleteHelado } from "../../api/helados"; // Importa la función deleteHelado

const HeladoList = () => {
  const [helados, setHelados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingHeladoId, setEditingHeladoId] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchHelados = async () => {
    try {
      setLoading(true);
      const response = await getHelados();
      const data = await response.json();
      setHelados(data);
    } catch (error) {
      console.error("Error al cargar los helados", error);
      alert("Error al cargar la lista de helados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHelados();
  }, []);

  const handleEditClick = (heladoId) => {
    setEditingHeladoId(heladoId);
  };

  const handleUpdateSuccess = () => {
    setEditingHeladoId(null);
    setUpdating(true);
    fetchHelados().finally(() => setUpdating(false));
  };

  // Función para manejar la eliminación con confirmación
  const handleDelete = async (id) => {
    // Confirmación antes de eliminar
    const confirmDelete = window.confirm("¿Estás seguro que deseas eliminar este helado?");
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      await deleteHelado(id); // Usa la función importada de helados.js
      await fetchHelados(); // Actualiza la lista después de eliminar
      alert("Helado eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el helado:", error);
      alert("Error al eliminar el helado");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p>Cargando helados...</p>;
  if (updating) return <p>Actualizando lista de helados...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de Helados</h2>

      <div style={{ marginBottom: "20px" }}>
        <Link
          href="/helados/create"
          style={{
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          Crear nuevo helado
        </Link>
      </div>

      <ol style={{ listStyle: "none", padding: 0 }}>
        {helados.map((helado) => (
          <li
            key={helado.id}
            style={{
              marginBottom: "15px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>{helado.nombreHelado}</strong> -
                <Link
                  href={`/helados/${helado.id}`}
                  style={{ marginLeft: "10px", color: "#2196F3" }}
                >
                  Ver detalles
                </Link>
              </div>
              <div>
                <button
                  onClick={() => handleEditClick(helado.id)}
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#FFC107",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  disabled={deletingId === helado.id}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(helado.id)}
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  disabled={deletingId === helado.id}
                >
                  {deletingId === helado.id ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </div>

            {editingHeladoId === helado.id && (
              <div
                style={{
                  marginTop: "15px",
                  padding: "15px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <FormHeladoUpdate
                  id={helado.id}
                  onSuccess={handleUpdateSuccess}
                  onCancel={() => setEditingHeladoId(null)}
                />
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default HeladoList;