import { useCart } from '../context/CartContext';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { FaTrashAlt, FaShoppingBag } from 'react-icons/fa';

function Carrito() {
  const { cart, removeFromCart, clearCart, precioTotal } = useCart();

  if (cart.length === 0) {
    return (
      <Container className="text-center text-muted py-5">
        <Helmet>
          <title>Carrito | Mi Tienda</title>
        </Helmet>
        <FaShoppingBag size={40} className="mb-3 opacity-50" />
        <h2 className="fs-3 fw-normal">Tu carrito está vacío. ¡Explorá nuestra tienda!</h2>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Helmet>
        <title>Carrito | Mi Tienda</title>
      </Helmet>

      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="p-4 shadow-sm border-0">
            <Card.Body>
          <Card.Title as="h1" className="h4 text-center mb-4">
            Tu Carrito de Compras
          </Card.Title>

          <div className="d-flex flex-column gap-3 mb-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between align-items-center p-3 bg-light rounded border"
              >
                <div>
                  <h5 className="mb-1 fs-6 fw-semibold">{item.nombre}</h5>
                  <p className="mb-0 small text-muted">
                    Precio unitario: <span className="fw-semibold text-dark">${item.precio}</span>
                  </p>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <Badge bg="secondary" pill className="fw-semibold px-3 py-2">
                    Cantidad: {item.cantidad || 1}
                  </Badge>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Eliminar ${item.nombre} del carrito`}
                  >
                    <FaTrashAlt size={12} className="me-1" /> Quitar
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-top pt-4 d-flex flex-column align-items-center gap-3">
            <p className="fs-5 fw-bold mb-0">
              Total: ${precioTotal.toLocaleString()}
            </p>

            <Button variant="success" className="w-100 py-2">
              Finalizar Compra
            </Button>

            <Button variant="link" className="text-muted text-decoration-underline" onClick={clearCart}>
              Vaciar carrito
            </Button>
          </div>
        </Card.Body>
      </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Carrito;
