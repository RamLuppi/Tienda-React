import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Badge, Button } from "react-bootstrap";
import { FaShoppingCart, FaUserCircle, FaSignInAlt, FaSignOutAlt, FaToolbox } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export function NavBar() {
  const { cantidadTotal } = useCart();
  const { usuario, logout, esAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const claseEnlace = ({ isActive }) =>
    `nav-link fw-medium d-flex align-items-center gap-1 ${isActive ? "text-primary" : "text-secondary"}`;

  return (
    <Navbar bg="white" expand="md" sticky="top" className="border-bottom py-3">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold text-dark">
          Mi Tienda
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-principal" />
        <Navbar.Collapse id="nav-principal">
          <Nav className="me-auto gap-2">
            <Nav.Link as={NavLink} to="/" className={claseEnlace}>Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/productos" className={claseEnlace}>Productos</Nav.Link>
            {esAdmin && (
              <Nav.Link as={NavLink} to="/admin" className={claseEnlace}>
                <FaToolbox /> Panel
              </Nav.Link>
            )}
          </Nav>

          <Nav className="align-items-md-center gap-2">
            <Nav.Link as={NavLink} to="/carrito" className={claseEnlace}>
              <FaShoppingCart /> Carrito
              {cantidadTotal > 0 && (
                <Badge bg="danger" className="ms-1">{cantidadTotal}</Badge>
              )}
            </Nav.Link>

            {usuario ? (
              <>
                <Nav.Link as={NavLink} to="/perfil" className={claseEnlace}>
                  <FaUserCircle /> {usuario.email}
                </Nav.Link>
                <Button onClick={handleLogout} variant="outline-danger" size="sm">
                  <FaSignOutAlt /> Salir
                </Button>
              </>
            ) : (
              <Button as={NavLink} to="/login" size="sm" variant="primary">
                <FaSignInAlt /> Ingresar
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
