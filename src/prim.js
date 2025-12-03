function ejecutarPrim() {
    if (!window.grafo) {
        alert("Primero carga una matriz en el botón 'Cargar'.");
        return;
    }

    if (window.nodoSeleccionado === null || window.nodoSeleccionado === undefined) {
        alert("Por favor, selecciona un nodo raíz para comenzar Prim.");
        return;
    }

    const grafo = window.grafo;
    const numVertices = grafo.length;
    const nodoInicio = window.nodoSeleccionado;
    
    let parent = new Array(numVertices).fill(-1);
    let key = new Array(numVertices).fill(Infinity);
    let mstSet = new Array(numVertices).fill(false);

    key[nodoInicio] = 0;
    parent[nodoInicio] = -1;

    for (let count = 0; count < numVertices - 1; count++) {
        let u = -1;
        let min = Infinity;

        for (let v = 0; v < numVertices; v++) {
            if (mstSet[v] === false && key[v] < min) {
                min = key[v];
                u = v;
            }
        }

        if (u === -1) break;

        mstSet[u] = true;

        for (let v = 0; v < numVertices; v++) {
            if (grafo[u][v] !== 0 && mstSet[v] === false && grafo[u][v] < key[v]) {
                parent[v] = u;
                key[v] = grafo[u][v];
            }
        }
    }

    let textoSalida = `Resultados Algoritmo de Prim (Raíz: Nodo ${nodoInicio}):\n\n`;
    let costoTotal = 0;

    textoSalida += "Arista   | Peso\n";
    textoSalida += "----------------\n";

    for (let i = 0; i < numVertices; i++) {
        if (i !== nodoInicio && parent[i] !== -1) {
            const peso = grafo[parent[i]][i];
            textoSalida += `${parent[i]} <--> ${i}  |  ${peso}\n`;
            costoTotal += peso;
        }
    }

    textoSalida += `\nCosto Total del MST: ${costoTotal}`;

    const resultadoDiv = document.getElementById("resultado");
    const tiempoDiv = document.getElementById("tiempo-analisis");
    const espacioDiv = document.getElementById("espacio-analisis");

    resultadoDiv.textContent = textoSalida;
    tiempoDiv.textContent = "O(V²)";
    espacioDiv.textContent = "O(V)";

    console.log("Prim ejecutado. Arreglo de padres:", parent);
}