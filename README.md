# Mi Tienda

Este es mi proyecto final del curso de React en Talento Lab. Es un eCommerce hecho con React donde se puede ver un catálogo de productos, buscar y filtrar, agregar cosas al carrito, registrarse/loguearse, y si sos administrador podés cargar, editar y borrar productos desde un panel.

## Con qué está hecho

- React + Vite
- React Router para las rutas
- Firebase (Authentication para el login, Firestore como base de datos de los productos)
- React-Bootstrap para que se vea bien en el celular
- styled-components para los estilos de algunos componentes
- react-icons para los iconitos
- react-helmet-async para el título de cada página

## Cómo correrlo

Primero instalar las dependencias:

```
npm install
```

Después hay que crear un proyecto en Firebase (es gratis, en https://console.firebase.google.com). Adentro del proyecto:

1. Ir a Authentication y activar el método de Email/Contraseña.
2. Ir a Firestore Database y crearla (con el modo de prueba alcanza para probarlo).
3. Ir a la configuración del proyecto, agregar una app web, y ahí te da las claves para conectarlo.

Con esas claves hay que crear un archivo `.env` en la raíz del proyecto.

```
VITE_FIREBASE_API_KEY=tu-clave
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=tu-app-id
VITE_ADMIN_EMAILS=tuemail@gmail.com
```

Lo último (`VITE_ADMIN_EMAILS`) es tu email, o los emails que quieras que tengan acceso al panel de administración. Si no lo cargás, nadie va a poder entrar al panel donde está el ABM de productos.

Ya con todo esto se puede levantar el proyecto:

```
npm run dev
```

Y entrar a http://localhost:5173

## Ojo con esto

El catálogo arranca vacío porque los productos se guardan en Firestore, no están hardcodeados. Para cargar los primeros productos hay que:
1. Registrarse en la app (o loguearse si ya tenés cuenta).
2. Si tu email está en `VITE_ADMIN_EMAILS`, te va a aparecer un link "Panel" en el menú de arriba.
3. Ahí hay un formulario para agregar productos (nombre, precio, stock, imagen, descripción).

## Estructura

Los componentes reutilizables están en `src/componentes`, las páginas en `src/paginas`, el contexto de auth y del carrito en `src/context`, y todo lo de Firebase en `src/firebase`.

## Para desplegarlo

Si lo van a subir a producción (Vercel, Netlify, etc.) hay dos cosas importantes:

- Cargar las mismas variables de entorno del `.env` en el panel del hosting.
- Cambiar las reglas de Firestore, porque el modo de prueba deja que cualquiera lea y escriba en la base. En Firestore Database > Reglas se puede restringir para que solo se pueda escribir si el usuario está logueado y su email está en la lista de admins:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /productos/{productoId} {
      allow read: if true;
      allow write: if request.auth != null &&
        request.auth.token.email in ['tuemail@gmail.com'];
    }
  }
}
```

También hay que agregar el dominio donde lo publiquen a la lista de dominios autorizados en Authentication > Settings, si no el login no va a funcionar ahí.
