import { Container, Row, Col, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaBolt, FaShieldAlt, FaTruck } from 'react-icons/fa';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Mi Tienda | Tecnología para tu día a día</title>
        <meta name="description" content="Notebooks, monitores, teclados y más tecnología, con envío y garantía en toda la compra." />
      </Helmet>

      <section className="bg-dark text-white py-5">
        <Container>
          <Row>
            <Col md={8} lg={7}>
              <p className="font-monospace text-uppercase text-info small mb-2">Catálogo 2026</p>
              <h1 className="display-5 fw-bold mb-3">
                Tecnología pensada para rendir, no solo para lucir.
              </h1>
              <p className="text-white-50 fs-5">
                Notebooks, monitores y periféricos elegidos por especificaciones reales, no por marketing.
              </p>
              <Button
                variant="primary"
                className="mt-3 d-inline-flex align-items-center gap-2"
                onClick={() => navigate('/productos')}
              >
                Ver catálogo <FaArrowRight />
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <Container>
        <Row>
          <Col md={4}>
            <div className="text-center p-4">
              <FaBolt className="text-primary fs-2 mb-2" />
              <h4 className="fs-6">Despacho rápido</h4>
              <p className="text-muted small">Preparamos tu pedido en menos de 24 horas hábiles.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="text-center p-4">
              <FaShieldAlt className="text-primary fs-2 mb-2" />
              <h4 className="fs-6">Garantía oficial</h4>
              <p className="text-muted small">Todos los productos incluyen garantía del fabricante.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="text-center p-4">
              <FaTruck className="text-primary fs-2 mb-2" />
              <h4 className="fs-6">Envíos a todo el país</h4>
              <p className="text-muted small">Desde la Quiaca hasta Las Malvinas.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
