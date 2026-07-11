let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];


const partidos = [

{
id:"america",
local:"América",
visitante:"Toluca",
logoLocal:"images/america.png",
logoVisitante:"images/toluca.png",
estadio:"Estadio Ciudad de los Deportes",
hora:"20:00",
probabilidades:{
local:58,
empate:22,
visitante:20
}
},

{
id:"tigres",
local:"Tigres",
visitante:"Chivas",
logoLocal:"images/tigres.png",
logoVisitante:"images/chivas.png",
estadio:"Estadio Universitario",
hora:"21:00",
probabilidades:{
local:51,
empate:26,
visitante:23
}
},

{
id:"cruzazul",
local:"Cruz Azul",
visitante:"Monterrey",
logoLocal:"images/cruzazul.png",
logoVisitante:"images/monterrey.png",
estadio:"Estadio Ciudad de los Deportes",
hora:"19:00",
probabilidades:{
local:35,
empate:30,
visitante:35
}
}

];



function guardarFavoritos(){

localStorage.setItem(
"favoritos",
JSON.stringify(favoritos)
);

}



function esFavorito(id){

return favoritos.includes(id);

}



function cambiarFavorito(id){

if(esFavorito(id)){

favoritos = favoritos.filter(
(item)=> item !== id
);

}

else{

favoritos.push(id);

}


guardarFavoritos();


mostrarSeccion("inicio");

}




function cargarInicio(){


let contenido=document.getElementById("contenido");


contenido.innerHTML=`

<h2>Liga MX - Jornada 1</h2>


${partidos.map(partido=>`


<div class="card partido">


<div class="teams">


<div class="team">

<img src="${partido.logoLocal}">

<span>${partido.local}</span>

</div>


<div class="vs">

VS

</div>


<div class="team">

<img src="${partido.logoVisitante}">

<span>${partido.visitante}</span>

</div>


</div>



<p class="status">
Próximo partido
</p>


<p>${partido.estadio}</p>

<p>${partido.hora}</p>



<div class="bar">

<div class="${partido.id}"
style="width:${partido.probabilidades.local}%">

</div>

</div>



<p>

${partido.local} ${partido.probabilidades.local}%

&nbsp; | &nbsp;

Empate ${partido.probabilidades.empate}%

&nbsp; | &nbsp;

${partido.visitante} ${partido.probabilidades.visitante}%

</p>



<button onclick="mostrarAnalisis(this,'${partido.id}')">

Ver análisis

</button>


<button onclick="cambiarFavorito('${partido.id}')">

${esFavorito(partido.id) ? "Quitar favorito" : "Agregar favorito"}

</button>



</div>


`).join("")}



`;

}




function mostrarAnalisis(boton,equipo){


let existente=
boton.parentElement.querySelector(".analisis");


if(existente){

existente.remove();

return;

}



let analisis=document.createElement("div");


analisis.className="analisis";



if(equipo==="america"){


analisis.innerHTML=`

<h3>Análisis MatchIQ</h3>


<p>Forma reciente</p>


<p>América: G G E G</p>

<p>Toluca: G E G</p>



<h3>Predicción</h3>


<p>América gana o empate</p>


<p>Confianza: 80%</p>



<h3>Resultados probables</h3>


<p>1. América 2 - 1 Toluca — 32%</p>

<p>2. América 1 - 0 Toluca — 24%</p>

<p>3. América 1 - 1 Toluca — 18%</p>



<h3>Factores clave</h3>


<p>Ataque</p>

<p>América ★★★★★</p>

<p>Toluca ★★★★</p>


<p>Defensa</p>

<p>América ★★★</p>

<p>Toluca ★★★★</p>


<p>Localía</p>

<p>América ★★★★★</p>


`;

}



if(equipo==="tigres"){


analisis.innerHTML=`

<h3>Análisis MatchIQ</h3>


<p>Forma reciente</p>

<p>Tigres: G G E</p>

<p>Chivas: G P E</p>



<h3>Predicción</h3>


<p>Tigres gana o empate</p>

<p>Confianza: 75%</p>



<h3>Resultados probables</h3>


<p>1. Tigres 2 - 0 Chivas — 30%</p>

<p>2. Tigres 2 - 1 Chivas — 25%</p>

<p>3. Tigres 1 - 1 Chivas — 20%</p>



<h3>Factores clave</h3>


<p>Ataque</p>

<p>Tigres ★★★★★</p>

<p>Chivas ★★★</p>


<p>Defensa</p>

<p>Tigres ★★★★</p>

<p>Chivas ★★★</p>


<p>Localía</p>

<p>Tigres ★★★★★</p>


`;

}
if(equipo==="cruzazul"){


analisis.innerHTML=`

<h3>Análisis MatchIQ</h3>


<p>Forma reciente</p>

<p>Cruz Azul: G E G</p>

<p>Monterrey: G G E</p>



<h3>Predicción</h3>


<p>Partido equilibrado</p>

<p>Confianza: 65%</p>



<h3>Resultados probables</h3>


<p>1. Cruz Azul 1 - 1 Monterrey — 30%</p>

<p>2. Cruz Azul 1 - 0 Monterrey — 22%</p>

<p>3. Cruz Azul 0 - 1 Monterrey — 20%</p>



<h3>Factores clave</h3>


<p>Ataque</p>

<p>Cruz Azul ★★★★</p>

<p>Monterrey ★★★★</p>


<p>Defensa</p>

<p>Cruz Azul ★★★★</p>

<p>Monterrey ★★★★</p>


<p>Localía</p>

<p>Cruz Azul ★★★★</p>


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

<h2>Estadísticas Liga MX</h2>


<div class="card">

<h3>Tabla de posiciones</h3>


<table>

<tr>

<th>Equipo</th>
<th>PJ</th>
<th>PTS</th>

</tr>


<tr>

<td>América</td>
<td>5</td>
<td>15</td>

</tr>


<tr>

<td>Tigres</td>
<td>5</td>
<td>13</td>

</tr>


<tr>

<td>Monterrey</td>
<td>5</td>
<td>12</td>

</tr>


<tr>

<td>Chivas</td>
<td>5</td>
<td>10</td>

</tr>


</table>


</div>




<div class="card">

<h3>Goleadores</h3>


<p>Henry Martín — 7 goles</p>

<p>Gignac — 6 goles</p>

<p>Berterame — 5 goles</p>


</div>




<div class="card">

<h3>Asistidores</h3>


<p>Fidalgo — 5 asistencias</p>

<p>Brunetta — 4 asistencias</p>

<p>Canales — 3 asistencias</p>


</div>




<div class="card">

<h3>Contribuciones de gol</h3>


<p>Henry Martín — 10</p>

<p>Gignac — 8</p>

<p>Canales — 7</p>


</div>




<div class="card">

<h3>Tarjetas amarillas</h3>


<p>Jugador A — 4</p>

<p>Jugador B — 3</p>


</div>




<div class="card">

<h3>Tarjetas rojas</h3>


<p>Jugador A — 1</p>


</div>




<div class="card">

<h3>Porterías a cero</h3>


<p>Luis Malagón — 4</p>

<p>Nahuel Guzmán — 3</p>


</div>


`;

}





if(seccion==="predicciones"){


contenido.innerHTML=`

<h2>Predicciones MatchIQ</h2>



<div class="card">

<h3>América vs Toluca</h3>

<p>Probabilidad América: 58%</p>

<p>Empate: 22%</p>

<p>Toluca: 20%</p>


<h3>Resultado probable</h3>

<p>América 2 - 1 Toluca</p>


<h3>Confianza</h3>

<p>Alta</p>


</div>




<div class="card">

<h3>Tigres vs Chivas</h3>

<p>Probabilidad Tigres: 51%</p>

<p>Empate: 26%</p>

<p>Chivas: 23%</p>


<h3>Resultado probable</h3>

<p>Tigres 2 - 0 Chivas</p>


<h3>Confianza</h3>

<p>Media</p>


</div>




<div class="card">

<h3>Cruz Azul vs Monterrey</h3>

<p>Probabilidad Cruz Azul: 35%</p>

<p>Empate: 30%</p>

<p>Monterrey: 35%</p>


<h3>Resultado probable</h3>

<p>Cruz Azul 1 - 1 Monterrey</p>


<h3>Confianza</h3>

<p>Media</p>


</div>


`;

}





if(seccion==="perfil"){


contenido.innerHTML=`

<h2>Perfil</h2>



<div class="card">

<h3>Usuario</h3>

<p>Isaac</p>


</div>




<div class="card">

<h3>Equipo favorito</h3>

<img src="images/america.png" width="60">

<p>América</p>


</div>




<div class="card">

<h3>Mis partidos favoritos</h3>


${
favoritos.length===0

?

"<p>No tienes partidos favoritos</p>"

:

favoritos.map(id=>{

let partido=partidos.find(p=>p.id===id);

return `

<p>

${partido.local} vs ${partido.visitante}

</p>

`;

}).join("")

}


</div>


`;

}


}
