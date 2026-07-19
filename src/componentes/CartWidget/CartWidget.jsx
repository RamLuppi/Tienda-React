import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

export function CartWidget() {

  const { cart } = useContext(CartContext);


  const cantidadTotal = cart.reduce((total, producto) => total + producto.cantidad, 0);

  return (
    <Link to="/carrito" className="d-flex align-items-center text-decoration-none text-reset">
      <span className="fs-4">🛒</span>
      {cantidadTotal > 0 && (
        <span className="badge bg-danger rounded-circle p-1 ms-1 fw-bold fs-7" style={{ fontSize: '0.8rem' }}>
          {cantidadTotal}
        </span>
      )}
    </Link>
  );
}