import { NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export function NavBar() {
  const { cantidadTotal } = useCart();


  const obtenerEstiloEnlace = ({ isActive }) => ({
    color: isActive ? "#3498db" : "#2c3e50",
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: "none",
    fontSize: "1.05rem",
    padding: "5px 10px",
    borderRadius: "4px",
    borderBottom: isActive ? "2px solid #3498db" : "2px solid transparent",
    transition: "all 0.3s ease",
  });

  return (
    <nav style={{
      display: "flex", 
      justifyContent: "space-between",
      alignItems: "center", 
      padding: "1rem 2rem",
      backgroundColor: "#ffffff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
      fontFamily: "sans-serif"
    }}>
      {/* Inicio y productos */}
      <div style={{ display: "flex", gap: "15px" }}>
        <NavLink to="/" style={obtenerEstiloEnlace}>
          Inicio
        </NavLink>
        <NavLink to="/productos" style={obtenerEstiloEnlace}>
          Productos
        </NavLink>
      </div>

      {/* Carrito */}
      <NavLink to="/carrito" style={obtenerEstiloEnlace}>
        <span style={{ marginRight: "3px" }}>🛒</span> Carrito
        {cantidadTotal > 0 && (
          <span style={{ 
            marginLeft: "8px", 
            background: "#e74c3c", // Un rojo más sutil
            color: "white", 
            padding: "2px 8px", 
            borderRadius: "10px",
            fontSize: "0.85rem",
            fontWeight: "bold"
          }}>
            {cantidadTotal}
          </span>
        )}
      </NavLink>
    </nav>
  );
}