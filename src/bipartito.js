function ejecutarBipartito() {
    let matriz;
    if(window.grafo) {
        matriz = window.grafo;
    } else {
        const texto = document.getElementById("matriz_input").value.trim();
        if(!texto) { alert("Carga el grafo primero"); return; }
        matriz = texto.split("\n").map(fila =>
            fila.trim().split(/\s+/).map(Number)
        );
    }

    const n = matriz.length;
    const color = Array(n).fill(-1);

    function bfs(inicio) {
        const cola = [inicio];
        color[inicio] = 0;
        while (cola.length > 0) {
            let u = cola.shift();
            for (let v = 0; v < n; v++) {
                if (matriz[u][v] !== 0) {  
                    if (color[v] === -1) {
                        color[v] = 1 - color[u];
                        cola.push(v);
                    } else if (color[v] === color[u]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    let esBipartito = true;

    for (let i = 0; i < n; i++) {
        if (color[i] === -1) {
            if (!bfs(i)) {
                esBipartito = false;
                break;
            }
        }
    }

    const salida = document.getElementById("resultado");

    if (esBipartito) {
        window.coloresBipartito = color;
        
        salida.textContent = `Resultado: El grafo SÍ es bipartito.\n\nGrupos detectados:\n`;
        let g0 = [], g1 = [];
        color.forEach((c, i) => c === 0 ? g0.push(i) : g1.push(i));
        salida.textContent += `Grupo A (Rojo): [${g0.join(", ")}]\n`;
        salida.textContent += `Grupo B (Turquesa): [${g1.join(", ")}]`;
        
        alert("El grafo SÍ es bipartito. Se han coloreado los nodos.");
    } else {
        window.coloresBipartito = null;
        salida.textContent = "Resultado: El grafo NO es bipartito.";
        alert("El grafo NO es bipartito");
    }
}