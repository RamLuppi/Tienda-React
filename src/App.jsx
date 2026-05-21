import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Layout } from "./componentes/Layout/Layout";
import { ItemListContainer } from "./componentes/ItemListContainer/ItemListContainer";
import Carrito from "./paginas/Carrito";
import { ItemDetailContainer } from "./componentes/ItemDetailContainer/ItemDetailContainer"; 

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<div style={{ padding: "2rem" }}><h1>¡Bienvenidos a Mi Tienda!</h1></div>} />
            <Route path="/productos" element={<ItemListContainer />} />
            <Route path="/producto/:id" element={<ItemDetailContainer />} />
            <Route path="/carrito" element={<Carrito />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;