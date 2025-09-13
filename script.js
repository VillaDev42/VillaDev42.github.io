const boton = document.getElementById("miBoton");
const boton1 = document.getElementById("iniciobtn");
const boton2 = document.getElementById("Btn1");
// Solo si existen, agregamos el evento
if (boton) {
  boton.addEventListener("click", () => {
    window.location.href = "paginas/Contacto.html";
  });
}

if (boton1) {
  boton1.addEventListener("click", () => {
    window.location.href = "../index.html";
  });
}
if (boton2) {
  boton2.addEventListener("click", () => {
    window.location.href = "../index.html";
  });
}

