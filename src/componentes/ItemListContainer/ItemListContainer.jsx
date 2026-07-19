import { useState, useEffect, useMemo } from 'react';
import { Container, Pagination } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { ItemList } from './ItemList';
import { Spinner } from '../Spinner/Spinner';
import { BarraBusqueda } from '../BarraBusqueda/BarraBusqueda';
import { obtenerProductos } from '../../firebase/productosService';

const PRODUCTOS_POR_PAGINA = 8;

export function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    setCargando(true);
    obtenerProductos()
      .then((datos) => {
        setProductos(datos);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError('No se pudo cargar el catálogo de productos. Intentá de nuevo más tarde.');
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  const productosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    if (!termino) return productos;
    return productos.filter((prod) => prod.nombre?.toLowerCase().includes(termino));
  }, [productos, busqueda]);

  const totalPaginas = Math.max(1, Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA));

  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda]);

  const productosPagina = useMemo(() => {
    const inicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
    return productosFiltrados.slice(inicio, inicio + PRODUCTOS_POR_PAGINA);
  }, [productosFiltrados, paginaActual]);

  return (
    <Container className="py-4 px-3">
      <Helmet>
        <title>Productos | Mi Tienda</title>
        <meta name="description" content="Explorá el catálogo completo de Mi Tienda: notebooks, monitores, teclados y más." />
      </Helmet>

      {cargando && <Spinner texto="Cargando catálogo, por favor espere..." />}

      {!cargando && error && (
        <div className="text-center py-5 text-danger"><h3>{error}</h3></div>
      )}

      {!cargando && !error && (
        <>
          <h2 className="text-center mb-4">Nuestros Productos</h2>

          <BarraBusqueda valor={busqueda} onChange={setBusqueda} />

          {productos.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <h3>Todavía no hay productos cargados.</h3>
            </div>
          ) : productosFiltrados.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <h3>No encontramos productos que coincidan con "{busqueda}".</h3>
            </div>
          ) : (
            <>
              <ItemList productos={productosPagina} />

              {totalPaginas > 1 && (
                <Pagination className="justify-content-center mt-4">
                  <Pagination.Prev
                    disabled={paginaActual === 1}
                    onClick={() => setPaginaActual((p) => Math.max(1, p - 1))}
                  />
                  {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((numero) => (
                    <Pagination.Item
                      key={numero}
                      active={numero === paginaActual}
                      onClick={() => setPaginaActual(numero)}
                    >
                      {numero}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    disabled={paginaActual === totalPaginas}
                    onClick={() => setPaginaActual((p) => Math.min(totalPaginas, p + 1))}
                  />
                </Pagination>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
}
