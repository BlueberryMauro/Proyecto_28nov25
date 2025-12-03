function ejecutarDijkstra() {
    if (!window.grafo) {
        alert("Primero carga una matriz en el botón 'Cargar'.");
        return;
    }

    if (window.nodoSeleccionado === null || window.nodoSeleccionado === undefined) {
        alert("Por favor, selecciona un nodo de origen haciendo click sobre él.");
        return;
    }

    const grafo = window.grafo;
    const numVertices = grafo.length;
    const nodoInicio = window.nodoSeleccionado;

    let distancias = new Array(numVertices).fill(Infinity);
    let visitados = new Array(numVertices).fill(false);
    let previo = new Array(numVertices).fill(null); 

    distancias[nodoInicio] = 0;

    for (let i = 0; i < numVertices; i++) {
        let u = -1;
        let minDist = Infinity;

        for (let j = 0; j < numVertices; j++) {
            if (!visitados[j] && distancias[j] < minDist) {
                minDist = distancias[j];
                u = j;
            }
        }

        if (u === -1 || distancias[u] === Infinity) break;

        visitados[u] = true;

        for (let v = 0; v < numVertices; v++) {
            if (grafo[u][v] !== 0 && !visitados[v]) {
                const peso = grafo[u][v];
                if (distancias[u] + peso < distancias[v]) {
                    distancias[v] = distancias[u] + peso;
                    previo[v] = u; 
                }
            }
        }
    }
    
    let textoSalida = `Resultados Dijkstra (desde Nodo ${nodoInicio}):\n\n`;

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
    
    tiempoDiv.textContent = "O(V²)"; 
    espacioDiv.textContent = "O(V)";

    console.log("Dijkstra ejecutado desde:", nodoInicio);
}