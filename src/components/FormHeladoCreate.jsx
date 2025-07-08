import React, { useEffect, useState } from "react";
import { createHelado } from "../api/helados";
import { getCategorias } from "../api/categorias";
import { getIngredientes } from "../api/ingredientes";

export default function FormHeladoCreate() {
  const [form, setForm] = useState({
    nombreHelado: "",
    descripcion: "",
    precio: 0,
    itsArtesanal: false,
    categoriaId: "",
    selectedIngredientes: [] // array para múltiples selecciones
  });

  const [categorias, setCategorias] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);

  // Cargar selects
  useEffect(() => {
    const fetchData = async () => {
      try {
        setCategorias(await getCategorias());
        setIngredientes(await getIngredientes());
      } catch (err) {
        console.error("Error cargando opciones del formulario", err);
      }
    };
    fetchData();
  }, []);

  // Manejo de cambios
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === "ingredienteId") {
      // Manejo para ingredientes (selección múltiple)
      const ingredienteId = parseInt(value);
      setForm(prev => {
        if (prev.selectedIngredientes.includes(ingredienteId)) {
          // Si ya está seleccionado, lo quita
          return {
            ...prev,
            selectedIngredientes: prev.selectedIngredientes.filter(id => id !== ingredienteId)
          };
        } else {
          // Si no está seleccionado, lo agrega
          return {
            ...prev,
            selectedIngredientes: [...prev.selectedIngredientes, ingredienteId]
          };
        }
      });
    } else {
     
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validar que se hayan seleccionado ingredientes
      if (form.selectedIngredientes.length === 0) {
        alert("Por favor selecciona al menos un ingrediente");
        return;
      }

      const nuevoHelado = {
        nombreHelado: form.nombreHelado,
        descripcion: form.descripcion,
        precio: parseFloat(form.precio),
        itsArtesanal: form.itsArtesanal,
        categoriaId: parseInt(form.categoriaId),
        estadoId: 1, // Estado por defecto
        ingredientesIds: form.selectedIngredientes // Envia el array de IDs
      };

      await createHelado(nuevoHelado);
      alert("Helado creado con éxito");
      
      // Resetear formulario
      setForm({
        nombreHelado: "",
        descripcion: "",
        precio: 0,
        itsArtesanal: false,
        categoriaId: "",
        selectedIngredientes: []
      });
    } catch (err) {
      console.error("Error al crear helado:", err);
      alert("Error al crear el helado. Verifica los datos e intenta nuevamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Helado</h2>
      <div>
        <label htmlFor="nombreHelado">Nombre:</label>
        <input
          type="text"
          name="nombreHelado"
          value={form.nombreHelado}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="descripcion">Descripción:</label>
        <input
          type="text"
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="precio">Precio:</label>
        <input
          type="number"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="itsArtesanal">Es Artesanal:</label>
        <input
          type="checkbox"
          name="itsArtesanal"
          checked={form.itsArtesanal}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="categoriaId">Categoría:</label>
        <select
          name="categoriaId"
          value={form.categoriaId}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombreCategoria}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Ingredientes:</label>
        <div>
          {ingredientes.map((ing) => (
            <div key={ing.id}>
              <input
                type="checkbox"
                id={`ingrediente-${ing.id}`}
                name="ingredienteId"
                value={ing.id}
                checked={form.selectedIngredientes.includes(ing.id)}
                onChange={handleChange}
              />
              <label htmlFor={`ingrediente-${ing.id}`}>
                {ing.nombreIngrediente}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button type="submit">Guardar</button>
    </form>
  );
}