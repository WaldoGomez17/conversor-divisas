const monto = document.getElementById("monto");
const monedaOrigen = document.getElementById("monedaOrigen");
const monedaDestino = document.getElementById("monedaDestino");
const botonConvertir = document.getElementById("btnConvertir");
const resultado = document.getElementById("resultado");

const API_URL = "https://open.er-api.com/v6/latest/";

botonConvertir.addEventListener("click", convertirDivisa);

async function convertirDivisa() {
    const cantidad = parseFloat(monto.value);
    const origen = monedaOrigen.value;
    const destino = monedaDestino.value;

    resultado.classList.remove("mostrar");

    if (monto.value.trim() === "") {
    mostrarResultado("El campo de monto no puede estar vacío.");
    return;
}

if (isNaN(cantidad)) {
    mostrarResultado("Ingresa solo valores numéricos.");
    return;
}

if (cantidad <= 0) {
    mostrarResultado("El monto debe ser mayor a cero.");
    return;
}
    
    try {
        mostrarResultado("Calculando...");

        const respuesta = await fetch(API_URL + origen);
        const datos = await respuesta.json();

        if (datos.result !== "success") {
            mostrarResultado("No se pudieron obtener las tasas de cambio.");
            return;
        }

        const tasa = datos.rates[destino];
        const conversion = cantidad * tasa;

        mostrarResultado(
            `${cantidad.toFixed(2)} ${origen} = ${conversion.toFixed(2)} ${destino}`
        );

    } catch (error) {
        mostrarResultado("No fue posible obtener la información. Intenta nuevamente.");
    }
}

function mostrarResultado(mensaje) {
    resultado.classList.remove("mostrar");

    setTimeout(() => {
        resultado.textContent = mensaje;
        resultado.classList.add("mostrar");
    }, 100);
}
