console.log("Main.js cargado correctamente");

const btnCargar = document.getElementById('btn-cargar');
const btnEjecutar = document.getElementById('btn-ejecutar');
const txtMatriz = document.getElementById("matriz_input");
const salida = document.getElementById("resultado");
const canvas = document.getElementById("lienzo");
const ctx = canvas.getContext("2d");
const chkDirigido = document.getElementById('check-dirigido');
const chkPonderado = document.getElementById('check-ponderado');

const toggleBtn = document.getElementById('toggle-console-btn');
const closeBtn = document.getElementById('close-console-btn');
const drawer = document.getElementById('console-drawer');
const overlay = document.getElementById('console-overlay');

setTimeout(() => {
    if (window.LocomotiveScroll) {
        const scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            multiplier: 0.8
        });
        new ResizeObserver(() => scroll.update()).observe(document.querySelector('.main-container'));
    }
}, 100);

function openConsole() {
    drawer.classList.add('is-open');
    overlay.classList.add('is-active');
}

function closeConsole() {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-active');
}

toggleBtn.addEventListener('click', openConsole);
closeBtn.addEventListener('click', closeConsole);
overlay.addEventListener('click', closeConsole);

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
    window.esDirigido = chkDirigido.checked;
    window.esPonderado = chkPonderado.checked;

    let info = `Grafo cargado (Dirigido: ${window.esDirigido}, Ponderado: ${window.esPonderado}):\n`;
    info += JSON.stringify(matriz, null, 2);
    salida.textContent = info;
    console.log("Grafo cargado:", matriz);

    dibujarGrafo(matriz, window.esDirigido, window.esPonderado);
});

function dibujarGrafo(matriz, dirigido, ponderado){
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
        const x = centroX + radio * Math.cos(angulo);
        const y = centroY + radio * Math.sin(angulo);
        coordenadas.push({x,y,id:i});
    }

    ctx.lineWidth = 1.8;
    ctx.strokeStyle = "rgba(139,148,158,0.4)"; 

    for(let i=0; i<n; i++){
        for(let j=0; j<n; j++){
            const peso = matriz[i][j];
            if(peso !== 0){
                if (!dirigido && i > j) continue;

                const start = coordenadas[i];
                const end = coordenadas[j];

                if (dirigido) {
                    dibujarFlecha(ctx, start.x, start.y, end.x, end.y, 20); 
                } else {
                    ctx.beginPath();
                    ctx.moveTo(start.x, start.y);
                    ctx.lineTo(end.x, end.y);
                    ctx.stroke();
                }

                if (ponderado) {
                    const midX = (start.x + end.x) / 2;
                    const midY = (start.y + end.y) / 2;
                    
                    let offsetX = 0; 
                    let offsetY = 0;
                    
                    if (dirigido && matriz[j][i] !== 0) {
                        offsetX = (end.y - start.y) * 0.1;
                        offsetY = -(end.x - start.x) * 0.1;
                    }

                    ctx.fillStyle = "#0d1117"; 
                    ctx.fillRect(midX + offsetX - 8, midY + offsetY - 8, 16, 16);
                    
                    ctx.fillStyle = "#58a6ff";
                    ctx.font = "12px monospace";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText(peso, midX + offsetX, midY + offsetY);
                    ctx.strokeStyle = "rgba(139,148,158,0.4)";
                }
            }
        }
    }

    for(let i=0; i<n; i++){
        const nodo = coordenadas[i];
        ctx.beginPath();
        ctx.arc(nodo.x, nodo.y, 20, 0, 2*Math.PI);
        ctx.fillStyle = "#21262d";
        ctx.fill();
        ctx.strokeStyle = "#30363d";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = "#c9d1d9";
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(i, nodo.x, nodo.y);
    }
}

function dibujarFlecha(ctx, fromX, fromY, toX, toY, radioNodo) {
    const headlen = 10; 
    const angle = Math.atan2(toY - fromY, toX - fromX);
    
    const endX = toX - radioNodo * Math.cos(angle);
    const endY = toY - radioNodo * Math.sin(angle);
    const startX = fromX + radioNodo * Math.cos(angle);
    const startY = fromY + radioNodo * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - headlen * Math.cos(angle - Math.PI / 6), endY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(endX - headlen * Math.cos(angle + Math.PI / 6), endY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.lineTo(endX, endY);
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fill();
}

btnEjecutar.addEventListener('click', () => {
    const opcion = document.getElementById("select-algoritmo").value;
    let ejecutado = false;
    
    switch(opcion) {
        case "1":
            if (typeof ejecutarBFS === "function") { ejecutarBFS(); ejecutado = true; }
            else alert("Falta bfs.js");
            break;
        case "2":
            if (typeof ejecutarDFS === "function") { ejecutarDFS(); ejecutado = true; }
            else alert("Falta dfs.js");
            break;
        case "3":
            if (typeof ejecutarDijkstra === "function") { ejecutarDijkstra(); ejecutado = true; }
            else alert("Falta dijkstra.js");
            break;
        case "4":
            if (typeof ejecutarBipartito === "function") { ejecutarBipartito(); ejecutado = true; }
            else alert("Falta bipartito.js");
            break;
        case "5":
            if (typeof ejecutarMatching === "function") { ejecutarMatching(); ejecutado = true; }
            else alert("Falta matching.js");
            break;
    }

    if (ejecutado) {
        openConsole();
    }
});