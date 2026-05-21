import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export function ItemDetailContainer() {
  const { id } = useParams(); 
  
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/data/productos.json')
      .then((res) => res.json())
      .then((data) => {
        const encontrado = data.find((prod) => prod.id == id);
        setProducto(encontrado);
      })
      .catch((err) => console.error("Error al cargar el detalle:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <h2 style={{ textAlign: 'center', marginTop: '3rem', fontFamily: 'sans-serif' }}>Cargando detalle...</h2>;
  }

  if (!producto) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem', fontFamily: 'sans-serif' }}>
        <h2>El producto solicitado no existe.</h2>
        <Link to="/productos">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '700px',
      margin: '3rem auto',
      padding: '2rem',
      display: 'flex',
      gap: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      flexWrap: 'wrap'
    }}>

      <div style={{ flex: '1', minWidth: '250px' }}>
        <img 
          src={producto.imagen} 
          alt={producto.nombre} 
          style={{ width: '100%', maxHeight: '350px', objectFit: 'cover', borderRadius: '8px' }} 
        />
      </div>

      <div style={{ flex: '1', minWidth: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 style={{ color: '#2c3e50', margin: '0 0 10px 0', fontSize: '1.8rem' }}>{producto.nombre}</h2>
        
        <p style={{ color: '#27ae60', fontSize: '1.6rem', fontWeight: 'bold', margin: '0 0 10px 0' }}>
          ${producto.precio.toLocaleString()}
        </p>
        
        <p style={{ fontSize: '0.9rem', color: '#7f8c8d', marginBottom: '24px' }}>
          Stock disponible: <strong>{producto.stock} unidades</strong>
        </p>

        <Link 
          to="/productos" 
          style={{ 
            display: 'inline-block',
            textAlign: 'center',
            backgroundColor: '#3498db',
            color: 'white',
            textDecoration: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '0.95rem'
          }}
        >
          Volver al catálogo
        </Link>
      </div>
    </div>
  );
}