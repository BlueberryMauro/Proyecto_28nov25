function ejecutarBellman() {
    if (!window.grafo) {
        alert("Primero carga una matriz en el botón 'Cargar'.");
        return;
    }

    const grafo = window.grafo;
    const numVertices = grafo.length;
    const nodoInicio = 0;

    let distancias = new Array(numVertices).fill(Infinity);
    let previo = new Array(numVertices).fill(null);

    distancias[nodoInicio] = 0;

    for (let i = 0; i < numVertices - 1; i++) {
        for (let u = 0; u < numVertices; u++) {
            for (let v = 0; v < numVertices; v++) {
                if (grafo[u][v] !== 0) {
                    const peso = grafo[u][v];
                    if (distancias[u] !== Infinity && distancias[u] + peso < distancias[v]) {
                        distancias[v] = distancias[u] + peso;
                        previo[v] = u;
                    }
                }
            }
        }
    }

    for (let u = 0; u < numVertices; u++) {
        for (let v = 0; v < numVertices; v++) {
            if (grafo[u][v] !== 0) {
                const peso = grafo[u][v];
                if (distancias[u] !== Infinity && distancias[u] + peso < distancias[v]) {
                    alert("El grafo contiene un ciclo de peso negativo.");
                    return;
                }
            }
        }
    }

    let textoSalida = `Resultados Bellman-Ford (desde Nodo ${nodoInicio}):\n\n`;

    for (let i = 0; i < numVertices; i++) {
        const d = distancias[i] === Infinity ? "Inf" : distancias[i];
        let caminoStr = "";

        if (distancias[i] === Infinity) {
            caminoStr = "No hay camino";
        } else {
            let camino = [];
            let actual = i;
            while (actual !== null) {
                camino.unshift(actual);
                actual = previo[actual];
            }
            caminoStr = camino.join(" -> ");
        }

        textoSalida += `Nodo ${i}: Costo ${d} | Ruta: [ ${caminoStr} ]\n`;
    }

    const resultadoDiv = document.getElementById("resultado");
    const tiempoDiv = document.getElementById("tiempo-analisis");
    const espacioDiv = document.getElementById("espacio-analisis");

    resultadoDiv.textContent = textoSalida;
    tiempoDiv.textContent = "O(V * E)";
    espacioDiv.textContent = "O(V)";
}