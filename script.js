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


`;

}





if(seccion === "predicciones"){

contenido.innerHTML = `


<h2>🤖 Predicciones MatchIQ</h2>


<div class="card">

<h3>🦅 América vs Toluca</h3>

<p>Victoria América: 58%</p>

<p>Empate: 22%</p>

<p>Victoria Toluca: 20%</p>

<p>🤖 Recomendación:</p>

<p>América gana o empate</p>

<p>⚽ Tendencia: Menos de 3.5 goles</p>

</div>



<div class="card">

<h3>🐯 Tigres vs Chivas</h3>

<p>Victoria Tigres: 51%</p>

<p>Empate: 26%</p>

<p>Victoria Chivas: 23%</p>

<p>🤖 Recomendación:</p>

<p>Tigres gana o empate</p>

<p>⚽ Tendencia: Ambos equipos anotan posible</p>

</div>



<div class="card">

<h3>🔵 Cruz Azul vs Monterrey</h3>

<p>Victoria Cruz Azul: 35%</p>

<p>Empate: 30%</p>

<p>Victoria Monterrey: 35%</p>

<p>🤖 Recomendación:</p>

<p>Partido equilibrado</p>

<p>⚽ Tendencia: Menos de 2.5 goles</p>

</div>


`;

}





if(seccion === "perfil"){

contenido.innerHTML = `


<h2>⚙️ Perfil</h2>



<div class="card">

<h3>👤 Usuario</h3>

<p>Isaac</p>

</div>



<div class="card">

<h3>⚽ Equipo favorito</h3>

<p>🦅 América</p>

</div>



<div class="card">

<h3>🔔 Preferencias</h3>

<p>✅ Recibir análisis antes de partidos</p>

<p>✅ Mostrar predicciones favoritas</p>

</div>



<div class="card">

<h3>⭐ Partidos favoritos</h3>

<p>🦅 América vs Toluca</p>

<p>🐯 Tigres vs Chivas</p>

</div>


`;

}


}
