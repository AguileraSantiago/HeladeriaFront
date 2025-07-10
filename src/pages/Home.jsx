import Nav from "../components/Nav";
import ImagenPortada from "../assets/photos/portada/imagen-portada.png"

import "../assets/styles/home.css";

const Home = () => {
  return (
    <div>
      <Nav />
      <section className="portada">
        <div className="portada-content">
          <div className="portada-texto">
            <h1>Helados Artesanales de primera calidad</h1>
          </div>

          <div className="portada-imagen">
            <div className="circulo-fondo"></div>
            <img src={ImagenPortada} alt="Imagen de portada" />
          </div>
        </div>

        <div className="onda"></div>
      </section>

    </div>
  );
};

export default Home;
