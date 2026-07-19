import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import { obtenerProductoPorId } from '../../firebase/productosService';
import { Spinner } from '../Spinner/Spinner';

export function ItemDetailContainer() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    obtenerProductoPorId(id)
      .then((encontrado) => {
        setProducto(encontrado);
        setError(null);
      })
      .catch((err) => {
        console.error("Error al cargar el detalle:", err);
        setError('No se pudo cargar el producto. Intentá de nuevo más tarde.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const incrementar = () => {
    if (producto && cantidad < producto.stock) setCantidad(cantidad + 1);
  };

  const decrementar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const handleAgregar = () => {
    if (producto) {
      const productoParaAgregar = {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        stock: producto.stock
      };
      addToCart(productoParaAgregar, cantidad);
      alert(`¡Agregaste ${cantidad} ${producto.nombre} al carrito!`);
    }
  };

  if (loading) {
    return <Spinner texto="Cargando detalle..." />;
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <h2>{error}</h2>
        <Link to="/productos">Volver al catálogo</Link>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="text-center mt-5">
        <h2>El producto solicitado no existe.</h2>
        <Link to="/productos">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{producto.nombre} | Mi Tienda</title>
        <meta name="description" content={producto.descripcion || `Comprá ${producto.nombre} en Mi Tienda.`} />
      </Helmet>

      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <Row className="g-4 align-items-center">
                  <Col md={6}>
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="img-fluid rounded"
                    />
                  </Col>

                  <Col md={6} className="d-flex flex-column justify-content-center gap-2">
                    <h2 className="mb-0">{producto.nombre}</h2>
                    <p className="text-muted mb-2">{producto.descripcion}</p>
                    <p className="fs-3 fw-bold text-success mb-0">
                      ${producto.precio.toLocaleString()}
                    </p>
                    <p className="text-muted small mb-2">
                      Stock disponible: <strong>{producto.stock} unidades</strong>
                    </p>

                    <div className="d-flex justify-content-center align-items-center gap-3 my-2">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="rounded-circle"
                        onClick={decrementar}
                      >
                        -
                      </Button>
                      <span className="fw-bold">{cantidad}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="rounded-circle"
                        onClick={incrementar}
                      >
                        +
                      </Button>
                    </div>

                    <Button variant="success" className="w-100 fw-bold" onClick={handleAgregar}>
                      Agregar al Carrito
                    </Button>

                    <Link to="/productos" className="btn btn-secondary text-center small mt-2">
                      ← Volver al catálogo
                    </Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
