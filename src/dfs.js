function ejecutarDFS() {
    if (!window.grafo) {
        alert("Primero carga una matriz en el botón 'Cargar'.");
        return;
    }

    if (window.nodoSeleccionado === null || window.nodoSeleccionado === undefined) {
        alert("Por favor, selecciona un nodo de inicio haciendo click sobre él en el grafo.");
        return;
    }

    const grafo = window.grafo;
    const numVertices = grafo.length;
    const nodoInicio = window.nodoSeleccionado;

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

    resultadoDiv.textContent = `Recorrido DFS (iniciando en Nodo ${nodoInicio}): ` + recorrido.join(" -> ");
    
    tiempoDiv.textContent = "O(V²)"; 
    espacioDiv.textContent = "O(V)";

    console.log("DFS ejecutado:", recorrido);
}