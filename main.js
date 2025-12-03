console.log("Main.js cargado correctamente")

// --- VARIABLES GLOBALES ---
window.coloresBipartito = null
window.nodoInicial = null // Variable para guardar el nodo seleccionado (HEAD)
window.mstAristas = null  // Variable para guardar aristas MST (fernando)

// --- REFERENCIAS DOM ---
const btnCargar = document.getElementById("btn-cargar")
const btnEjecutar = document.getElementById("btn-ejecutar")
const txtMatriz = document.getElementById("matriz_input")
const salida = document.getElementById("resultado")
const canvas = document.getElementById("lienzo")
const ctx = canvas.getContext("2d")
const chkDirigido = document.getElementById("check-dirigido")
const chkPonderado = document.getElementById("check-ponderado")
const inputArchivo = document.getElementById("input-archivo")
const btnImportar = document.getElementById("btn-importar-archivo")
const toggleBtn = document.getElementById("toggle-console-btn")
const closeBtn = document.getElementById("close-console-btn")
const drawer = document.getElementById("console-drawer")
const overlay = document.getElementById("console-overlay")

const toggleExamplesBtn = document.getElementById("toggle-examples-btn")
const closeExamplesBtn = document.getElementById("close-examples-btn")
const examplesDrawer = document.getElementById("examples-drawer")
const examplesGrid = document.getElementById("examples-grid")

// --- SCROLL SUAVE ---
setTimeout(() => {
    if (window.LocomotiveScroll) {
        const scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            multiplier: 0.8
        })
        new ResizeObserver(() => scroll.update()).observe(document.querySelector('.main-container'))
    }
}, 100)

// --- INTERFAZ / DRAWER ---
function openConsole() { 
    drawer.classList.add('is-open'); 
    overlay.classList.add('is-active');
    reproducirSonido(soundOpen);
    examplesDrawer.classList.remove('is-open');
}

function closeConsole() { 
    drawer.classList.remove('is-open'); 
    overlay.classList.remove('is-active');
    reproducirSonido(soundClose);
}

function openExamples() {
    examplesDrawer.classList.add('is-open');
    overlay.classList.add('is-active');
    reproducirSonido(soundOpen);
    drawer.classList.remove('is-open'); 
}

function closeExamples() {
    examplesDrawer.classList.remove('is-open');
    overlay.classList.remove('is-active');
    reproducirSonido(soundClose);
}

toggleBtn.addEventListener('click', openConsole)
closeBtn.addEventListener('click', closeConsole)
overlay.addEventListener('click', () => { closeConsole(); closeExamples(); })
toggleExamplesBtn.addEventListener('click', openExamples)
closeExamplesBtn.addEventListener('click', closeExamples)

// --- VARIABLES DE FISICA ---
let nodos = []
let dragging = null
let mouse = { x: 0, y: 0 }

// --- AUDIO ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
const osc = audioCtx.createOscillator()
osc.type = "sine"
osc.frequency.value = 40
const gain = audioCtx.createGain()
gain.gain.value = 0
osc.connect(gain)
gain.connect(audioCtx.destination)
osc.start()

const soundOpen = new Audio("assets/sounds/open.wav");
const soundClose = new Audio("assets/sounds/close.wav");
const soundClick = new Audio("assets/sounds/click.wav");
soundOpen.preload = 'auto';
soundClose.preload = 'auto';
soundClick.preload = 'auto';

function reproducirSonido(audio) {
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.warn("Error al reproducir audio:", e));
    }
}

// --- CARGAR MATRIZ ---
btnCargar.addEventListener('click', () => {
    reproducirSonido(soundClick);
    const txt = txtMatriz.value.trim()
    if (!txt) { alert("Inserta una matriz primero"); return }
    const matriz = txt.split("\n").map(r => r.trim().split(/\s+/).map(Number))
    
    // Reseteamos estados (Fusionado)
    window.coloresBipartito = null
    window.nodoInicial = null // Reseteamos la selección
    window.mstAristas = null  // Reseteamos MST

    window.grafo = matriz
    window.esDirigido = chkDirigido.checked
    window.esPonderado = chkPonderado.checked
    salida.textContent = `Grafo cargado (Dirigido: ${window.esDirigido}, Ponderado: ${window.esPonderado}):\n` + JSON.stringify(matriz, null, 2)
    
    dibujarGrafo(matriz, window.esDirigido, window.esPonderado)
})

// --- DIBUJAR ---
// Se mantiene la firma extendida para soportar MST y colores
function dibujarGrafo(matriz, dirigido, ponderado, arrayColores = null, mstAristas = null) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const n = matriz.length
    if (n === 0) return

    if (nodos.length !== n) {
        nodos = []
        const cx = canvas.width / 2
        const cy = canvas.height / 2
        const r = 150
        const step = (2 * Math.PI) / n
        for (let i = 0; i < n; i++) {
            const a = i * step - Math.PI / 2
            nodos.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), vx: 0, vy: 0, id: i, lx: cx, ly: cy })
        }
    }
    
    // Guardamos referencia global (HEAD)
    window.nodos = nodos; 

    ctx.lineWidth = 1.8
    ctx.strokeStyle = "rgba(139,148,158,0.4)"

    // Dibujar aristas normales
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matriz[i][j] !== 0) {
                if (!dirigido && i > j) continue
                let a = nodos[i]
                let b = nodos[j]
                
                if (dirigido) dibujarFlecha(ctx, a.x, a.y, b.x, b.y, 20)
                else {
                    ctx.beginPath()
                    ctx.moveTo(a.x, a.y)
                    ctx.lineTo(b.x, b.y)
                    ctx.stroke()
                }

                if (ponderado) {
                    const mx = (a.x + b.x) / 2
                    const my = (a.y + b.y) / 2
                    ctx.fillStyle = "#0d1117"
                    ctx.fillRect(mx - 8, my - 8, 16, 16)
                    ctx.fillStyle = "#58a6ff"
                    ctx.font = "12px monospace"
                    ctx.textAlign = "center"
                    ctx.textBaseline = "middle"
                    ctx.fillText(matriz[i][j], mx, my)
                }
            }
        }
    }

    // Dibujar MST Aristas (fernando)
    if (mstAristas && mstAristas.length > 0 && ponderado) {
        ctx.lineWidth = 4.5
        ctx.strokeStyle = "#48b6a3"
        ctx.setLineDash([])

        for(const arista of mstAristas) {
            const u = arista.u
            const v = arista.v

            let a = nodos[u]
            let b = nodos[v]

            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()

            const mx = (a.x + b.x) / 2
            const my = (a.y + b.y) / 2

            ctx.fillStyle = "#0d1117"
            ctx.fillRect(mx - 10, my - 10, 20, 20)

            ctx.fillStyle = "#f85149"
            ctx.font = "bold 13px monospace"
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillText(arista.peso, mx, my)
        }
    }

    // Dibujar Nodos
    for (let n1 of nodos) {
        ctx.beginPath()
        ctx.arc(n1.x, n1.y, 20, 0, 2 * Math.PI)
        
        // Lógica de colores (Bipartito > Seleccionado > Normal)
        if (arrayColores && arrayColores[n1.id] !== -1 && arrayColores[n1.id] !== undefined) {
            // Colores Bipartito
            if (arrayColores[n1.id] === 0) ctx.fillStyle = "#f85149" // Rojo
            else ctx.fillStyle = "#48b6a3" // Verde azulado
        } 
        else if (n1.id === window.nodoInicial) {
            // Nodo seleccionado por el usuario (HEAD)
            ctx.fillStyle = "#d29922" 
        } 
        else {
            // Nodo normal (Gris oscuro)
            ctx.fillStyle = "#21262d"
        }

        ctx.fill()

        // Borde del nodo
        if (n1.id === window.nodoInicial) {
            ctx.strokeStyle = "#f0f6fc" // Borde blanco brillante para selección
            ctx.lineWidth = 3
        } else {
            ctx.strokeStyle = "#30363d"
            ctx.lineWidth = 2
        }
        
        ctx.stroke()
        
        // Texto ID
        ctx.fillStyle = "#ffffffff"
        ctx.font = "bold 16px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(n1.id, n1.x, n1.y)
    }
}

function dibujarFlecha(ctx, fx, fy, tx, ty, r) {
    const h = 10
    const ang = Math.atan2(ty - fy, tx - fx)
    const ex = tx - r * Math.cos(ang)
    const ey = ty - r * Math.sin(ang)
    const sx = fx + r * Math.cos(ang)
    const sy = fy + r * Math.sin(ang)
    ctx.beginPath()
    ctx.moveTo(sx, sy)
    ctx.lineTo(ex, ey)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(ex, ey)
    ctx.lineTo(ex - h * Math.cos(ang - Math.PI / 6), ey - h * Math.sin(ang - Math.PI / 6))
    ctx.lineTo(ex - h * Math.cos(ang + Math.PI / 6), ey - h * Math.sin(ang + Math.PI / 6))
    ctx.lineTo(ex, ey)
    ctx.fillStyle = ctx.strokeStyle
    ctx.fill()
}

// --- INTERACCIÓN MOUSE ---
canvas.addEventListener("mousedown", e => {
    audioCtx.resume()
    const rect = canvas.getBoundingClientRect();
    let mx = e.clientX - rect.left;
    let my = e.clientY - rect.top;

    let clickEnNodo = false;

    for (let n1 of nodos) {
        if (Math.hypot(mx - n1.x, my - n1.y) <= 20) {
            dragging = n1
            
            // Lógica de Selección (HEAD)
            window.nodoInicial = n1.id
            clickEnNodo = true;
            
            // Feedback en consola
            const msg = `> Nodo ${n1.id} seleccionado como inicial.`;
            // Agregamos al principio sin borrar todo el historial
            salida.textContent = msg + "\n" + salida.textContent;
            
            reproducirSonido(soundClick);
            break
        }
    }
})

document.addEventListener("mouseup", () => {
    dragging = null
})

document.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

// --- BUCLE DE ANIMACIÓN ---
function loop() {
    if (dragging) {
        let targetX = Math.max(20, Math.min(canvas.width - 20, mouse.x));
        let targetY = Math.max(20, Math.min(canvas.height - 20, mouse.y));

        dragging.x += (targetX - dragging.x) * 0.15;
        dragging.y += (targetY - dragging.y) * 0.15;
        dragging.vx = dragging.x - dragging.lx;
        dragging.vy = dragging.y - dragging.ly;
    }

    // Colisiones entre nodos
    for (let i = 0; i < nodos.length; i++) {
        for (let j = i + 1; j < nodos.length; j++) {
            let n1 = nodos[i];
            let n2 = nodos[j];

            let dx = n2.x - n1.x;
            let dy = n2.y - n1.y;
            let dist = Math.hypot(dx, dy);

            if (dist < 40) {
                let angle = Math.atan2(dy, dx);
                let tx = Math.cos(angle);
                let ty = Math.sin(angle);
                let overlap = 40 - dist;

                n1.x -= tx * overlap * 0.5;
                n1.y -= ty * overlap * 0.5;
                n2.x += tx * overlap * 0.5;
                n2.y += ty * overlap * 0.5;

                let k = 0.5;
                let vx = n2.vx - n1.vx;
                let vy = n2.vy - n1.vy;
                let dp = vx * tx + vy * ty;

                if (dp < 0) {
                    let impulse = dp * (1 + k) * 0.5;
                    n1.vx += tx * impulse;
                    n1.vy += ty * impulse;
                    n2.vx -= tx * impulse;
                    n2.vy -= ty * impulse;
                }
            }
        }
    }

    // Inercia y bordes
    for (let n1 of nodos) {
        if (n1 !== dragging) {
            n1.x += n1.vx
            n1.y += n1.vy

            if (n1.x < 20) { n1.x = 20; n1.vx *= -1 }
            if (n1.x > canvas.width - 20) { n1.x = canvas.width - 20; n1.vx *= -1 }
            if (n1.y < 20) { n1.y = 20; n1.vy *= -1 }
            if (n1.y > canvas.height - 20) { n1.y = canvas.height - 20; n1.vy *= -1 }

            n1.vx *= 0.92
            n1.vy *= 0.92
        }
        n1.lx = n1.x
        n1.ly = n1.y
    }

    // Audio dinámico
    const vel = dragging ? Math.hypot(dragging.vx, dragging.vy) : 0
    let vol = Math.min(vel * 0.06, 1) * 0.08
    gain.gain.setTargetAtTime(vel > 0.1 ? vol : 0, audioCtx.currentTime, 0.04)
    let fr = 40 + vel * 6
    osc.frequency.setTargetAtTime(fr, audioCtx.currentTime, 0.04)

    if (window.grafo) {
        dibujarGrafo(window.grafo, window.esDirigido, window.esPonderado, 
                    window.coloresBipartito, window.mstAristas);
    }

    requestAnimationFrame(loop)
}

loop()

// --- BOTÓN EJECUTAR (FUSIONADO) ---
btnEjecutar.addEventListener('click', () => {
    reproducirSonido(soundClick);
    const op = document.getElementById("select-algoritmo").value;
    
    // 1. Determinar nodo inicial (Lógica HEAD)
    let startNode = window.nodoInicial;
    if (startNode === null || startNode === undefined) {
        startNode = 0;
    }

    // 2. Preparar variables y estados (Lógica fernando)
    let ok = false;
    let resultadoTexto = "$ Ejecutando algoritmo...";
    
    window.coloresBipartito = null;
    window.mstAristas = null;

    // 3. Ejecución de Algoritmos Específicos (MST - fernando)
    if (op === "8" && typeof ejecutarPrim === "function") {
        if (!window.esPonderado) { alert("Prim requiere un grafo ponderado."); return; }
        const result = ejecutarPrim(); 
        if (result && result.aristas.length > 0) {
            window.mstAristas = result.aristas;
            const total = result.costo; 
            resultadoTexto = `MST (Prim) encontrado. Peso Total: ${total}\n\nArista  | Peso\n----------------\n`;
            window.mstAristas.forEach(a => { resultadoTexto += `${a.u} <--> ${a.v} | ${a.peso}\n`; });
            ok = true;
        } else {
            resultadoTexto = "MST (Prim) ejecutado. No se encontró un MST (grafo desconectado o vacío).";
            ok = true;
        }
    } 
    else if (op === "9" && typeof ejecutarKruskal === "function") {
        if (!window.esPonderado) { alert("Kruskal requiere un grafo ponderado."); return; }
        const result = ejecutarKruskal(); 
        if (result && result.aristas.length > 0) {
            window.mstAristas = result.aristas;
            const total = result.costo;
            resultadoTexto = `MST (Kruskal) encontrado. Peso Total: ${total}\n\nArista  | Peso\n----------------\n`;
            window.mstAristas.forEach(a => { resultadoTexto += `${a.u} <--> ${a.v} | ${a.peso}\n`; });
            ok = true;
        } else {
            resultadoTexto = "MST (Kruskal) ejecutado. No se encontró un MST (grafo desconectado o vacío).";
            ok = true;
        }
    } 
    
    // 4. Ejecución de Otros Algoritmos (Combinado: usa startNode de HEAD)
    if (!ok) {
        window.mstAristas = null;
        if (op == "1" && typeof ejecutarBFS == "function") { ejecutarBFS(startNode); ok = true }
        if (op == "2" && typeof ejecutarDFS == "function") { ejecutarDFS(startNode); ok = true }
        if (op == "3" && typeof ejecutarDijkstra == "function") { ejecutarDijkstra(startNode); ok = true }
        
        // Algoritmos que no necesariamente requieren nodo inicial
        if (op == "4" && typeof ejecutarBipartito == "function") { ejecutarBipartito(); ok = true }
        if (op == "5" && typeof ejecutarMatching == "function") { ejecutarMatching(); ok = true }
        if (op == "6" && typeof ejecutarBellman == "function") { ejecutarBellman(startNode); ok = true }
        if (op == "7" && typeof ejecutarFloyd == "function") { ejecutarFloyd(); ok = true }
        if (op == "10" && typeof ejecutarEsArbol == "function") { ejecutarEsArbol(); ok = true }
        
        if (ok) resultadoTexto = "$ Algoritmo ejecutado: Ver salida en consola";
    }
    
    // 5. Finalizar (Dibujar y abrir consola)
    if (ok) {
        dibujarGrafo(window.grafo, window.esDirigido, window.esPonderado, 
                    window.coloresBipartito, window.mstAristas);
        
        salida.textContent = resultadoTexto; 
        openConsole();
    }
});

// --- EJEMPLOS PREDEFINIDOS ---
const ejemplos = [
    {
        titulo: "DFS/BFS Simple",
        desc: "Grafo conexo no dirigido básico",
        dir: false, pond: false,
        matriz: "0 1 1 0 0\n1 0 1 1 0\n1 1 0 0 1\n0 1 0 0 1\n0 0 1 1 0"
    },
    {
        titulo: "Dijkstra (Rutas)",
        desc: "Ponderado, pesos positivos",
        dir: true, pond: true,
        matriz: "0 10 5 0 0\n0 0 2 1 0\n0 3 0 9 2\n0 0 0 0 4\n7 0 0 6 0"
    },
    {
        titulo: "Bipartito",
        desc: "Se puede dividir en 2 conjuntos",
        dir: false, pond: false,
        matriz: "0 1 0 1\n1 0 1 0\n0 1 0 1\n1 0 1 0"
    },
    {
        titulo: "Matching",
        desc: "Grafo para emparejamientos",
        dir: false, pond: false,
        matriz: "0 1 1 0 0 0\n1 0 0 1 0 0\n1 0 0 1 0 0\n0 1 1 0 1 1\n0 0 0 1 0 1\n0 0 0 1 1 0"
    },
    {
        titulo: "Bellman-Ford",
        desc: "Pesos negativos (sin ciclos neg)",
        dir: true, pond: true,
        matriz: "0 4 0 5\n0 0 0 5\n0 -2 0 0\n0 0 3 0"
    },
    {
        titulo: "Floyd-Warshall",
        desc: "Denso, todos contra todos",
        dir: true, pond: true,
        matriz: "0 3 8 0\n0 0 0 1\n0 4 0 0\n2 0 -5 0"
    },
    {
        titulo: "Prim / Kruskal",
        desc: "MST, ponderado no dirigido",
        dir: false, pond: true,
        matriz: "0 2 0 6 0\n2 0 3 8 5\n0 3 0 0 7\n6 8 0 0 9\n0 5 7 9 0"
    },
    {
        titulo: "Árbol",
        desc: "Nodos N, Aristas N-1, Acíclico",
        dir: false, pond: false,
        matriz: "0 1 0 0 0\n1 0 1 1 0\n0 1 0 0 0\n0 1 0 0 1\n0 0 0 1 0"
    }
]

function renderExamples() {
    examplesGrid.innerHTML = ""
    ejemplos.forEach((ex, idx) => {
        const item = document.createElement("div")
        item.style.background = "#161b22"
        item.style.border = "1px solid #30363d"
        item.style.borderRadius = "6px"
        item.style.padding = "10px"
        item.style.cursor = "pointer"
        item.style.transition = "0.2s"
        item.style.display = "flex"
        item.style.flexDirection = "column"
        item.style.alignItems = "center"
        item.title = ex.desc

        const miniCanvas = document.createElement("canvas")
        miniCanvas.width = 120
        miniCanvas.height = 80
        miniCanvas.style.marginBottom = "8px"
        
        const label = document.createElement("span")
        label.textContent = ex.titulo
        label.style.color = "#c9d1d9"
        label.style.fontSize = "12px"
        label.style.fontWeight = "bold"
        label.style.textAlign = "center"

        item.appendChild(miniCanvas)
        item.appendChild(label)

        item.addEventListener("mouseenter", () => item.style.borderColor = "#58a6ff")
        item.addEventListener("mouseleave", () => item.style.borderColor = "#30363d")
        item.addEventListener("click", () => {
            txtMatriz.value = ex.matriz
            chkDirigido.checked = ex.dir
            chkPonderado.checked = ex.pond
            btnCargar.click()
            closeExamples()
        })

        examplesGrid.appendChild(item)
        
        setTimeout(() => dibujarMiniatura(miniCanvas, ex.matriz, ex.dir), 100)
    })
}

function dibujarMiniatura(cvs, strMatriz, dirigido) {
    const ctxM = cvs.getContext("2d")
    const m = strMatriz.split("\n").map(r => r.trim().split(/\s+/).map(Number))
    const n = m.length
    const cx = cvs.width / 2
    const cy = cvs.height / 2
    const r = 30
    
    ctxM.clearRect(0, 0, cvs.width, cvs.height)
    ctxM.strokeStyle = "rgba(139,148,158,0.5)"
    ctxM.lineWidth = 1

    const pos = []
    const step = (2 * Math.PI) / n
    for(let i=0; i<n; i++){
        pos.push({ x: cx + r * Math.cos(i*step - Math.PI/2), y: cy + r * Math.sin(i*step - Math.PI/2) })
    }

    for(let i=0; i<n; i++){
        for(let j=0; j<n; j++){
            if(m[i][j]!==0){
                if(!dirigido && i>j) continue
                ctxM.beginPath()
                ctxM.moveTo(pos[i].x, pos[i].y)
                ctxM.lineTo(pos[j].x, pos[j].y)
                ctxM.stroke()
            }
        }
    }

    for(let p of pos){
        ctxM.beginPath()
        ctxM.arc(p.x, p.y, 4, 0, Math.PI*2)
        ctxM.fillStyle = "#58a6ff"
        ctxM.fill()
    }
}

renderExamples()
