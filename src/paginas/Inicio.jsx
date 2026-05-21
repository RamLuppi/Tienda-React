import { ItemListContainer } from '../componentes/ItemListContainer/ItemListContainer';

export function Inicio() {
  return (
    <div>
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '4rem 2rem',
        textAlign: 'center',
        borderBottom: '1px solid #e9ecef'
      }}>
        <h1 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '1rem' }}>
          ¡Bienvenidos a Mi Tienda!
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#6c757d', maxWidth: '600px', margin: '0 auto' }}>
          Descubre los mejores productos tecnológicos con envíos a todo el país y la atención personalizada que te mereces.
        </p>
      </div>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <ItemListContainer />
      </main>
    </div>
  );
}