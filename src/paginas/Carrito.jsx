import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Carrito() {
  const { cart } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '5rem 2rem', 
        fontFamily: 'system-ui, -apple-system, sans-serif', 
        color: '#95a5a6' 
      }}>
        <h2 style={{ fontWeight: '500', fontSize: '1.5rem' }}>Tu carrito está vacío. ¡Explorá nuestra tienda!</h2>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '550px',
      margin: '3rem auto',
      padding: '2.5rem 2rem',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.02)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ 
        color: '#2c3e50', 
        fontSize: '1.6rem', 
        marginBottom: '2rem', 
        textAlign: 'center',
        fontWeight: '700'
      }}>
        Tu Carrito de Compras
      </h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '2rem' }}>
        {cart.map((item) => (
          <div 
            key={item.id} 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1.2rem',
              backgroundColor: '#fdfdfd',
              borderRadius: '10px',
              border: '1px solid #f1f2f6',
              transition: 'transform 0.2s ease'
            }}
          >
            <div>
              <h5 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', color: '#2c3e50', fontWeight: '600' }}>
                {item.nombre}
              </h5>
              <p style={{ margin: '0', fontSize: '0.85rem', color: '#8892b0' }}>
                Precio unitario: <span style={{ fontWeight: '500', color: '#2c3e50' }}>${item.precio}</span>
              </p>
            </div>
            
            <div style={{ 
              backgroundColor: '#f1f2f6',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: '600',
              color: '#57606f',
              textAlign: 'right'
            }}>
              Cantidad: {item.cantidad || 1}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ 
        borderTop: '1px solid #edaef2f',
        paddingTop: '1.5rem', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: '15px'
      }}>
        {/* Aca iria el total de la compra */}
        
        <button style={{
          backgroundColor: '#2ed573',
          color: 'white',
          border: 'none',
          padding: '14px 24px',
          borderRadius: '10px',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: '600',
          width: '100%',
          boxShadow: '0 4px 12px rgba(46, 213, 115, 0.2)',
          transition: 'all 0.2s ease'
        }}>
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}

export default Carrito;