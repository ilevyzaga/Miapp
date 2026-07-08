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

<p><b>🛡️ Defensa</b></p>
<p>América: 0.9 goles recibidos</p>

<p><b>🤖 Predicción MatchIQ</b></p>
<p>América gana o empate</p>

<p>📈 Confianza: 80%</p>
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

<p><b>🛡️ Defensa</b></p>
<p>Tigres tiene mayor equilibrio defensivo.</p>

<p><b>🤖 Predicción MatchIQ</b></p>
<p>Tigres gana o empate</p>

<p>📈 Confianza: 75%</p>
`;

}


if(equipo === "cruzazul"){

tarjeta.innerHTML = `
<h2>🔵 Cruz Azul vs Monterrey</h2>

<p><b>📊 Forma reciente</b></p>
<p>Cruz Azul: 🟢 G 🟡 E 🟢 G 🔴 P 🟢 G</p>
<p>Monterrey: 🟢 G 🟢 G 🟡 E 🟡 E 🔴 P</p>

<p><b>⚽ Ataque</b></p>
<p>Partido equilibrado ofensivamente.</p>

<p><b>🛡️ Defensa</b></p>
<p>Puede ser un partido cerrado.</p>

<p><b>🤖 Predicción MatchIQ</b></p>
<p>Partido equilibrado</p>

<p>📈 Confianza: 65%</p>
`;

}


boton.parentElement.appendChild(tarjeta);

}





function mostrarSeccion(seccion){

let contenido = document.getElementById("contenido");


if(seccion === "inicio"){

contenido.innerHTML = `

<h2>Liga MX - Jornada 1</h2>

<div class="card">

<h2>⚽ Partidos de hoy</h2>

<p>Revisa los partidos y predicciones inteligentes.</p>

</div>

`;

}



if(seccion === "estadisticas"){

contenido.innerHTML = `

<h2>📊 Estadísticas Liga MX</h2>


<div class="card">

<h3>🏆 Tabla de posiciones</h3>

<p>1. 🦅 América ........ 15 pts</p>

<p>2. 🐯 Tigres ........ 13 pts</p>

<p>3. 🔵 Monterrey ..... 12 pts</p>

<p>4. 🐐 Chivas ........ 10 pts</p>

</div>


<div class="card">

<h3>⚽ Goles por partido</h3>

<p>🦅 América: 1.8 goles</p>

<p>🐯 Tigres: 1.6 goles</p>

<p>🔵 Monterrey: 1.5 goles</p>

<p>🐐 Chivas: 1.2 goles</p>

</div>


<div class="card">

<h3>🛡️ Mejor defensa</h3>

<p>🦅 América: 0.9 goles recibidos</p>

<p>🐯 Tigres: 1.0 goles recibidos</p>

</div>

`;

}



if(seccion === "predicciones"){

contenido.innerHTML = `

<h2>🤖 Predicciones</h2>

<div class="card">

<p>El modelo MatchIQ analiza datos históricos para generar predicciones.</p>

</div>

`;

}



if(seccion === "perfil"){

contenido.innerHTML = `

<h2>⚙️ Perfil</h2>

<div class="card">

<p>Usuario MatchIQ MX</p>

<p>Preferencias próximamente.</p>

</div>

`;

}


}
