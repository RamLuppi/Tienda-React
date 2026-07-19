import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  
  const destino = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Completá email y contraseña.");
      return;
    }

    setEnviando(true);
    try {
      await login(email, password);
      navigate(destino, { replace: true });
    } catch (err) {
      setError(traducirError(err.code));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Container className="py-5">
      <Helmet>
        <title>Ingresar | Mi Tienda</title>
      </Helmet>

      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4}>
          <Card className="p-4 shadow-sm border-0">
            <Card.Body>
              <Card.Title as="h1" className="h4 mb-4">
                <FaSignInAlt className="me-2" />
                Iniciar sesión
              </Card.Title>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                {error && <Alert variant="danger" className="py-2">{error}</Alert>}

                <Button type="submit" disabled={enviando} className="w-100 mt-2">
                  {enviando ? "Ingresando..." : "Ingresar"}
                </Button>
              </Form>

              <p className="text-center mt-4 mb-0">
                ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
