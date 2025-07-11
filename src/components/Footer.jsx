import "../assets/styles/footer.css";
import logoFooter from "../assets/photos/TheWalkers.png";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container" id="contacto">
        <div className="contact">
          <h3>CONTACTÁ CON NOSOTROS</h3>
          <ul>
            <li>
              <a href="https://www.linkedin.com/" target="_blank">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="">Heladeria@TheWalker.com.ar</a>
            </li>
            <li>+54 9 3364 60-2919</li>
          </ul>
        </div>

        <div className="logo-footer">
          <img src={logoFooter} alt="logo" />
        </div>

        <div className="locations">
          <h3>UBICACIONES</h3>
          <ul>
            <li>Parque Empresarial Constitución</li>
            <li>Villa Constitución (2919)</li>
            <li>Santa Fe</li>
            <li>Argentina</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
