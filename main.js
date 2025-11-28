console.log("Main.js cargado correctamente");

const btnCargar = document.getElementById('btn-cargar');
const btnEjecutar = document.getElementById('btn-ejecutar');

btnCargar.addEventListener('click', () => {
    alert("Botón Cargar presionado");
});

btnEjecutar.addEventListener('click', () => {
    console.log("Ejecutando algoritmo...");
});