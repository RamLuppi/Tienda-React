import { Row, Col } from "react-bootstrap";
import { Item } from "./Item";

export function ItemList({ productos }) {
  return (
    <Row className="g-4 justify-content-center">
      {productos.map((prod) => (
        <Col key={prod.id} xs={12} sm={6} md={4} lg={3}>
          <Item
            id={prod.id}
            nombre={prod.nombre}
            precio={prod.precio}
            stock={prod.stock}
            imagen={prod.imagen}
          />
        </Col>
      ))}
    </Row>
  );
}
