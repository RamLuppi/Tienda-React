import React, { useState } from 'react';

export function TarjetaContacto({ nombre, puesto, email, foto }) {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        backgroundColor: '#ffffff',
        borderRadius: '16px', 
        padding: '24px 16px 20px 16px',
        margin: '1rem',
        textAlign: 'center',
        width: '230px',
        overflow: 'hidden',
        boxShadow: isHovered 
          ? '0 12px 24px rgba(0,0,0,0.12)' 
          : '0 4px 12px rgba(0,0,0,0.05)',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      {/* Bloque decorativo de fondo superior */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '65px',
        background: 'linear-gradient(135deg, #3498db, #2c3e50)',
        zIndex: 1
      }} />

      {/* Contenedor de la foto para darle un borde blanco flotante */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        margin: '0 auto 12px auto',
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        border: '4px solid #ffffff',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        backgroundColor: '#fff'
      }}>
        <img 
          src={foto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
          alt={nombre} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }} 
        />
      </div>

      {/* Información del contacto */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h4 style={{ 
          margin: '0 0 4px 0', 
          color: '#2c3e50', 
          fontSize: '1.2rem', 
          fontWeight: '700' 
        }}>
          {nombre}
        </h4>
        
        <p style={{ 
          margin: '0 0 12px 0', 
          fontSize: '0.85rem', 
          color: '#3498db', 
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {puesto}
        </p>
        
        <p style={{ 
          margin: '0 0 16px 0', 
          fontSize: '0.85rem', 
          color: '#7f8c8d',
          wordBreak: 'break-all'
        }}>
          {email}
        </p>
      </div>
    </div>
  );
}