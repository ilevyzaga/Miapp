let equiposSeguidos = JSON.parse(localStorage.getItem("equiposSeguidos")) || [];

let paginaAnterior = "inicio";



const jugadores = [

{
id:"henry",
nombre:"Henry Martín",
equipo:"América",
posicion:"Delantero",
edad:32,
numero:21,
foto:"images/henry.png",
goles:7,
asistencias:3,
minutos:850,
pases:86,
regates:63,
tiros:72,
duelos:58,
valoracion:9.1,
ranking:{
goles:3,
pases:4,
regates:17
}
},


{
id:"fidalgo",
nombre:"Álvaro Fidalgo",
equipo:"América",
posicion:"Mediocampista",
edad:27,
numero:8,
foto:"images/fidalgo.png",
goles:2,
asistencias:5,
minutos:920,
pases:91,
regates:78,
tiros:64,
duelos:61,
valoracion:8.7,
ranking:{
goles:20,
pases:2,
regates:6
}
},


{
id:"malagon",
nombre:"Luis Malagón",
equipo:"América",
posicion:"Portero",
edad:28,
numero:1,
foto:"images/malagon.png",
goles:0,
asistencias:0,
minutos:900,
pases:82,
regates:0,
tiros:0,
duelos:40,
valoracion:8.5,
ranking:{
porterias:1
}
},


{
id:"gignac",
nombre:"André-Pierre Gignac",
equipo:"Tigres",
posicion:"Delantero",
edad:40,
numero:10,
foto:"images/gignac.png",
goles:6,
asistencias:2,
minutos:780,
pases:81,
regates:55,
tiros:70,
duelos:60,
valoracion:8.8,
ranking:{
goles:5,
pases:15,
regates:22
}
}

];





const alineaciones = {


america:{

formacion:"4-2-3-1",

titulares:[

"malagon",
"henry",
"fidalgo"

],

suplentes:[

"gignac"

]

},


tigres:{

formacion:"4-3-3",

titulares:[

"gignac"

],

suplentes:[

"henry"

]

}


};






const partidos = [

{
id:"america",
local:"América",
visitante:"Toluca",
logoLocal:"images/america.png",
logoVisitante:"images/toluca.png",
hora:"20:00",
estadio:"Estadio Ciudad de los Deportes",
prediccion:"América gana o empate",
confianza:"80%"
},


{
id:"tigres",
local:"Tigres",
visitante:"Chivas",
logoLocal:"images/tigres.png",
logoVisitante:"images/chivas.png",
hora:"21:00",
estadio:"Estadio Universitario",
prediccion:"Tigres gana o empate",
confianza:"75%"
},


{
id:"cruzazul",
local:"Cruz Azul",
visitante:"Monterrey",
logoLocal:"images/cruzazul.png",
logoVisitante:"images/monterrey.png",
hora:"19:00",
estadio:"Ciudad de los Deportes",
prediccion:"Partido equilibrado",
confianza:"65%"
}

];






const equipos=[

{
nombre:"América",
logo:"images/america.png"
},

{
nombre:"Tigres",
logo:"images/tigres.png"
},

{
nombre:"Chivas",
logo:"images/chivas.png"
},

{
nombre:"Cruz Azul",
logo:"images/cruzazul.png"
},

{
nombre:"Monterrey",
logo:"images/monterrey.png"
}

];function guardarEquipos(){

localStorage.setItem(
"equiposSeguidos",
JSON.stringify(equiposSeguidos)
);

}




function botonRegresar(){

return `

<button class="back-button" onclick="mostrarSeccion('${paginaAnterior}')">

← Regresar

</button>

`;

}





function buscarJugador(id){

return jugadores.find(
j=>j.id===id
);

}





function cargarInicio(){

paginaAnterior="inicio";


let contenido=document.getElementById("contenido");


let p=partidos[0];


contenido.innerHTML=`

<h2>Inicio</h2>


<div class="card">


<h3>Partido destacado</h3>


<div class="teams">


<div class="team">

<img src="${p.logoLocal}">

${p.local}

</div>


<div class="vs">

VS

</div>


<div class="team">

<img src="${p.logoVisitante}">

${p.visitante}

</div>


</div>


<p>${p.hora}</p>

<p>${p.estadio}</p>


<button onclick="mostrarAnalisis('${p.id}')">

Ver análisis

</button>


<button onclick="mostrarAlineacion('${p.id}')">

Ver alineaciones

</button>


</div>


<div class="card">

<h3>Jugador destacado</h3>


<button onclick="mostrarJugador('henry')">

Henry Martín

</button>


</div>


`;

}





function cargarPartidos(){

paginaAnterior="inicio";


let contenido=document.getElementById("contenido");


contenido.innerHTML=`

<h2>Partidos</h2>


${partidos.map(p=>`


<div class="card">


<h3>${p.local} vs ${p.visitante}</h3>


<p>${p.hora}</p>

<p>${p.estadio}</p>


<button onclick="mostrarAnalisis('${p.id}')">

Ver análisis

</button>



<button onclick="mostrarAlineacion('${p.id}')">

Ver alineaciones

</button>


</div>


`).join("")}


`;

}





function mostrarAnalisis(id){

paginaAnterior="partidos";


let p=partidos.find(
x=>x.id===id
);


let contenido=document.getElementById("contenido");


contenido.innerHTML=`

${botonRegresar()}


<div class="card">


<h2>${p.local} vs ${p.visitante}</h2>


<h3>Predicción</h3>

<p>${p.prediccion}</p>


<p>Confianza: ${p.confianza}</p>



<h3>Comparación</h3>


<p>Ataque</p>

<div class="progress">

<div style="width:85%">

</div>

</div>



<p>Defensa</p>

<div class="progress">

<div style="width:70%">

</div>

</div>



</div>


`;

}





function mostrarAlineacion(id){

paginaAnterior="partidos";


let contenido=document.getElementById("contenido");


let equipo=id==="america"
?
"america"
:
"tigres";


let data=alineaciones[equipo];


contenido.innerHTML=`

${botonRegresar()}


<div class="card">


<h2>Alineación</h2>


<h3>Formación ${data.formacion}</h3>



<h3>Titulares</h3>


${data.titulares.map(id=>{

let j=buscarJugador(id);


return `

<div class="player-card"
onclick="mostrarJugador('${j.id}')">


<img src="${j.foto}">


<div>

<strong>${j.nombre}</strong>

<br>

${j.posicion}

</div>


</div>

`;

}).join("")}



<h3>Suplentes</h3>


${data.suplentes.map(id=>{

let j=buscarJugador(id);


return `

<div class="player-card"
onclick="mostrarJugador('${j.id}')">


${j.nombre}


</div>


`;

}).join("")}


</div>


`;

}





function mostrarJugador(id){

paginaAnterior="partidos";


let j=buscarJugador(id);


let contenido=document.getElementById("contenido");


contenido.innerHTML=`

${botonRegresar()}


<div class="card jugador-profile">


<img src="${j.foto}" class="player-image">


<h2>${j.nombre}</h2>


<p>${j.equipo}</p>


<p>${j.posicion} | #${j.numero}</p>


<p>Edad: ${j.edad}</p>



<h3>Valoración MatchIQ</h3>

<h1>${j.valoracion}/10</h1>



<h3>Estadísticas</h3>


<p>Goles: ${j.goles}</p>

<p>Asistencias: ${j.asistencias}</p>

<p>Minutos: ${j.minutos}</p>


<h3>Porcentajes</h3>


<p>Pases completados: ${j.pases}%</p>

<p>Regates completados: ${j.regates}%</p>

<p>Tiros a puerta: ${j.tiros}%</p>

<p>Duelos ganados: ${j.duelos}%</p>



<h3>Ranking Liga MX</h3>


<p>

Goles:

#${j.ranking.goles}

</p>


<p>

Pases:

#${j.ranking.pases}

</p>


<p>

Regates:

#${j.ranking.regates}

</p>


</div>


`;

}





function cargarPredicciones(){

paginaAnterior="inicio";


let contenido=document.getElementById("contenido");


contenido.innerHTML=`

<h2>Predicciones</h2>


${partidos.map(p=>`

<div class="card">

<h3>${p.local} vs ${p.visitante}</h3>

<p>${p.prediccion}</p>

<p>${p.confianza}</p>

</div>


`).join("")}

`;

}





function cargarPerfil(){

paginaAnterior="inicio";


let contenido=document.getElementById("contenido");


contenido.innerHTML=`

<h2>Perfil</h2>


<div class="card">


<h3>Equipos seguidos</h3>


${equipos.map(e=>`

<div class="player-card">


<img src="${e.logo}">


<div>

<strong>${e.nombre}</strong>


</div>


<button>

Activar

</button>


</div>


`).join("")}


</div>


`;

}





function cargarEstadisticas(){

paginaAnterior="inicio";


let contenido=document.getElementById("contenido");


contenido.innerHTML=`

<h2>Rankings Liga MX</h2>


<div class="card">


<h3>Mejor conversión de pases</h3>


<p>1. Fidalgo - 91%</p>

<p>2. Jugador 2 - 89%</p>

<p>3. Jugador 3 - 88%</p>


</div>



<div class="card">


<h3>Mejor conversión de regates</h3>


<p>1. Jugador 1 - 82%</p>

<p>17. Henry Martín - 63%</p>


</div>


`;

}





function mostrarSeccion(seccion){


if(seccion==="inicio")
cargarInicio();


if(seccion==="partidos")
cargarPartidos();


if(seccion==="predicciones")
cargarPredicciones();


if(seccion==="estadisticas")
cargarEstadisticas();


if(seccion==="perfil")
cargarPerfil();


}



cargarInicio();
