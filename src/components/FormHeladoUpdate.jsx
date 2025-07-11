import { useEffect, useState } from "react";
import {
  getHeladoById,
  updateHelado,
  getIngredientsByHeladoId,
  addIngredienteToHelado
} from "../api/helados";
import { getCategorias } from "../api/categorias";
import { getIngredientes } from "../api/ingredientes";
import { getEstados } from "../api/estados";

const FormHeladoUpdate = ({ id, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    nombreHelado: "",
    descripcion: "",
    precio: 0,
    itsArtesanal: false,
    categoriaId: "",
    estadoId: ""
  });

  const [categorias, setCategorias] = useState([]);
  const [allIngredientes, setAllIngredientes] = useState([]);
  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIngredients, setCurrentIngredients] = useState([]);
  const [newSelectedIngredients, setNewSelectedIngredients] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Obtener datos en paralelo
        const [
          heladoResponse, 
          categoriasResponse, 
          ingredientesResponse, 
          estadosResponse
        ] = await Promise.all([
          getHeladoById(id),
          getCategorias(),
          getIngredientes(),
          getEstados(),
        ]);

        // Convertir respuestas a JSON si es necesario
        const heladoData = heladoResponse.json ? await heladoResponse.json() : heladoResponse;
        const categoriasData = categoriasResponse.json ? await categoriasResponse.json() : categoriasResponse;
        const ingredientesData = ingredientesResponse.json ? await ingredientesResponse.json() : ingredientesResponse;
        const estadosData = estadosResponse.json ? await estadosResponse.json() : estadosResponse;

        // Obtener ingredientes actuales
        const currentIngsResponse = await getIngredientsByHeladoId(id);
        const currentIngs = currentIngsResponse.json ? await currentIngsResponse.json() : currentIngsResponse;
        
        // Establecer estados
        setCurrentIngredients(currentIngs);
        setNewSelectedIngredients(currentIngs.map(ing => ing.id));
        setCategorias(categoriasData);
        setAllIngredientes(ingredientesData);
        setEstados(estadosData);

        // Establecer datos del formulario
        setFormData({
          nombreHelado: heladoData.nombreHelado || "",
          descripcion: heladoData.descripcion || "",
          precio: heladoData.precio || 0,
          itsArtesanal: heladoData.itsArtesanal || false,
          categoriaId: String(heladoData.categoria?.id || heladoData.categoriaId || ""),
          estadoId: String(heladoData.estado?.id || heladoData.estadoId || "")
        });

      } catch (error) {
        console.error("Error cargando datos:", error);
        alert("Error al cargar los datos del helado");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleBasicChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleIngredientChange = (ingredienteId) => {
    setNewSelectedIngredients(prev => 
      prev.includes(ingredienteId) 
        ? prev.filter(id => id !== ingredienteId) 
        : [...prev, ingredienteId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Actualizar datos básicos
      await updateHelado(id, {
        nombreHelado: formData.nombreHelado,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        itsArtesanal: formData.itsArtesanal,
        categoriaId: parseInt(formData.categoriaId),
        estadoId: parseInt(formData.estadoId)
      });

      // Agregar nuevos ingredientes
      const currentIngIds = currentIngredients.map(ing => ing.id);
      const ingredientsToAdd = newSelectedIngredients.filter(
        id => !currentIngIds.includes(id)
      );

      for (const ingredienteId of ingredientsToAdd) {
        try {
          await addIngredienteToHelado(id, ingredienteId);
        } catch (error) {
          console.error(`Error agregando ingrediente ${ingredienteId}:`, error);
        }
      }

      alert("Helado actualizado correctamente");
      onSuccess?.();
      
    } catch (error) {
      console.error('Error al actualizar el helado:', error);
      alert('Error al actualizar el helado');
    }
  };

  if (loading) return <div>Cargando datos del helado...</div>;

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '20px auto', 
      padding: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '8px' 
    }}>
      <h2 style={{ marginBottom: '20px' }}>Editar Helado</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Campo Nombre */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Nombre:
          </label>
          <input
            type="text"
            name="nombreHelado"
            value={formData.nombreHelado}
            onChange={handleBasicChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>

        {/* Campo Descripción */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Descripción:
          </label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleBasicChange}
            rows={3}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>

        {/* Campo Precio */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Precio:
          </label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleBasicChange}
            min="0"
            step="0.01"
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>

        {/* Checkbox Artesanal - CORREGIDO */}
        <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            name="itsArtesanal"
            checked={formData.itsArtesanal}
            onChange={handleBasicChange}
            style={{ marginRight: '8px' }}
          />
          <label style={{ fontWeight: 'bold' }}>Es Artesanal</label>
        </div>

        {/* Select Categoría - CORREGIDO */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Categoría:
          </label>
          <select
            name="categoriaId"
            value={formData.categoriaId}
            onChange={handleBasicChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option value="">Seleccione categoría</option>
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombreCategoria}
              </option>
            ))}
          </select>
        </div>

        {/* Select Estado - CORREGIDO */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Estado:
          </label>
          <select
            name="estadoId"
            value={formData.estadoId}
            onChange={handleBasicChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option value="">Seleccione estado</option>
            {estados.map(estado => (
              <option key={estado.id} value={estado.id}>
                {estado.nombreEstado}
              </option>
            ))}
          </select>
        </div>

        {/* Sección de Ingredientes - CORREGIDO */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '10px' }}>Ingredientes</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '10px'
          }}>
            {allIngredientes.map(ingrediente => {
              const isCurrent = currentIngredients.some(ci => ci.id === ingrediente.id);
              const isSelected = newSelectedIngredients.includes(ingrediente.id);
              
              return (
                <div key={ingrediente.id} style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    id={`ingrediente-${ingrediente.id}`}
                    checked={isCurrent || isSelected}
                    onChange={() => handleIngredientChange(ingrediente.id)}
                    disabled={isCurrent}
                    style={{ marginRight: '8px' }}
                  />
                  <label htmlFor={`ingrediente-${ingrediente.id}`}>
                    {ingrediente.nombreIngrediente}
                    {isCurrent && <span style={{ color: '#666', fontSize: '0.9em' }}> (actual)</span>}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Botones del formulario */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="submit" 
            style={{
              padding: '8px 16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Guardar Cambios
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormHeladoUpdate;