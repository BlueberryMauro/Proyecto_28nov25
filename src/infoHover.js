// ---- CURSOR INFO ---- ///
const tooltip = document.createElement('div');
tooltip.className = 'graph-tooltip';
document.body.appendChild(tooltip);

const canvasEl = document.getElementById("lienzo");

function getNodeInfo(nodeIndex, matriz, esDirigido, esPonderado) {
    let info = `<strong>Nodo ${nodeIndex}</strong><br>`;
    const n = matriz.length;
    
    if (esDirigido) {
        let salidas = [];
        let entradas = [];

        for (let j = 0; j < n; j++) {
            if (matriz[nodeIndex][j] !== 0) {
                let txt = `${j}`;
                if (esPonderado) txt += ` <span class="badge-peso">W:${matriz[nodeIndex][j]}</span>`;
                salidas.push(txt);
            }
        }

        for (let i = 0; i < n; i++) {
            if (matriz[i][nodeIndex] !== 0) {
                let txt = `${i}`;
                if (esPonderado) txt += ` <span class="badge-peso">W:${matriz[i][nodeIndex]}</span>`;
                entradas.push(txt);
            }
        }

        info += `<span style="color:#58a6ff">🡕 Salidas:</span> ${salidas.length ? salidas.join(', ') : 'Ninguna'}<br>`;
        info += `<span style="color:#2ea043">🡔 Entradas:</span> ${entradas.length ? entradas.join(', ') : 'Ninguna'}`;
    
    } else {
        let conexiones = [];
        for (let j = 0; j < n; j++) {
            if (matriz[nodeIndex][j] !== 0) {
                let txt = `${j}`;
                if (esPonderado) txt += ` <span class="badge-peso">W:${matriz[nodeIndex][j]}</span>`;
                conexiones.push(txt);
            }
        }
        info += `<span>Conexiones:</span> ${conexiones.length ? conexiones.join(', ') : 'Aislado'}`;
    }

    return info;
}

canvasEl.addEventListener('mousemove', (e) => {
    if (!window.nodos || !window.grafo) return;

    const rect = canvasEl.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    let hoveredNode = null;

    for (let n of window.nodos) {
        let dist = Math.sqrt((mx - n.x) ** 2 + (my - n.y) ** 2);
        if (dist <= 20) {
            hoveredNode = n;
            break;
        }
    }

    if (hoveredNode) {
        tooltip.innerHTML = getNodeInfo(hoveredNode.id, window.grafo, window.esDirigido, window.esPonderado);
        tooltip.style.display = 'block';
        tooltip.style.left = (e.pageX + 15) + 'px';
        tooltip.style.top = (e.pageY + 15) + 'px';
    } else {
        tooltip.style.display = 'none';
    }
});
// ----------------------------- //