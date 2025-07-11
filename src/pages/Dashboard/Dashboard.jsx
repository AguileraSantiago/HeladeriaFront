import { useState } from 'react';
import Nav from '../../components/Nav.jsx';
import Footer from '../../components/Footer.jsx';
import IngredientesForm from '../../components/IngredientesForm.jsx';
import CategoriasForm from '../../components/CategoriasForm.jsx';
import HeladosForm from '../../components/FormHeladoCreate.jsx';
import '../../assets/styles/dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("ingredientes");

  return (
    <>
      <Nav />
      <div className="dashboard-container">
        <h1>Dashboard de Administración</h1>

        <div className="tabs">
          <button onClick={() => setActiveTab("ingredientes")} className={activeTab === "ingredientes" ? "active" : ""}>Ingredientes</button>
          <button onClick={() => setActiveTab("categorias")} className={activeTab === "categorias" ? "active" : ""}>Categorías</button>
          <button onClick={() => setActiveTab("helados")} className={activeTab === "helados" ? "active" : ""}>Helados</button>
        </div>

        <div className="form-section">
          {activeTab === "ingredientes" && <IngredientesForm />}
          {activeTab === "categorias" && <CategoriasForm />}
          {activeTab === "helados" && <HeladosForm />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
