import { ItemListContainer } from '../componentes/ItemListContainer/ItemListContainer';

export function Inicio() {
  return (
    <div>
      <div className="bg-light py-5 px-3 text-center border-bottom">
        <h1 className="fs-2 text-dark mb-3">
          ¡Bienvenidos a Mi Tienda!
        </h1>
        <p className="fs-5 text-muted mx-auto" style={{ maxWidth: '600px' }}>
          Tenemos los mejores productos tecnológicos con envíos a todo el país.
        </p>
      </div>

      <main className="container py-4">
        <ItemListContainer />
      </main>
    </div>
  );
}