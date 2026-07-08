function cargarInicio(){

let contenido = document.getElementById("contenido");

contenido.innerHTML = `

<h2>Liga MX - Jornada 1</h2>


<div class="card">

<div class="teams">
<span>🦅 América</span>
<span>VS</span>
<span>🔴 Toluca</span>
</div>

<p>📍 Estadio Ciudad de los Deportes</p>
<p>🕗 20:00</p>

<div class="prediction">
Probabilidad de victoria
</div>

<div class="bar">
<div class="america"></div>
</div>

<p>América 58% - Empate 22% - Toluca 20%</p>

<button onclick="mostrarAnalisis(this, 'america')">
Ver análisis
</button>

</div>



<div class="card">

<div class="teams">
<span>🐯 Tigres</span>
<span>VS</span>
<span>🐐 Chivas</span>
</div>

<p>📍 Estadio Universitario</p>
<p>🕘 21:00</p>

<div class="prediction">
Probabilidad de victoria
</div>

<div class="bar">
<div class="tigres"></div>
</div>

<p>Tigres 51% - Empate 26% - Chivas 23%</p>

<button onclick="mostrarAnalisis(this, 'tigres')">
Ver análisis
</button>

</div>



<div class="card">

<div class="teams">
<span>🔵 Cruz Azul</span>
<span>VS</span>
<span>🔵 Monterrey</span>
</div>

<p>📍 Estadio Ciudad de los Deportes</p>
<p>🕖 19:00</p>

<div class="prediction">
Probabilidad de victoria
</div>

<div class="bar">
<div class="cruzazul"></div>
</div>

<p>Cruz Azul 35% - Empate 30% - Monterrey 35%</p>

<button onclick="mostrarAnalisis(this, 'cruzazul')">
Ver análisis
</button>

</div>

`;

}




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

cargarInicio();

}



if(seccion === "estadisticas"){

contenido.innerHTML = `


<h2>📊 Estadísticas Liga MX</h2>



<div class="card">

<h3>🏆 Tabla de posiciones</h3>

<p># | Equipo | PJ | GF | GC | Pts</p>

<p>1 🦅 América | 5 | 10 | 4 | 15</p>

<p>2 🐯 Tigres | 5 | 8 | 3 | 13</p>

<p>3 🔵 Monterrey | 5 | 9 | 5 | 12</p>

<p>4 🐐 Chivas | 5 | 6 | 5 | 10</p>

</div>




<div class="card">

<h3>⚽ Líderes ofensivos</h3>

<p>🥇 América - 10 goles</p>

<p>🥈 Monterrey - 9 goles</p>

<p>🥉 Tigres - 8 goles</p>

</div>




<div class="card">

<h3>🛡️ Mejor defensa</h3>

<p>🦅 América - 4 goles recibidos</p>

<p>🐯 Tigres - 3 goles recibidos</p>

</div>




<div class="card">

<h3>📈 Forma reciente</h3>

<p>🦅 América: G G E G P</p>

<p>🐯 Tigres: G G E G E</p>

<p>🔵 Monterrey: G E G G P</p>

<p>🐐 Chivas: E P G E P</p>

</div>


`;

}




if(seccion === "predicciones"){

contenido.innerHTML = `

<h2>🤖 Predicciones</h2>

<div class="card">

<p>MatchIQ analiza datos históricos para generar predicciones inteligentes.</p>

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
