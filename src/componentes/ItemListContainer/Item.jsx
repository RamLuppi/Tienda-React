import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export function Item({ id, nombre, precio, stock, imagen }) {
  const [cantidad, setCantidad] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const incrementar = () => {
    if (cantidad < stock) setCantidad(cantidad + 1);
  };

  const decrementar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const handleAgregar = () => {
    addToCart({ id, nombre, precio, imagen, stock }, cantidad);
    alert(`¡Agregaste ${cantidad} ${nombre} al carrito!`);
  };

  return (
    <Card className="h-100 shadow-sm">
      <div className="ratio ratio-4x3">
        <Card.Img variant="top" src={imagen} alt={nombre} className="object-fit-cover" />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6">{nombre}</Card.Title>
        <Card.Text className="fw-bold text-primary font-monospace mb-1">
          ${precio.toLocaleString()}
        </Card.Text>
        <Card.Text className="text-muted small mb-3">Stock disponible: {stock}</Card.Text>

        <div className="d-flex align-items-center justify-content-center gap-3 mb-3">
          <Button
            variant="outline-secondary"
            size="sm"
            className="rounded-circle"
            onClick={decrementar}
            disabled={cantidad <= 1}
            aria-label="Restar unidad"
          >
            <FaMinus size={10} />
          </Button>
          <span>{cantidad}</span>
          <Button
            variant="outline-secondary"
            size="sm"
            className="rounded-circle"
            onClick={incrementar}
            disabled={cantidad >= stock}
            aria-label="Sumar unidad"
          >
            <FaPlus size={10} />
          </Button>
        </div>

        <Button
          variant="outline-primary"
          className="mb-2"
          onClick={() => navigate(`/producto/${id}`)}
        >
          Ver detalle
        </Button>

        <Button
          variant="primary"
          className="mt-auto d-flex align-items-center justify-content-center gap-2"
          onClick={handleAgregar}
        >
          <FaShoppingCart /> Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
}
