
console.log("Main.js cargado correctamente");

const btnCargar = document.getElementById('btn-cargar');
const btnEjecutar = document.getElementById('btn-ejecutar');
const btnBipartito = document.getElementById('btn-bipartito');
const txtMatriz = document.getElementById("matriz-input");
const salida = document.getElementById("resultado");
const canvas = document.getElementById("lienzo");
const ctx = canvas.getContext("2d");

btnCargar.addEventListener('click', () => {
    const txt = txtMatriz.value.trim();
    if (!txt) {
        alert("Inserta una matriz primero");
        return;
    }

    const matriz = txt.split("\n").map(row =>
        row.trim().split(/\s+/).map(Number)
    );

    window.grafo = matriz;
    salida.textContent = "Matriz cargada:\n" + JSON.stringify(matriz, null, 2);
    console.log("Grafo cargado:", matriz);

    dibujarGrafo(matriz);

    alert("Grafo cargado y dibujado");
});

function dibujarGrafo(matriz){
    ctx.clearRect(0,0, canvas.width, canvas.height);

    const n = matriz.length;
    if (n === 0) return;

    const radio = 150;
    const centroX = canvas.width/2;
    const centroY = canvas.height/2;

    const coordenadas = [];
    const anguloPaso = (2*Math.PI)/n;

    for(let i=0; i<n; i++){
        const angulo = i*anguloPaso - (Math.PI/2);
        const x = centroX+radio*Math.cos(angulo);
        const y = centroY+radio*Math.sin(angulo);
        coordenadas.push({x,y,id:i});
    }

    ctx.strikeStyle = "#888";
    ctx.lineWidth = 2;

    for(let i=0; i<n; i++){
        for(let j=0; j<n; j++){
            if(matriz[i][j]!==0){
                ctx.beginPath();
                ctx.moveTo(coordenadas[i].x, coordenadas[i].y);
                ctx.lineTo(coordenadas[j].x, coordenadas[j].y);
                ctx.stroke();
            }
        }
    }

    for(let i=0; i<n; i++){
        const nodo = coordenadas[i];

        ctx.beginPath();
        ctx.arc(nodo.x, nodo.y, 20, 0 ,2*Math.PI);
        ctx.fillStyle = "#3498db";
        ctx.fill();
        ctx.strikeStyle = "#2980b9"
        ctx.stroke();

        ctx.fillStyle = "white";
        ctx.font = "bolt 16px Arial";
        ctx.textAlign = "center";
        ctx.fillText(i,nodo.x,nodo.y);
    }
}

btnEjecutar.addEventListener('click', () => {
    console.log("Ejecutando algoritmo...");
    
});

btnBipartito.addEventListener('click', () => {
    if (typeof ejecutarBipartito === "function") {
        ejecutarBipartito();
    } else {
        alert("No se encontró bipartito.js");
    }
});

