/**@returns {{aristas: Array<{u: number, v: number, peso: number}>, costo: number} | null}*/
function ejecutarKruskal() {
    if (!window.grafo) {
        return null;
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
        parent[i] = find(parent[i]); 
        return parent[i];
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

    let mstAristas = [];
    let costoTotal = 0;

    for (let arista of aristas) {
        if (union(arista.u, arista.v)) {
            mstAristas.push(arista);
            costoTotal += arista.peso;
            
            if (mstAristas.length === numVertices - 1 && numVertices > 0) break;
        }
    }

    document.getElementById("tiempo-analisis").textContent = "O(E log E)";
    document.getElementById("espacio-analisis").textContent = "O(V + E)";
    
    return {
        aristas: mstAristas,
        costo: costoTotal
    };
}