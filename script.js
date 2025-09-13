const boton = document.getElementById("miBoton");
const boton1 = document.getElementById("iniciobtn");

// Solo si existen, agregamos el evento
if (boton) {
  boton.addEventListener("click", () => {
    window.location.href = "Contacto.html";
  });
}

if (boton1) {
  boton1.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}
