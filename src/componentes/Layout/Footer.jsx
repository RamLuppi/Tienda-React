import { Container, Row, Col } from "react-bootstrap";
import { TarjetaContacto } from "../TarjetaContacto/TarjetaContacto";

export function Footer() {
  const equipo = [
    { id: 1, nombre: "Ramiro", puesto: "Frontend Developer", email: "ramiro@mitienda.com" },
    { id: 2, nombre: "Ana López", puesto: "Diseñadora UX/UI", email: "ana@mitienda.com" },
    { id: 3, nombre: "Carlos Gómez", puesto: "Backend Developer", email: "carlos@mitienda.com" },
  ];

  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <Container>
        <Row className="text-center mb-4">
          <Col>
            <h3>Mi Tienda S.A.</h3>
            <p className="text-white-50">Transformando el e-commerce con tecnología moderna.</p>
          </Col>
        </Row>

        <Row className="justify-content-center g-3">
          {equipo.map((persona) => (
            <Col key={persona.id} xs={12} sm={6} md={4} lg={3}>
              <TarjetaContacto {...persona} />
            </Col>
          ))}
        </Row>
      </Container>
    </footer>
  );
}
