function mostrarAnalisis(boton, equipo){

// Si ya existe un análisis debajo, lo elimina
let anterior = boton.parentElement.querySelector(".analisis");

if(anterior){
    anterior.remove();
    return;
}


let tarjeta = document.createElement("div");

tarjeta.className = "analisis";


if(equipo === "america"){

tarjeta.innerHTML = `
<h2>🦅 América vs Toluca</h2>

<p>📊 Forma reciente:</p>
<p>América: G - G - E - G - P</p>
<p>Toluca: G - E - G - P - G</p>

<p>⚽ Ataque:</p>
<p>América genera más ocasiones de gol.</p>

<p>🛡️ Defensa:</p>
<p>América recibe menos goles por partido.</p>

<p>🤖 Predicción MatchIQ:</p>
<p>América gana o empate</p>

<p>📈 Confianza: 80%</p>
`;

}


if(equipo === "tigres"){

tarjeta.innerHTML = `
<h2>🐯 Tigres vs Chivas</h2>

<p>📊 Forma reciente:</p>
<p>Tigres: G - G - E - G - E</p>
<p>Chivas: E - P - G - E - P</p>

<p>⚽ Ataque:</p>
<p>Tigres tiene mayor generación ofensiva.</p>

<p>🛡️ Defensa:</p>
<p>Tigres muestra más equilibrio.</p>

<p>🤖 Predicción MatchIQ:</p>
<p>Tigres gana o empate</p>

<p>📈 Confianza: 75%</p>
`;

}


if(equipo === "cruzazul"){

tarjeta.innerHTML = `
<h2>🔵 Cruz Azul vs Monterrey</h2>

<p>📊 Forma reciente:</p>
<p>Cruz Azul: G - E - G - P - G</p>
<p>Monterrey: G - G - E - E - P</p>

<p>⚽ Ataque:</p>
<p>Ambos equipos tienen jugadores ofensivos importantes.</p>

<p>🛡️ Defensa:</p>
<p>Partido con posible equilibrio.</p>

<p>🤖 Predicción MatchIQ:</p>
<p>Partido cerrado</p>

<p>📈 Confianza: 65%</p>
`;

}


// Agrega el análisis debajo del partido seleccionado
boton.parentElement.appendChild(tarjeta);

}
