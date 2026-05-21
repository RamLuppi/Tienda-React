import React, { useState, useEffect } from 'react';
import { ItemList } from './ItemList';

export function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    fetch('/data/productos.json')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudo cargar el catálogo de productos');
        }
        return respuesta.json();
      })
      .then((datos) => {
        setProductos(datos);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <div style={{ textAlign: 'center', padding: '3rem' }}><h3>Cargando catálogo, por favor espere...</h3></div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '3rem', color: 'red' }}><h3>Error: {error}</h3></div>;
  }

  return (
    <div style={{ padding: '1rem 2rem' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>Nuestros Productos</h2>
      <ItemList productos={productos} />
    </div>
  );
}