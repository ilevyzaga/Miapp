function cargarInicio(){

let contenido = document.getElementById("contenido");

contenido.innerHTML = `

<h2>Liga MX - Jornada 1</h2>

<div class="card partido">

<div class="teams">

<div class="team">
<img src="images/america.png">
<span>América</span>
</div>

<span class="vs">VS</span>

<div class="team">
<img src="images/toluca.png">
<span>Toluca</span>
</div>

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

<button onclick="mostrarAnalisis(this,'america')">
Ver análisis
</button>

</div>



<div class="card partido">

<div class="teams">

<div class="team">
<img src="images/tigres.png">
<span>Tigres</span>
</div>

<span class="vs">VS</span>

<div class="team">
<img src="images/chivas.png">
<span>Chivas</span>
</div>

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

<button onclick="mostrarAnalisis(this,'tigres')">
Ver análisis
</button>

</div>



<div class="card partido">

<div class="teams">

<div class="team">
<img src="images/cruzazul.png">
<span>Cruz Azul</span>
</div>

<span class="vs">VS</span>

<div class="team">
<img src="images/monterrey.png">
<span>Monterrey</span>
</div>

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

<button onclick="mostrarAnalisis(this,'cruzazul')">
Ver análisis
</button>

</div>

`;

}



function mostrarAnalisis(boton,equipo){

let analisis = document.createElement("div");

analisis.className = "analisis";


if(equipo === "america"){

analisis.innerHTML = `
<h3>🦅 América vs Toluca</h3>
<p>📊 Análisis MatchIQ</p>
<p>América llega con mejor rendimiento ofensivo.</p>
<p>🤖 Predicción: América gana o empate.</p>
<p>Confianza: 80%</p>
`;

}


if(equipo === "tigres"){

analisis.innerHTML = `
<h3>🐯 Tigres vs Chivas</h3>
<p>📊 Análisis MatchIQ</p>
<p>Tigres tiene ventaja jugando como local.</p>
<p>🤖 Predicción: Tigres gana o empate.</p>
<p>Confianza: 75%</p>
`;

}


if(equipo === "cruzazul"){

analisis.innerHTML = `
<h3>🔵 Cruz Azul vs Monterrey</h3>
<p>📊 Análisis MatchIQ</p>
<p>Partido muy equilibrado.</p>
<p>🤖 Predicción: Marcador cerrado.</p>
<p>Confianza: 65%</p>
`;

}


boton.parentElement.appendChild(analisis);

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
<h3>Tabla de posiciones</h3>
<p>1 🦅 América - 15 pts</p>
<p>2 🐯 Tigres - 13 pts</p>
<p>3 🔵 Monterrey - 12 pts</p>
<p>4 🐐 Chivas - 10 pts</p>
</div>

`;

}


if(seccion === "predicciones"){

contenido.innerHTML = `

<h2>🤖 Predicciones MatchIQ</h2>

<div class="card">
<h3>🦅 América vs Toluca</h3>
<p>Confianza: 80%</p>
<p>Predicción: América gana o empate</p>
</div>

<div class="card">
<h3>🐯 Tigres vs Chivas</h3>
<p>Confianza: 75%</p>
<p>Predicción: Tigres gana o empate</p>
</div>

`;

}


if(seccion === "perfil"){

contenido.innerHTML = `

<h2>⚙️ Perfil</h2>

<div class="card">
<p>👤 Usuario: Isaac</p>
<p>⚽ Equipo favorito: América</p>
</div>

`;

}

}
