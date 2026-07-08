function cargarInicio(){

let contenido=document.getElementById("contenido");

contenido.innerHTML=`

<h2>Liga MX - Jornada 1</h2>


<div class="card partido">

<div class="teams">

<div class="team">
<img src="/images/america.png">
<span>América</span>
</div>

<span class="vs">VS</span>

<div class="team">
<img src="/images/toluca.png">
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
<img src="/images/tigres.png">
<span>Tigres</span>
</div>

<span class="vs">VS</span>

<div class="team">
<img src="/images/chivas.png">
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
<img src="/images/cruzazul.png">
<span>Cruz Azul</span>
</div>

<span class="vs">VS</span>

<div class="team">
<img src="/images/monterrey.png">
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


let existe=boton.parentElement.querySelector(".analisis");


if(existe){

existe.remove();

return;

}


let analisis=document.createElement("div");

analisis.className="analisis";



if(equipo==="america"){

analisis.innerHTML=`

<h3>🦅 América vs Toluca</h3>

<p>📊 Forma reciente</p>

<p>América: 🟢 G 🟢 G 🟡 E 🟢 G</p>

<p>Toluca: 🟢 G 🟡 E 🟢 G</p>


<p>🤖 Predicción: América gana o empate</p>

<p>📈 Confianza: 80%</p>


<h3>🎯 Resultados más probables</h3>

<p>🥇 América 2 - 1 Toluca → 32%</p>
<p>🥈 América 1 - 0 Toluca → 24%</p>
<p>🥉 América 1 - 1 Toluca → 18%</p>

`;

}




if(equipo==="tigres"){

analisis.innerHTML=`

<h3>🐯 Tigres vs Chivas</h3>

<p>📊 Forma reciente</p>

<p>Tigres: 🟢 G 🟢 G 🟡 E</p>

<p>Chivas: 🟢 G 🔴 P 🟡 E</p>


<p>🤖 Predicción: Tigres gana o empate</p>

<p>📈 Confianza: 75%</p>


<h3>🎯 Resultados más probables</h3>

<p>🥇 Tigres 2 - 0 Chivas → 30%</p>
<p>🥈 Tigres 2 - 1 Chivas → 25%</p>
<p>🥉 Tigres 1 - 1 Chivas → 20%</p>

`;

}
if(equipo==="cruzazul"){

analisis.innerHTML=`

<h3>🔵 Cruz Azul vs Monterrey</h3>

<p>📊 Forma reciente</p>

<p>Cruz Azul: 🟢 G 🟡 E 🟢 G</p>

<p>Monterrey: 🟢 G 🟢 G 🟡 E</p>


<p>🤖 Predicción: Partido equilibrado</p>

<p>📈 Confianza: 65%</p>


<h3>🎯 Resultados más probables</h3>

<p>🥇 Cruz Azul 1 - 1 Monterrey → 30%</p>
<p>🥈 Cruz Azul 1 - 0 Monterrey → 22%</p>
<p>🥉 Cruz Azul 2 - 1 Monterrey → 18%</p>

`;

}



boton.parentElement.appendChild(analisis);


}





function mostrarSeccion(seccion){

let contenido=document.getElementById("contenido");



if(seccion==="inicio"){

cargarInicio();

}




if(seccion==="estadisticas"){

contenido.innerHTML=`

<h2>📊 Estadísticas Liga MX</h2>


<div class="card">

<h3>🏆 Tabla de posiciones</h3>

<p>🦅 América - 15 pts</p>
<p>🐯 Tigres - 13 pts</p>
<p>🔵 Monterrey - 12 pts</p>
<p>🐐 Chivas - 10 pts</p>

</div>



<div class="card">

<h3>⚽ Ataque</h3>

<p>🦅 América - 10 goles</p>
<p>🔵 Monterrey - 9 goles</p>
<p>🐯 Tigres - 8 goles</p>

</div>



<div class="card">

<h3>🛡️ Mejor defensa</h3>

<p>🐯 Tigres - 3 goles recibidos</p>

</div>


`;

}





if(seccion==="predicciones"){

contenido.innerHTML=`

<h2>🤖 Predicciones MatchIQ</h2>



<div class="card">

<h3>🦅 América vs Toluca</h3>

<p>Victoria América: 58%</p>
<p>Empate: 22%</p>
<p>Victoria Toluca: 20%</p>

<p>🤖 Recomendación: América gana o empate</p>

<p>📈 Confianza: Alta</p>


<h3>🎯 Resultados más probables</h3>

<p>🥇 América 2 - 1 Toluca → 32%</p>
<p>🥈 América 1 - 0 Toluca → 24%</p>
<p>🥉 América 1 - 1 Toluca → 18%</p>


</div>





<div class="card">

<h3>🐯 Tigres vs Chivas</h3>

<p>Victoria Tigres: 51%</p>
<p>Empate: 26%</p>
<p>Victoria Chivas: 23%</p>


<p>🤖 Recomendación: Tigres gana o empate</p>

<p>📈 Confianza: Media</p>


<h3>🎯 Resultados más probables</h3>

<p>🥇 Tigres 2 - 0 Chivas → 30%</p>
<p>🥈 Tigres 2 - 1 Chivas → 25%</p>
<p>🥉 Tigres 1 - 1 Chivas → 20%</p>


</div>





<div class="card">

<h3>🔵 Cruz Azul vs Monterrey</h3>

<p>Victoria Cruz Azul: 35%</p>
<p>Empate: 30%</p>
<p>Victoria Monterrey: 35%</p>


<p>🤖 Recomendación: Partido equilibrado</p>

<p>📈 Confianza: Media</p>


<h3>🎯 Resultados más probables</h3>

<p>🥇 Cruz Azul 1 - 1 Monterrey → 30%</p>
<p>🥈 Cruz Azul 1 - 0 Monterrey → 22%</p>
<p>🥉 Cruz Azul 2 - 1 Monterrey → 18%</p>


</div>


`;

}





if(seccion==="perfil"){

contenido.innerHTML=`

<h2>⚙️ Perfil</h2>


<div class="card">

<h3>👤 Usuario</h3>

<p>Isaac</p>

</div>



<div class="card">

<h3>⚽ Equipo favorito</h3>

<img src="/images/america.png" width="60">

<p>América</p>

</div>



<div class="card">

<h3>🔔 Preferencias</h3>

<p>✅ Análisis antes de partidos</p>
<p>✅ Predicciones favoritas</p>

</div>



<div class="card">

<h3>⭐ Partidos favoritos</h3>


<p>🦅 América vs Toluca</p>

<p>🐯 Tigres vs Chivas</p>

<p>🔵 Cruz Azul vs Monterrey</p>


</div>


`;

}


}  
