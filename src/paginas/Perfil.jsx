import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Perfil() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Container className="py-5">
      <Helmet>
        <title>Mi perfil | Mi Tienda</title>
      </Helmet>

      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4}>
          <Card className="p-4 shadow-sm border-0 text-center">
            <Card.Body>
              <FaUserCircle size={48} className="text-primary mb-2" />
              <Card.Title as="h1" className="h4">Mi perfil</Card.Title>
              <Card.Text className="text-muted mb-1">Sesión iniciada como:</Card.Text>
              <Card.Text className="fw-bold">{usuario?.email}</Card.Text>

              <Button variant="danger" onClick={handleLogout} className="mt-3">
                <FaSignOutAlt className="me-2" />
                Cerrar sesión
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Perfil;
