import Nav from "../components/Nav";
import ImagenPortada from "../assets/photos/portada/imagen-portada.png"
import Nosotros from "../assets/photos/portada/Nosotros.jpg"
import "../assets/styles/home.css";
import Footer from "../components/Footer";

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

      </section>
      <section className="nosotros" id="nosotros" > 
        <h2>Nuestra Historia</h2>
        <div className="nostros-texto-img">
        <p>      
          Todo comenzó con una simple idea: hacer helado que no solo sea rico, sino que también traiga una sonrisa. 
          En una pequeña cocina y con mucha pasión, nació nuestra heladería, 
          inspirada en esos momentos que hacen la vida más dulce: una tarde con amigos, un paseo en familia, un antojo después de un día largo.
          Desde el primer día, nos propusimos algo claro: que cada sabor cuente una historia.
          Por eso elegimos ingredientes frescos, recetas artesanales y combinaciones que despierten recuerdos.
           No se trata solo de helado, se trata de compartir alegría, disfrutar lo simple y volver, aunque sea por un ratito, a sentirnos como chicos.
          Hoy seguimos creciendo gracias a quienes nos eligen, nos recomiendan y se acercan con ganas de probar algo rico. 
           Nuestra heladería es un lugar pensado para vos, para que vengas a disfrutar de un sabor, una charla o simplemente un buen momento.
          Gracias por ser parte de esta historia. Porque un buen helado no se olvida... y un lindo momento, tampoco.
        </p>
        <img src={Nosotros} alt="fotoHeladeriaNos" />
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Home;
