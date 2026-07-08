function mostrarAnalisis(equipo){

let analisis = "";

if(equipo === "america"){
analisis = `
<div class="card">
<h2>🦅 América vs Toluca</h2>

<p>📊 Forma reciente: América llega con buen rendimiento ofensivo.</p>

<p>⚽ Ataque: Alto volumen de llegadas y posesión.</p>

<p>🛡️ Defensa: Busca mantener control del partido.</p>

<p>🏟️ Localía: Ventaja por jugar en casa.</p>

<p>🤖 Predicción MatchIQ: América 58% - Empate 22% - Toluca 20%</p>

</div>
`;
}


if(equipo === "tigres"){
analisis = `
<div class="card">
<h2>🐯 Tigres vs Chivas</h2>

<p>📊 Forma reciente: Tigres muestra mayor estabilidad.</p>

<p>⚽ Ataque: Buen juego por bandas y llegada al área.</p>

<p>🛡️ Defensa: Una de sus principales fortalezas.</p>

<p>🏟️ Localía: Factor importante para Tigres.</p>

<p>🤖 Predicción MatchIQ: Tigres 51% - Empate 26% - Chivas 23%</p>

</div>
`;
}


if(equipo === "cruzazul"){
analisis = `
<div class="card">
<h2>🔵 Cruz Azul vs Monterrey</h2>

<p>📊 Forma reciente: Partido más equilibrado de la jornada.</p>

<p>⚽ Ataque: Ambos equipos tienen jugadores desequilibrantes.</p>

<p>🛡️ Defensa: Puede ser un partido cerrado.</p>

<p>🏟️ Localía: Ligera ventaja para Cruz Azul.</p>

<p>🤖 Predicción MatchIQ: Cruz Azul 35% - Empate 30% - Monterrey 35%</p>

</div>
`;
}


document.querySelector("main").innerHTML += analisis;

}
