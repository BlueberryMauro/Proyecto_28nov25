function ejecutarDFS() {
    if (!window.grafo) {
        alert("Primero carga una matriz en el botón 'Cargar'.");
        return;
    }

    const grafo = window.grafo;
    const numVertices = grafo.length;
    const nodoInicio = 0;

    let visitados = new Array(numVertices).fill(false);
    let pila = [];
    let recorrido = [];

    pila.push(nodoInicio);

    while (pila.length > 0) {
        let nodoActual = pila.pop();

        if (!visitados[nodoActual]) {
            visitados[nodoActual] = true;
            recorrido.push(nodoActual);
            for (let i = numVertices - 1; i >= 0; i--) {
                if (grafo[nodoActual][i] !== 0 && !visitados[i]) {
                    pila.push(i);
                }
            }
        }
    }

    const resultadoDiv = document.getElementById("resultado");
    const tiempoDiv = document.getElementById("tiempo-analisis");
    const espacioDiv = document.getElementById("espacio-analisis");

    resultadoDiv.textContent = "Recorrido DFS (desde 0): " + recorrido.join(" -> ");
    
    tiempoDiv.textContent = "O(V²)"; 
    espacioDiv.textContent = "O(V)";

    console.log("DFS ejecutado:", recorrido);
}