import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./config";

const COLECCION = "productos";

export async function obtenerProductos() {
  const snapshot = await getDocs(collection(db, COLECCION));
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
}

export async function obtenerProductoPorId(id) {
  const refProducto = doc(db, COLECCION, id);
  const snapshot = await getDoc(refProducto);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}

export async function agregarProducto(producto) {
  const refCreada = await addDoc(collection(db, COLECCION), producto);
  return refCreada.id;
}

export async function editarProducto(id, cambios) {
  const refProducto = doc(db, COLECCION, id);
  await updateDoc(refProducto, cambios);
}

export async function eliminarProducto(id) {
  const refProducto = doc(db, COLECCION, id);
  await deleteDoc(refProducto);
}
