import '../assets/styles/nav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/photos/TheWalkers.png';

const Nav = () => {
    return (
        <div className="navbar">
            <a href=""><img src={Logo} alt="logo de heladeria" className='logo'/></a>
            <div>
                <ul className="navbar-option">
                    <li><a href="/helados">Helados</a></li>
                    <li><a href="#nosotros">Nosotros</a></li>
                    <li><a href="">Contactos</a></li>
                    <li>
                        <p>
                            <FontAwesomeIcon icon={faShoppingCart} /> 
                        </p>
                    </li>
                    <li>
                        <p>
                            <FontAwesomeIcon icon={faUser} /> 
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Nav;
