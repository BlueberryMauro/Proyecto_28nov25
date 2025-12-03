const contenidoArchivoCorrecto = `
// Grafo de prueba
0 10 0
10 0 5
0 5 0
`;

const contenidoArchivoError = `
0 10 0
10 X 5
0 5 0
`;

function parsearContenido(texto) {
    console.log("Intentando parsear bloque de datos...");
    const lineas = texto.split('\n');
    let matriz = [];
    let errorDetectado = false;

    lineas.forEach((linea, index) => {
        const l = linea.trim();
        if (l === "" || l.startsWith("//")) return;

        const partes = l.split(/\s+/);
        const filaNumerica = partes.map(num => {
            const valor = Number(num);
            if (isNaN(valor)) {
                console.error("Error de parseo en linea " + index + ": '" + num + "' no es numero.");
                errorDetectado = true;
            }
            return valor;
        });
        matriz.push(filaNumerica);
    });

    if (errorDetectado) return null;
    return matriz;
}

const resultado1 = parsearContenido(contenidoArchivoCorrecto);
console.log("Prueba 1 (Correcta):", resultado1 ? "OK" : "FALLO");

const resultado2 = parsearContenido(contenidoArchivoError);
console.log("Prueba 2 (Con Error):", resultado2 === null ? "OK (Error detectado correctamente)" : "FALLO (Dejó pasar el error)");