window.ejecutarMatching = function() {
    const input = document.getElementById('matriz_input').value.trim();
    if (!input) {
        alert("Por favor ingresa una matriz de adyacencia.");
        return;
    }

    const matriz = input.split('\n').map(row => 
        row.trim().split(/\s+/).map(Number)
    );

    const numVertices = matriz.length;
    
    if (matriz.some(row => row.length !== numVertices)) {
        alert("La matriz debe ser cuadrada.");
        return;
    }

    const resMaximal = calcEmparejamientoMaximal(matriz, numVertices);
    const resMaximo = calcEmparejamientoMaximo(matriz, numVertices);

    const output = document.getElementById('resultado');
    output.textContent = 
    `=== Emparejamiento Maximal (Greedy) ===\n` +
    `Cardinalidad: ${resMaximal.length}\n` +
    `Pares: ${JSON.stringify(resMaximal)}\n\n` +
    `=== Emparejamiento Máximo (Maximum) ===\n` +
    `Cardinalidad: ${resMaximo.length}\n` +
    `Pares: ${JSON.stringify(resMaximo)}`;

    const lblTiempo = document.getElementById('tiempo-analisis');
    const lblEspacio = document.getElementById('espacio-analisis');
    
    if (lblTiempo) lblTiempo.innerText = "Maximal: O(E) | Máximo: O(V*E)";
    if (lblEspacio) lblEspacio.innerText = "O(V)";

    const outputSecundario = document.getElementById('resultado-matching');
    if(outputSecundario) outputSecundario.textContent = "";
};

function calcEmparejamientoMaximal(matriz, n) {
    let visitados = new Array(n).fill(false);
    let matching = [];

    for (let u = 0; u < n; u++) {
        for (let v = u + 1; v < n; v++) {
            if (matriz[u][v] !== 0) { 
                if (!visitados[u] && !visitados[v]) {
                    matching.push([u, v]);
                    visitados[u] = true;
                    visitados[v] = true;
                }
            }
        }
    }
    return matching;
}

function calcEmparejamientoMaximo(matriz, n) {
    let matchR = new Array(n).fill(-1);
    let result = 0;

    function bpm(u, visitados, matchR, matrix, n) {
        for (let v = 0; v < n; v++) {
            if (matrix[u][v] !== 0 && !visitados[v]) {
                visitados[v] = true; 
                if (matchR[v] < 0 || bpm(matchR[v], visitados, matchR, matrix, n)) {
                    matchR[v] = u;
                    return true;
                }
            }
        }
        return false;
    }
    
    for (let u = 0; u < n; u++) {
        let visitados = new Array(n).fill(false);
        if (bpm(u, visitados, matchR, matriz, n)) {
            result++;
        }
    }

    let paresUnicos = new Set();
    let resultadoFinal = [];

    for (let v = 0; v < n; v++) {
        if (matchR[v] !== -1) {
            let u = matchR[v];
            let min = Math.min(u, v);
            let max = Math.max(u, v);
            let clave = `${min}-${max}`;
            
            if (!paresUnicos.has(clave)) {
                paresUnicos.add(clave);
                resultadoFinal.push([min, max]);
            }
        }
    }

    return resultadoFinal;
}