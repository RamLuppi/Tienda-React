import { Modal, Button } from 'react-bootstrap';

export function ModalConfirmacion({ abierto, titulo, mensaje, onConfirmar, onCancelar, confirmando }) {
  return (
    <Modal show={abierto} onHide={onCancelar} centered>
      <Modal.Header closeButton>
        <Modal.Title className="h5">{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-muted">{mensaje}</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onCancelar} disabled={confirmando}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirmar} disabled={confirmando}>
          {confirmando ? 'Eliminando...' : 'Eliminar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
