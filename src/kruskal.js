function ejecutarKruskal() {
    if (!window.grafo) {
        alert("Primero carga una matriz en el botón 'Cargar'.");
        return;
    }

    const grafo = window.grafo;
    const numVertices = grafo.length;
    const esDirigido = window.esDirigido || false;

    let aristas = [];
    for (let i = 0; i < numVertices; i++) {
        for (let j = 0; j < numVertices; j++) {
            if (!esDirigido && i > j) continue;

            if (grafo[i][j] !== 0) {
                aristas.push({
                    u: i,
                    v: j,
                    peso: grafo[i][j]
                });
            }
        }
    }

    aristas.sort((a, b) => a.peso - b.peso);

    let parent = new Array(numVertices);
    for (let i = 0; i < numVertices; i++) parent[i] = i;

    function find(i) {
        if (parent[i] === i) return i;
        return find(parent[i]);
    }

    function union(i, j) {
        const rootI = find(i);
        const rootJ = find(j);
        if (rootI !== rootJ) {
            parent[rootI] = rootJ;
            return true;
        }
        return false;
    }

    let mst = [];
    let costoTotal = 0;

    for (let arista of aristas) {
        if (union(arista.u, arista.v)) {
            mst.push(arista);
            costoTotal += arista.peso;
        }
    }

    let textoSalida = "Resultados Algoritmo de Kruskal (MST):\n\n";
    textoSalida += "Arista   | Peso\n";
    textoSalida += "----------------\n";

    for (let item of mst) {
        textoSalida += `${item.u} <--> ${item.v}  |  ${item.peso}\n`;
    }

    textoSalida += `\nCosto Total del MST: ${costoTotal}`;

    const resultadoDiv = document.getElementById("resultado");
    const tiempoDiv = document.getElementById("tiempo-analisis");
    const espacioDiv = document.getElementById("espacio-analisis");

    resultadoDiv.textContent = textoSalida;
    tiempoDiv.textContent = "O(E log E)";
    espacioDiv.textContent = "O(V + E)";

    console.log("Kruskal ejecutado. Aristas seleccionadas:", mst);
}