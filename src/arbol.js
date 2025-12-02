function ejecutarEsArbol() {
    let matriz;
    if (window.grafo) {
        matriz = window.grafo;
    } else {
        const texto = document.getElementById("matriz_input").value.trim();
        if (!texto) { alert("Carga el grafo primero"); return; }
        matriz = texto.split("\n").map(fila =>
            fila.trim().split(/\s+/).map(Number)
        );
    }

    const n = matriz.length;
    if (n === 0) {
        alert("El grafo está vacío, no es un árbol válido.");
        return;
    }

    const visitado = Array(n).fill(false);
    let nodosVisitados = 0;
    
    function dfs(u, padre) {
        visitado[u] = true;
        nodosVisitados++;

        for (let v = 0; v < n; v++) {
            if (matriz[u][v] !== 0) {
                if (v !== padre) {
                    if (visitado[v]) {
                        return false; 
                    } else if (!dfs(v, u)) {
                        return false; 
                    }
                }
            }
        }
        return true;
    }

    const sinCiclos = dfs(0, -1); 
    const esConexo = (nodosVisitados === n);

    let esArbol = false;
    
    if (sinCiclos && esConexo) {
        esArbol = true;
    }

    const salida = document.getElementById("resultado");
    const resultadoTexto = esArbol 
        ? "Resultado: El grafo SÍ es un ÁRBOL (Conexo y sin ciclos)."
        : `Resultado: El grafo NO es un ÁRBOL.\n\nDetalles:\n- Es Conexo: ${esConexo ? 'Sí' : 'No'}\n- Sin Ciclos: ${sinCiclos ? 'Sí' : 'No'}`;
    
    salida.textContent = resultadoTexto;
    alert(esArbol ? "El grafo SÍ es un ÁRBOL" : "El grafo NO es un ÁRBOL");
}