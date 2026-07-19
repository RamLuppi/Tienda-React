import { useState, useEffect } from 'react';
import { Container, Card, Form, Row, Col, Button, Table, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { FaSave, FaTimes, FaEdit, FaTrashAlt } from 'react-icons/fa';
import {
  obtenerProductos,
  agregarProducto,
  editarProducto,
  eliminarProducto,
} from '../firebase/productosService';
import { Spinner } from '../componentes/Spinner/Spinner';
import { ModalConfirmacion } from '../componentes/ModalConfirmacion/ModalConfirmacion';

const PRODUCTO_VACIO = { nombre: '', precio: '', stock: '', imagen: '', descripcion: '' };

function Administracion() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState(PRODUCTO_VACIO);
  const [editandoId, setEditandoId] = useState(null);
  const [erroresForm, setErroresForm] = useState({});
  const [guardando, setGuardando] = useState(false);

  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  const cargarProductos = () => {
    setCargando(true);
    obtenerProductos()
      .then((datos) => {
        setProductos(datos);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError('No se pudieron cargar los productos.');
      })
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validar = () => {
    const errores = {};
    if (!form.nombre.trim()) errores.nombre = 'El nombre es obligatorio.';
    if (!form.precio || Number(form.precio) <= 0) errores.precio = 'El precio debe ser mayor a 0.';
    if (form.stock === '' || Number(form.stock) < 0) errores.stock = 'El stock no puede ser negativo.';
    if (!form.imagen.trim()) errores.imagen = 'La URL de la imagen es obligatoria.';
    setErroresForm(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    const productoData = {
      nombre: form.nombre.trim(),
      precio: Number(form.precio),
      stock: Number(form.stock),
      imagen: form.imagen.trim(),
      descripcion: form.descripcion.trim(),
    };

    setGuardando(true);
    setError(null);
    try {
      if (editandoId) {
        await editarProducto(editandoId, productoData);
      } else {
        await agregarProducto(productoData);
      }
      setForm(PRODUCTO_VACIO);
      setEditandoId(null);
      cargarProductos();
    } catch (err) {
      console.error(err);
      setError('No se pudo guardar el producto. Intentá de nuevo.');
    } finally {
      setGuardando(false);
    }
  };

  const iniciarEdicion = (producto) => {
    setEditandoId(producto.id);
    setForm({
      nombre: producto.nombre || '',
      precio: producto.precio ?? '',
      stock: producto.stock ?? '',
      imagen: producto.imagen || '',
      descripcion: producto.descripcion || '',
    });
    setErroresForm({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setForm(PRODUCTO_VACIO);
    setErroresForm({});
  };

  const confirmarEliminar = async () => {
    if (!productoAEliminar) return;
    setEliminando(true);
    try {
      await eliminarProducto(productoAEliminar.id);
      setProductoAEliminar(null);
      cargarProductos();
    } catch (err) {
      console.error(err);
      setError('No se pudo eliminar el producto.');
    } finally {
      setEliminando(false);
    }
  };

  return (
    <Container className="py-4">
      <Helmet>
        <title>Panel de gestión | Mi Tienda</title>
      </Helmet>

      <Row className="justify-content-center">
        <Col xs={12} lg={10} xl={9}>
      <h1 className="mb-4">Panel de gestión de productos</h1>

      {/* Formulario de alta / edición */}
      <Card className="p-4 shadow-sm border-0 mb-4">
        <Card.Body>
          <Card.Title as="h3" className="h5 mb-3">
            {editandoId ? 'Editar producto' : 'Agregar producto'}
          </Card.Title>

          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="prodNombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    isInvalid={!!erroresForm.nombre}
                  />
                  <Form.Control.Feedback type="invalid">{erroresForm.nombre}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={6} md={3}>
                <Form.Group controlId="prodPrecio">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    name="precio"
                    type="number"
                    min="0"
                    value={form.precio}
                    onChange={handleChange}
                    isInvalid={!!erroresForm.precio}
                  />
                  <Form.Control.Feedback type="invalid">{erroresForm.precio}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={6} md={3}>
                <Form.Group controlId="prodStock">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    name="stock"
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={handleChange}
                    isInvalid={!!erroresForm.stock}
                  />
                  <Form.Control.Feedback type="invalid">{erroresForm.stock}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mt-3" controlId="prodImagen">
              <Form.Label>URL de la imagen</Form.Label>
              <Form.Control
                name="imagen"
                value={form.imagen}
                onChange={handleChange}
                isInvalid={!!erroresForm.imagen}
              />
              <Form.Control.Feedback type="invalid">{erroresForm.imagen}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mt-3" controlId="prodDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                name="descripcion"
                as="textarea"
                rows={3}
                value={form.descripcion}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex gap-2 mt-3">
              <Button type="submit" disabled={guardando}>
                <FaSave className="me-2" />
                {guardando ? 'Guardando...' : editandoId ? 'Guardar cambios' : 'Agregar producto'}
              </Button>
              {editandoId && (
                <Button type="button" variant="outline-secondary" onClick={cancelarEdicion}>
                  <FaTimes className="me-2" />
                  Cancelar edición
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>

      {error && <Alert variant="danger" className="text-center">{error}</Alert>}

      {/* Listado */}
      {cargando ? (
        <Spinner texto="Cargando productos..." />
      ) : productos.length === 0 ? (
        <p className="text-center text-muted">No hay productos cargados todavía.</p>
      ) : (
        <Table responsive hover className="bg-white shadow-sm rounded overflow-hidden align-middle">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.nombre}</td>
                <td>${Number(prod.precio).toLocaleString()}</td>
                <td>{prod.stock}</td>
                <td className="text-end text-nowrap">
                  <Button size="sm" variant="outline-secondary" className="me-2" onClick={() => iniciarEdicion(prod)}>
                    <FaEdit className="me-1" /> Editar
                  </Button>
                  <Button size="sm" variant="outline-danger" onClick={() => setProductoAEliminar(prod)}>
                    <FaTrashAlt className="me-1" /> Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <ModalConfirmacion
        abierto={!!productoAEliminar}
        titulo="Eliminar producto"
        mensaje={`¿Seguro que querés eliminar "${productoAEliminar?.nombre}"? Esta acción no se puede deshacer.`}
        onConfirmar={confirmarEliminar}
        onCancelar={() => setProductoAEliminar(null)}
        confirmando={eliminando}
      />
        </Col>
      </Row>
    </Container>
  );
}

export default Administracion;
