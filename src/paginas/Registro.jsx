import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { FaUserPlus } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const { registrarse } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || !confirmar) {
      setError("Completá todos los campos.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setEnviando(true);
    try {
      await registrarse(email, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(traducirError(err.code));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Container className="py-5">
      <Helmet>
        <title>Crear cuenta | Mi Tienda</title>
      </Helmet>

      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4}>
          <Card className="p-4 shadow-sm border-0">
            <Card.Body>
              <Card.Title as="h1" className="h4 mb-4">
                <FaUserPlus className="me-2" />
                Crear cuenta
              </Card.Title>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="registroEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="registroPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="registroConfirmar">
                  <Form.Label>Confirmar contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmar}
                    onChange={(e) => setConfirmar(e.target.value)}
                  />
                </Form.Group>

                {error && <Alert variant="danger" className="py-2">{error}</Alert>}

                <Button type="submit" disabled={enviando} variant="success" className="w-100 mt-2">
                  {enviando ? "Creando cuenta..." : "Registrarme"}
                </Button>
              </Form>

              <p className="text-center mt-4 mb-0">
                ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

function traducirError(codigo) {
  const mensajes = {
    "auth/email-already-in-use": "Ya existe una cuenta con ese email.",
    "auth/invalid-email": "El email no es válido.",
    "auth/weak-password": "La contraseña es demasiado débil.",
  };
  return mensajes[codigo] || "Ocurrió un error al crear la cuenta.";
}

export default Registro;
