import { useState, useEffect } from "react";
import { updateHelado, updateHeladoIngredients } from "../api/helados";
import "../assets/styles/formHeladoUpdate.css";

const FormHeladoUpdate = ({
  id,
  initialData,
  categorias,
  ingredientes,
  onSuccess,
  onCancel,
}) => {
  const [nombreHelado, setNombreHelado] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [artesanal, setArtesanal] = useState(false);
  const [categoriaId, setCategoriaId] = useState("");
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState(
    []
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Precargar datos cuando llegan
  useEffect(() => {
    if (initialData && ingredientes.length > 0) {
      setNombreHelado(initialData.nombreHelado || "");
      setDescripcion(initialData.descripcion || "");
      setPrecio(initialData.precio ?? "");
      setArtesanal(Boolean(initialData.artesanal || initialData.isArtesanal));
      setCategoriaId(initialData.categoriaId?.toString() || "");

      // Mapear nombres de ingredientes (desde initialData.ingredientes) a IDs
      const idsSeleccionados = ingredientes
        .filter((ing) => initialData.ingredientes.includes(ing.nombre))
        .map((ing) => Number(ing.id));

      setIngredientesSeleccionados(idsSeleccionados);
    }
  }, [initialData, ingredientes]);

  const toggleIngrediente = (id) => {
    setIngredientesSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((ingId) => ingId !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!nombreHelado.trim()) {
      setError("El nombre del helado es obligatorio");
      return;
    }
    if (precio === "" || isNaN(precio) || Number(precio) < 0) {
      setError("El precio debe ser un número válido mayor o igual a 0");
      return;
    }
    if (!categoriaId) {
      setError("Debe seleccionar una categoría");
      return;
    }

    setLoading(true);
    try {
      // 1. Actualizar el helado (sin ingredientes)
      await updateHelado(id, {
        nombreHelado,
        descripcion,
        precio: Number(precio),
        artesanal,
        categoriaId: Number(categoriaId),
      });

      // 2. Actualizar ingredientes por separado
      await updateHeladoIngredients(id, ingredientesSeleccionados);

      onSuccess();
    } catch (err) {
      setError("Error al actualizar el helado o ingredientes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="form-helado-update"
      onSubmit={handleSubmit}
      style={{ maxWidth: 500, margin: "auto" }}
    >
      {error && (
        <p className="form-error" style={{ color: "red", marginBottom: 12 }}>
          {error}
        </p>
      )}

      <label style={{ display: "block", marginBottom: 12 }}>
        Nombre del Helado:
        <input
          type="text"
          value={nombreHelado}
          onChange={(e) => setNombreHelado(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        />
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        Descripción:
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows={3}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        />
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        Precio:
        <input
          type="number"
          step="0.01"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
          min="0"
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        />
      </label>

      <label
        style={{ display: "flex", alignItems: "center", marginBottom: 12 }}
      >
        <input
          type="checkbox"
          checked={artesanal}
          onChange={(e) => setArtesanal(e.target.checked)}
          style={{ marginRight: 8 }}
        />
        Artesanal
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        Categoría:
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        >
          <option value="">-- Seleccione una categoría --</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id.toString()}>
              {cat.nombreCategoria}
            </option>
          ))}
        </select>
      </label>

      <fieldset
        style={{ marginBottom: 12, border: "1px solid #ccc", padding: 8 }}
      >
        <legend>Ingredientes:</legend>
        {ingredientes.length === 0 ? (
          <p>No hay ingredientes disponibles</p>
        ) : (
          ingredientes.map((ing) => (
            <label
              key={ing.id}
              style={{ display: "block", marginBottom: 6, cursor: "pointer" }}
            >
              <input
                type="checkbox"
                checked={ingredientesSeleccionados.includes(Number(ing.id))}
                onChange={() => toggleIngrediente(Number(ing.id))}
                style={{ marginRight: 8 }}
              />
              {ing.nombreIngrediente}
            </label>
          ))
        )}
      </fieldset>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormHeladoUpdate;
