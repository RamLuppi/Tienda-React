import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

export function CartWidget() {

  const { cart } = useContext(CartContext);


  const cantidadTotal = cart.reduce((total, producto) => total + producto.cantidad, 0);

  return (
    <Link to="/carrito" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
      <span style={{ fontSize: '1.5rem' }}>🛒</span>
      {cantidadTotal > 0 && (
        <span style={{
          backgroundColor: 'red',
          color: 'white',
          borderRadius: '50%',
          padding: '2px 6px',
          fontSize: '0.8rem',
          marginLeft: '5px',
          fontWeight: 'bold'
        }}>
          {cantidadTotal}
        </span>
      )}
    </Link>
  );
}