import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; 

export function ItemDetailContainer() {
  const { id } = useParams(); 
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const { addToCart } = useCart();

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
        <img src={producto.imagen} alt={producto.nombre} style={{ width: '100%', maxHeight: '350px', objectFit: 'cover', borderRadius: '8px' }} />
      </div>

      <div style={{ flex: '1', minWidth: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }}>
        <h2 style={{ color: '#2c3e50', margin: '0' }}>{producto.nombre}</h2>
        <p style={{ color: '#27ae60', fontSize: '1.6rem', fontWeight: 'bold', margin: '0' }}>${producto.precio.toLocaleString()}</p>
        <p style={{ fontSize: '0.9rem', color: '#7f8c8d', margin: '0 0 10px 0' }}>Stock disponible: <strong>{producto.stock} unidades</strong></p>

        {/* Contador */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
          <button onClick={decrementar} style={{ padding: '2px 8px', cursor: 'pointer' }}>-</button>
          <span style={{ fontWeight: 'bold' }}>{cantidad}</span>
          <button onClick={incrementar} style={{ padding: '2px 8px', cursor: 'pointer' }}>+</button>
        </div>

        <button 
          onClick={handleAgregar}
          style={{
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Agregar al Carrito
        </button>

        <Link to="/productos" style={{ textDecoration: 'none', color: '#3498db', fontSize: '0.9rem', textAlign: 'center', marginTop: '5px' }}>
          ← Volver al catálogo
        </Link>
      </div>
    </div>
  );
}