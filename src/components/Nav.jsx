import '../assets/styles/nav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faBars, faTimes, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/photos/TheWalkers.png';
import { useState, useEffect } from 'react';

const Nav = () => {
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [cartItems, setCartItems] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const fetchCart = () => {
            const storedCart = localStorage.getItem("cart");
            if (storedCart) {
                setCartItems(JSON.parse(storedCart));
            } else {
                setCartItems([]);
            }
        };

        fetchCart();
        window.addEventListener("cartUpdated", fetchCart);
        return () => window.removeEventListener("cartUpdated", fetchCart);
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    const groupedCart = cartItems.reduce((acc, item) => {
        const existingItem = acc.find((i) => i.nombre === item.nombre);
        if (existingItem) {
            existingItem.cantidad += 1;
        } else {
            acc.push({ ...item, cantidad: 1 });
        }
        return acc;
    }, []);

    const finalizarCompra = () => {
        setCartItems([]);
        localStorage.removeItem("cart");
        alert("Compra finalizada. Gracias por tu compra!");
        window.location.reload();
    };

    const removeFromCart = (nombre) => {
        const newCart = cartItems.filter(item => item.nombre !== nombre);
        setCartItems(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const { username, password } = formData;
        let loggedUser = null;

        if (username === 'admin' && password === 'admin') {
            loggedUser = { role: 'admin', name: 'Administrador' };
        } else if (username === 'cliente' && password === '123') {
            loggedUser = { role: 'cliente', name: 'Cliente' };
        } else {
            alert('Usuario o contraseña incorrectos');
            return;
        }

        setUser(loggedUser);
        localStorage.setItem('user', JSON.stringify(loggedUser));
        setShowModal(false);
    };

    const handleLogout = () => {
        setUser(null);
        setFormData({ username: '', password: '' });
        localStorage.removeItem('user');
    };

    useEffect(() => {
        const body = document.body;
        if (showModal) {
            body.classList.add('blurred');
            body.style.overflow = 'hidden';
        } else {
            body.classList.remove('blurred');
            body.style.overflow = '';
        }
    }, [showModal]);

    return (
        <div className="navbar">
            <a href="/"><img src={Logo} alt="logo de heladería" className="logo" /></a>

            {/* CARRITO MOBILE */}
            <div className="cart-container mobile-cart">
                <div className="cart-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span className="cart-count">{cartItems.length}</span>
                    <div className="cart-list">
                        {groupedCart.length === 0 ? (
                            <p className="empty-cart">El carrito está vacío</p>
                        ) : (
                            <>
                                <ul>
                                    {groupedCart.map((item, index) => (
                                        <li key={index} className="cart-item">
                                            {item.nombre} - ${item.precio} x {item.cantidad}
                                            <button
                                                className="remove-btn"
                                                onClick={() => removeFromCart(item.nombre)}
                                                title="Eliminar del carrito"
                                            >
                                                ❌
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <button className="finalizar-btn" onClick={finalizarCompra}>
                                    Finalizar compra
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
            </div>

            <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
                <ul className="navbar-option">
                    <li><a href="/helados">Helados</a></li>
                    {user?.role === 'admin' && (
                        <li><a href="/dashboard">Dashboard</a></li>
                    )}
                    <li><a href="/#nosotros">Nosotros</a></li>
                    <li><a href="/#contacto">Contacto</a></li>

                    {/* CARRITO DESKTOP */}
                    <li className="cart-container desktop-cart">
                        <div className="cart-icon">
                            <FontAwesomeIcon icon={faShoppingCart} />
                            <span className="cart-count">{cartItems.length}</span>
                            <div className="cart-list">
                                {groupedCart.length === 0 ? (
                                    <p className="empty-cart">El carrito está vacío</p>
                                ) : (
                                    <>
                                        <ul>
                                            {groupedCart.map((item, index) => (
                                                <li key={index} className="cart-item">
                                                    {item.nombre} - ${item.precio} x {item.cantidad}
                                                    <button
                                                        className="remove-btn"
                                                        onClick={() => removeFromCart(item.nombre)}
                                                        title="Eliminar del carrito"
                                                    >
                                                        ❌
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                        <button className="finalizar-btn" onClick={finalizarCompra}>
                                            Finalizar compra
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </li>

                    <li>
                        {!user ? (
                            <button className="login-btn" onClick={() => setShowModal(true)}>Ingresar</button>
                        ) : (
                            <div className="user-info">
                                <span className="user-name">Hola, {user.name}</span>
                                <button className="logout-btn" onClick={handleLogout} title="Cerrar sesión">
                                    <FontAwesomeIcon icon={faRightFromBracket} />
                                </button>
                            </div>
                        )}
                    </li>
                </ul>
            </div>

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <h3>Iniciar Sesión</h3>
                        <form onSubmit={handleLogin}>
                            <input
                                type="text"
                                placeholder="Usuario"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                            <button type="submit">Ingresar</button>
                            <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Nav;
