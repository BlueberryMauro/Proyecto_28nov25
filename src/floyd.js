function ejecutarFloyd() {
    if (!window.grafo) {
        alert("Primero carga una matriz en el botón 'Cargar'.");
        return;
    }

    const grafo = window.grafo;
    const n = grafo.length;
    let dist = Array.from({ length: n }, () => Array(n).fill(Infinity));

    for (let i = 0; i < n; i++) {
        dist[i][i] = 0;
        for (let j = 0; j < n; j++) {
            if (grafo[i][j] !== 0) {
                dist[i][j] = grafo[i][j];
            }
        }
    }

    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] !== Infinity && dist[k][j] !== Infinity) {
                    if (dist[i][j] > dist[i][k] + dist[k][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }
    }

    let textoSalida = "Matriz de Distancias Mínimas (Floyd-Warshall):\n\n";
    
    textoSalida += "      ";
    for(let i=0; i<n; i++) textoSalida += `[${i}]  `;
    textoSalida += "\n";

    for (let i = 0; i < n; i++) {
        textoSalida += `[${i}]   `;
        for (let j = 0; j < n; j++) {
            const val = dist[i][j] === Infinity ? "Inf" : dist[i][j];
            textoSalida += `${val}`.padEnd(5, " ");
        }
        textoSalida += "\n";
    }

    const resultadoDiv = document.getElementById("resultado");
    const tiempoDiv = document.getElementById("tiempo-analisis");
    const espacioDiv = document.getElementById("espacio-analisis");

    resultadoDiv.textContent = textoSalida;
    tiempoDiv.textContent = "O(V^3)";
    espacioDiv.textContent = "O(V^2)";
}