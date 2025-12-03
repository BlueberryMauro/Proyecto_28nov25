/**@returns {{aristas: Array<{u: number, v: number, peso: number}>, costo: number} | null}*/

function ejecutarPrim() {
    if (!window.grafo) {
        return null;
    }

    const grafo = window.grafo;
    const numVertices = grafo.length;
    
    let parent = new Array(numVertices).fill(-1);
    let key = new Array(numVertices).fill(Infinity);
    let mstSet = new Array(numVertices).fill(false);
    
    key[0] = 0;
    parent[0] = -1;
    
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
            const peso = grafo[u][v];
            
            if (peso !== 0 && mstSet[v] === false && peso < key[v]) {
                parent[v] = u;
                key[v] = peso;
            }
        }
    }

    let mstAristas = [];
    let costoTotal = 0;

    for (let i = 1; i < numVertices; i++) {
        if (parent[i] !== -1) {
            const u = parent[i];
            const v = i;
            const peso = grafo[u][v];
            
            mstAristas.push({
                u: u, 
                v: v, 
                peso: peso
            });
            costoTotal += peso;
        }
    }

    document.getElementById("tiempo-analisis").textContent = "O(V²)";
    document.getElementById("espacio-analisis").textContent = "O(V)";
    
    return {
        aristas: mstAristas,
        costo: costoTotal
    };
}