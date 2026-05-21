import React, { useState } from 'react';
import { useCart } from '../../context/CartContext'; 
import { useNavigate } from 'react-router-dom'; 

export function Item({ id, nombre, precio, stock, imagen }) {
  const [cantidad, setCantidad] = useState(1);
  const { addToCart } = useCart();
  
  const navigate = useNavigate(); 

  const incrementar = () => {
    if (cantidad < stock) setCantidad(cantidad + 1);
  };

  const decrementar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const handleAgregar = () => {
    const productoParaAgregar = { id, nombre, precio, imagen, stock };
    addToCart(productoParaAgregar, cantidad);
    alert(`¡Agregaste ${cantidad} ${nombre} al carrito!`);
  };

  return (
    <div style={{
      border: '1px solid #eee',
      borderRadius: '8px',
      padding: '1rem',
      width: '240px',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      fontFamily: 'sans-serif'
    }}>
      <img src={imagen} alt={nombre} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px' }} />
      <h3 style={{ fontSize: '1.1rem', margin: '10px 0' }}>{nombre}</h3>
      <p style={{ color: '#27ae60', fontWeight: 'bold', margin: '5px 0' }}>${precio.toLocaleString()}</p>
      <p style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>Stock disponible: {stock}</p>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
        <button onClick={decrementar} style={{ padding: '2px 8px' }}>-</button>
        <span>{cantidad}</span>
        <button onClick={incrementar} style={{ padding: '2px 8px' }}>+</button>
      </div>

      <button 
        onClick={() => navigate(`/producto/${id}`)}
        style={{
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%',
          marginBottom: '8px',
          fontWeight: '500'
        }}
      >
        Ver Detalle
      </button>

      <button 
        onClick={handleAgregar}
        style={{
          backgroundColor: '#2ecc71',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%',
          fontWeight: 'bold'
        }}
      >
        Agregar al Carrito
      </button>
    </div>
  );
}