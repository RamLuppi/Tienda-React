import { Spinner as SpinnerBootstrap } from 'react-bootstrap';

export function Spinner({ texto = 'Cargando...' }) {
  return (
    <div className="text-center text-muted py-5">
      <SpinnerBootstrap animation="border" role="status" variant="primary" />
      <p className="mt-3 mb-0">{texto}</p>
    </div>
  );
}
