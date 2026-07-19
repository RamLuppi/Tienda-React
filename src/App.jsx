import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { RutaPrivada } from "./componentes/RutaPrivada/RutaPrivada";
import { Layout } from "./componentes/Layout/Layout";
import { ItemListContainer } from "./componentes/ItemListContainer/ItemListContainer";
import Carrito from "./paginas/Carrito";
import { ItemDetailContainer } from "./componentes/ItemDetailContainer/ItemDetailContainer";
import Login from "./paginas/Login";
import Registro from "./paginas/Registro";
import Perfil from "./paginas/Perfil";
import Administracion from "./paginas/Administracion";
import Home from "./paginas/Home";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<ItemListContainer />} />
              <Route path="/producto/:id" element={<ItemDetailContainer />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route
                path="/perfil"
                element={
                  <RutaPrivada>
                    <Perfil />
                  </RutaPrivada>
                }
              />
              <Route
                path="/admin"
                element={
                  <RutaPrivada soloAdmin>
                    <Administracion />
                  </RutaPrivada>
                }
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
