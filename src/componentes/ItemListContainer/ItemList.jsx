import { Item } from './Item';

export function ItemList({ productos }) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
      padding: '2rem 0'
    }}>
      {productos.map((prod) => (
        <Item 
          key={prod.id} 
          id={prod.id}
          nombre={prod.nombre}
          precio={prod.precio}
          stock={prod.stock}
          imagen={prod.imagen}
        />
      ))}
    </div>
  );
}