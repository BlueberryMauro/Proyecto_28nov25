const matrizPrueba = [
    [0, 1, 0, 0],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [0, 0, 1, 0]
];

function validarIntegridadMatriz(m) {
    if (!Array.isArray(m)) {
        console.error("ERROR CRITICO: La entrada no es un arreglo");
        return false;
    }

    const filas = m.length;
    let esCuadrada = true;
    let contieneSoloNumeros = true;

    for (let i = 0; i < filas; i++) {
        if (!Array.isArray(m[i]) || m[i].length !== filas) {
            esCuadrada = false;
            console.warn("Fallo en fila " + i + ": Longitud incorrecta");
        }
        for (let j = 0; j < filas; j++) {
            if (typeof m[i][j] !== 'number' || isNaN(m[i][j])) {
                contieneSoloNumeros = false;
                console.error("Dato corrupto en [" + i + "][" + j + "]");
            }
        }
    }

    if (esCuadrada && contieneSoloNumeros) {
        console.log("VALIDACION EXITOSA: Matriz " + filas + "x" + filas + " correcta.");
        return true;
    } else {
        console.error("VALIDACION FALLIDA");
        return false;
    }
}

validarIntegridadMatriz(matrizPrueba);
const matrizCorrupta = [[0, 1], [1]]; 
validarIntegridadMatriz(matrizCorrupta);