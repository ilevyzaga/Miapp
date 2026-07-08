function mostrarAnalisis(equipo){

let analisis = "";

if(equipo === "america"){
analisis = `
<div class="card">
<h2>🦅 América vs Toluca</h2>

<p>📊 Forma reciente: América llega con buen rendimiento ofensivo.</p>

<p>⚽ Goles promedio: 1.8 por partido.</p>

<p>🏟️ Localía: Ventaja para América.</p>

<p>🤖 Predicción MatchIQ: América gana o empate.</p>

</div>
`;
}


if(equipo === "tigres"){
analisis = `
<div class="card">
<h2>🐯 Tigres vs Chivas</h2>

<p>📊 Forma reciente: Tigres muestra mayor estabilidad defensiva.</p>

<p>⚽ Goles promedio: 1.5 por partido.</p>

<p>🏟️ Localía: Factor importante para Tigres.</p>

<p>🤖 Predicción MatchIQ: Tigres gana o empate.</p>

</div>
`;
}


if(equipo === "cruzazul"){
analisis = `
<div class="card">
<h2>🔵 Cruz Azul vs Monterrey</h2>

<p>📊 Forma reciente: Partido más equilibrado de la jornada.</p>

<p>⚽ Goles promedio: Ambos equipos generan ocasiones.</p>

<p>🏟️ Localía: Ligera ventaja para Cruz Azul.</p>

<p>🤖 Predicción MatchIQ: Partido cerrado.</p>

</div>
`;
}


document.querySelector("main").innerHTML += analisis;

}
