import { TarjetaContacto } from "../TarjetaContacto/TarjetaContacto";

export function Footer() {
  const equipo = [
    { id: 1, nombre: "Ramiro", rol: "Frontend Developer", foto: "https://via.placeholder.com/80" },
    { id: 2, nombre: "Ana López", rol: "Diseñadora UX/UI", foto: "https://via.placeholder.com/80" },
    { id: 3, nombre: "Carlos Gómez", rol: "Backend Developer", foto: "https://via.placeholder.com/80" }
  ];

  return (
    <footer style={{ backgroundColor: "#2c3e50", color: "white", padding: "2rem", marginTop: "4rem", fontFamily: "sans-serif" }}>
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <h3>Mi Tienda S.A.</h3>
        <p>Transformando el e-commerce con tecnología moderna.</p>
      </div>

      {/* Tarjetas de las 3 personas */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        {equipo.map(persona => (
          <div key={persona.id} style={{ backgroundColor: "#34495e", padding: "10px", borderRadius: "8px", width: "160px", textAlign: "center" }}>
            <img src={persona.foto} alt={persona.nombre} style={{ borderRadius: "50%", marginBottom: "10px" }} />
            <h4 style={{ margin: "5px 0", fontSize: "0.95rem" }}>{persona.nombre}</h4>
            <p style={{ margin: "0", fontSize: "0.8rem", color: "#bdc3c7" }}>{persona.rol}</p>
          </div>
        ))}
      </div>
    </footer>
  );
}