function mostrarAnalisis(boton, equipo){

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

<p><b>📊 Forma reciente</b></p>
<p>América: 🟢 G 🟢 G 🟡 E 🟢 G 🔴 P</p>
<p>Toluca: 🟢 G 🟡 E 🟢 G 🔴 P 🟢 G</p>

<p><b>⚽ Ataque</b></p>
<p>América: 1.8 goles por partido</p>
<p>Toluca: 1.4 goles por partido</p>

<p><b>🛡️ Defensa</b></p>
<p>América: 0.9 goles recibidos</p>
<p>Toluca: 1.2 goles recibidos</p>

<p><b>🏟️ Factor clave</b></p>
<p>La localía del América puede marcar diferencia.</p>

<p><b>🤖 Predicción MatchIQ</b></p>
<p>América gana o empate</p>

<div class="confidence">
<div class="confidence-bar america-confidence"></div>
</div>

<p>Confianza: 80%</p>

`;

}


if(equipo === "tigres"){

tarjeta.innerHTML = `

<h2>🐯 Tigres vs Chivas</h2>

<p><b>📊 Forma reciente</b></p>
<p>Tigres: 🟢 G 🟢 G 🟡 E 🟢 G 🟡 E</p>
<p>Chivas: 🟡 E 🔴 P 🟢 G 🟡 E 🔴 P</p>

<p><b>⚽ Ataque</b></p>
<p>Tigres: 1.6 goles por partido</p>
<p>Chivas: 1.2 goles por partido</p>

<p><b>🛡️ Defensa</b></p>
<p>Tigres muestra mayor equilibrio defensivo.</p>

<p><b>🏟️ Factor clave</b></p>
<p>El estadio Universitario favorece a Tigres.</p>

<p><b>🤖 Predicción MatchIQ</b></p>
<p>Tigres gana o empate</p>

<div class="confidence">
<div class="confidence-bar tigres-confidence"></div>
</div>

<p>Confianza: 75%</p>

`;

}


if(equipo === "cruzazul"){

tarjeta.innerHTML = `

<h2>🔵 Cruz Azul vs Monterrey</h2>

<p><b>📊 Forma reciente</b></p>
<p>Cruz Azul: 🟢 G 🟡 E 🟢 G 🔴 P 🟢 G</p>
<p>Monterrey: 🟢 G 🟢 G 🟡 E 🟡 E 🔴 P</p>

<p><b>⚽ Ataque</b></p>
<p>Partido con jugadores ofensivos importantes.</p>

<p><b>🛡️ Defensa</b></p>
<p>Ambos equipos pueden cerrar espacios.</p>

<p><b>🏟️ Factor clave</b></p>
<p>Partido muy equilibrado.</p>

<p><b>🤖 Predicción MatchIQ</b></p>
<p>Partido cerrado</p>

<div class="confidence">
<div class="confidence-bar cruzazul-confidence"></div>
</div>

<p>Confianza: 65%</p>

`;

}


boton.parentElement.appendChild(tarjeta);

}
