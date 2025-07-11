import React, { useEffect, useState } from "react";
import { createHelado, fetchHelados } from "../api/helados";
import { getCategorias } from "../api/categorias";
import { getIngredientes } from "../api/ingredientes";
import '../assets/styles/FormHeladoCreate.css'

const FormHeladoCreate = () => {
  const [form, setForm] = useState({
    nombreHelado: "",
    descripcion: "",
    precio: 0,
    itsArtesanal: false,
    categoriaId: "",
    selectedIngredientes: [],
  });

  const [categorias, setCategorias] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [helados, setHelados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCategorias(await getCategorias());
        setIngredientes(await getIngredientes());
        await cargarHelados();
      } catch (err) {
        console.error("Error cargando datos", err);
      }
    };
    fetchData();
  }, []);

  const cargarHelados = async () => {
    try {
      const data = await fetchHelados();
      setHelados(data);
    } catch (error) {
      console.error("Error al cargar helados", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "ingredienteId") {
      const ingredienteId = parseInt(value);
      setForm((prev) => {
        if (prev.selectedIngredientes.includes(ingredienteId)) {
          return {
            ...prev,
            selectedIngredientes: prev.selectedIngredientes.filter(
              (id) => id !== ingredienteId
            ),
          };
        } else {
          return {
            ...prev,
            selectedIngredientes: [...prev.selectedIngredientes, ingredienteId],
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
    if (form.selectedIngredientes.length === 0) {
      alert("Selecciona al menos un ingrediente.");
      return;
    }

    const nuevoHelado = {
      nombreHelado: form.nombreHelado,
      descripcion: form.descripcion,
      precio: parseFloat(form.precio),
      itsArtesanal: form.itsArtesanal,
      categoriaId: parseInt(form.categoriaId),
      estadoId: 1,
      ingredientesIds: form.selectedIngredientes,
    };

    try {
      await createHelado(nuevoHelado);
      alert("Helado creado con éxito");

      setForm({
        nombreHelado: "",
        descripcion: "",
        precio: 0,
        itsArtesanal: false,
        categoriaId: "",
        selectedIngredientes: [],
      });

      await cargarHelados();
    } catch (err) {
      console.error("Error al crear helado:", err);
      alert("Ocurrió un error al crear el helado.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">🍨 Crear Helado</h2>
      <form onSubmit={handleSubmit} className="form">
         <label htmlFor="">Nombre</label>
        <input
          type="text"
          name="nombreHelado"
          placeholder="Nombre del helado"
          value={form.nombreHelado}
          onChange={handleChange}
          required
          className="form-input"
        />
        <label htmlFor="">Descripción</label>
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          required
          className="form-input"
        />
        <label htmlFor="">Precio</label>
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          required
          className="form-input"
        />

        <label className="form-checkbox">
          <input
            type="checkbox"
            name="itsArtesanal"
            checked={form.itsArtesanal}
            onChange={handleChange}
          />
          ¿Es artesanal?
        </label>

        <select
          name="categoriaId"
          value={form.categoriaId}
          onChange={handleChange}
          required
          className="form-select"
        >
          <option value="">Seleccione una categoría</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombreCategoria}
            </option>
          ))}
        </select>

        <label className="form-label">Ingredientes:</label>
        <div className="ingredientes-checkboxes">
          {ingredientes.map((ing) => (
            <label key={ing.id} className="checkbox-label">
              <input
                type="checkbox"
                name="ingredienteId"
                value={ing.id}
                checked={form.selectedIngredientes.includes(ing.id)}
                onChange={handleChange}
              />
              {ing.nombreIngrediente}
            </label>
          ))}
        </div>

        <button type="submit" className="form-button">
          Guardar
        </button>
      </form>

      <h3 className="list-title">🍧 Lista de helados</h3>
      <ul className="helado-list">
        {helados.map((h) => (
          <li key={h.id} className="helado-item">
            <strong style={{ color: "black" }}>{h.nombreHelado} – ${h.precio}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormHeladoCreate;