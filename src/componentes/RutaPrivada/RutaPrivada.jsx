import { Navigate } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";
import { Spinner } from "../Spinner/Spinner";
import { useAuth } from "../../context/AuthContext";

export function RutaPrivada({ children, soloAdmin = false }) {
  const { usuario, cargando, esAdmin } = useAuth();

  if (cargando) {
    return <Spinner texto="Verificando sesión..." />;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (soloAdmin && !esAdmin) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger" className="d-inline-block">
          <Alert.Heading className="h5 mb-2">Acceso restringido</Alert.Heading>
          <p className="mb-0">Esta sección es solo para administradores.</p>
        </Alert>
      </Container>
    );
  }

  return children;
}
