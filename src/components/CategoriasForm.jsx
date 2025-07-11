import { useState, useEffect } from "react";
import {
    getCategorias,
    createCategoria,
    updateCategoria,
    deleteCategoria,
} from "../api/categorias";

const CategoriasForm = () => {
    const [categorias, setCategorias] = useState([]);
    const [nombreCategoria, setNombreCategoria] = useState("");
    const [editandoId, setEditandoId] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarCategorias();
    }, []);

    const cargarCategorias = async () => {
        try {
            const data = await getCategorias();
            setCategorias(data);
        } catch (error) {
            alert("Error al cargar las categorías");
        } finally {
            setCargando(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nombreCategoria.trim()) return;

        try {
            if (editandoId) {
                await updateCategoria(editandoId, { nombreCategoria });
            } else {
                await createCategoria({ nombreCategoria });
            }

            setNombreCategoria("");
            setEditandoId(null);
            cargarCategorias();
        } catch (error) {
            alert("Error al guardar la categoría");
        }
    };

    const handleEdit = (cat) => {
        setNombreCategoria(cat.nombreCategoria);
        setEditandoId(cat.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Eliminar esta categoría?")) {
            try {
                await deleteCategoria(id);
                cargarCategorias();
            } catch (error) {
                alert("Error al eliminar la categoría");
            }
        }
    };

    return (
        <div>
            <h2>🏷️ Categorías</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={nombreCategoria}
                    onChange={(e) => setNombreCategoria(e.target.value)}
                    placeholder="Nombre de la categoría"
                />
                <button type="submit">{editandoId ? "Actualizar" : "Agregar"}</button>
            </form>

            {cargando ? (
                <p>Cargando categorías...</p>
            ) : (
                <ul>
                    {categorias.map((cat) => (
                        <li key={cat.id}>
                            <span style={{ color: "black", marginRight: "10px" }}>
                                {cat.nombreCategoria}
                            </span>
                            <button onClick={() => handleEdit(cat)}>✏️</button>
                            <button onClick={() => handleDelete(cat.id)}>🗑️</button>
                        </li>

                    ))}
                </ul>
            )}
        </div>
    );
};

export default CategoriasForm;
