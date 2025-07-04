import { useEffect, useState } from "react";
import { useParams } from "react-router";


const HeladoDetail = () => {
    const [Helado, SetHelado] = useState([]);
    const {id} = useParams();

    useEffect (()=>{ 
        const fetchHelado = async ()=>{ 
            try
            {
                const response = await fetch(`https://localhost:7051/api/helados/${id}`)
                const data = await response.json();
                SetHelado(data)
            }
            catch (error)
            {
                console.error("Error al carga el Helado",error)
            }
         }  
         fetchHelado();
    },[])
    return (
        <div> 
            <p>{Helado.nombre}</p>
        </div>
    )
} 

export default HeladoDetail;