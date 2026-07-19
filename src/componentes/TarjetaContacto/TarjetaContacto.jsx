import { Card } from 'react-bootstrap';

export function TarjetaContacto({ nombre, puesto, email, foto }) {
  return (
    <Card className="text-center h-100 border-0 shadow-sm">
      <Card.Body className="d-flex flex-column align-items-center">
        <img
          src={foto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
          alt={nombre}
          width="90"
          height="90"
          className="rounded-circle object-fit-cover border border-3 border-white shadow-sm mb-3"
        />
        <Card.Title className="fs-5 mb-1">{nombre}</Card.Title>
        <Card.Text className="text-primary text-uppercase fw-semibold small mb-2">
          {puesto}
        </Card.Text>
        <Card.Text className="text-muted small text-break">{email}</Card.Text>
      </Card.Body>
    </Card>
  );
}
