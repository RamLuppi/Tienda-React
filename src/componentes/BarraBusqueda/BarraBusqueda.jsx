import { InputGroup, Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

export function BarraBusqueda({ valor, onChange, placeholder = 'Buscar productos...' }) {
  return (
    <InputGroup className="mx-auto mb-4 col-12 col-sm-8 col-md-6">
      <InputGroup.Text>
        <FaSearch />
      </InputGroup.Text>
      <Form.Control
        type="text"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Buscar productos"
      />
    </InputGroup>
  );
}
