let equiposSeguidos = JSON.parse(localStorage.getItem("equiposSeguidos")) || [];

let notificaciones = JSON.parse(localStorage.getItem("notificaciones")) || [];

let paginaAnterior = "inicio";




// =======================
// JUGADORES
// =======================


const jugadores = [

{
id:"henry",
nombre:"Henry Martín",
equipo:"América",
posicion:"Delantero",
numero:21,
edad:32,
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
numero:8,
edad:27,
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
numero:1,
edad:28,
foto:"images/malagon.png",
porteriasCero:4,
atajadas:78,
minutos:900,
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
numero:10,
edad:40,
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







// =======================
// EQUIPOS
// =======================


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

];







// =======================
// PARTIDOS
// =======================


const partidos=[


{

id:"america",

local:"América",

visitante:"Toluca",

logoLocal:"images/america.png",

logoVisitante:"images/toluca.png",

hora:"20:00",

estadio:"Estadio Ciudad de los Deportes",


prediccion:"América gana o empate",

confianza:"80%",


probabilidades:{

local:"55%",
empate:"25%",
visitante:"20%"

},


marcadores:[

"América 2-1 Toluca 32%",

"América 1-0 Toluca 24%",

"América 1-1 Toluca 18%"

],


formaLocal:"G G G E G",

formaVisitante:"G E G G",


ataqueLocal:"Alto",

ataqueVisitante:"Bueno",


defensaLocal:"Media",

defensaVisitante:"Buena",


golesRecibidosLocal:8,

golesRecibidosVisitante:10,


factor:"América genera más ocasiones y tiene mejor rendimiento como local."

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

confianza:"75%",


probabilidades:{

local:"50%",
empate:"30%",
visitante:"20%"

},


marcadores:[

"Tigres 2-0 Chivas 30%",

"Tigres 2-1 Chivas 25%",

"Tigres 1-1 Chivas 20%"

],


formaLocal:"G G E G",

formaVisitante:"E G G E",


ataqueLocal:"Muy alto",

ataqueVisitante:"Medio",


defensaLocal:"Buena",

defensaVisitante:"Media",


golesRecibidosLocal:7,

golesRecibidosVisitante:12,


factor:"Tigres domina más la posesión y genera más tiros."

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

confianza:"65%",


probabilidades:{

local:"35%",
empate:"35%",
visitante:"30%"

},


marcadores:[

"Cruz Azul 1-1 Monterrey 30%",

"Cruz Azul 1-0 Monterrey 22%",

"Cruz Azul 0-1 Monterrey 20%"

],


formaLocal:"G G E E",

formaVisitante:"G E G G",


ataqueLocal:"Bueno",

ataqueVisitante:"Bueno",


defensaLocal:"Buena",

defensaVisitante:"Buena",


golesRecibidosLocal:9,

golesRecibidosVisitante:9,


factor:"Dos equipos muy parejos, se espera un partido cerrado."

}


];





// =======================
// ALINEACIONES
// =======================


const alineaciones={


america:{

formacion:"4-2-3-1",

titulares:[

"malagon",

"fidalgo",

"henry"

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


};// =======================
// FUNCIONES GENERALES
// =======================


function guardarDatos(){

localStorage.setItem(
"equiposSeguidos",
JSON.stringify(equiposSeguidos)
);


localStorage.setItem(
"notificaciones",
JSON.stringify(notificaciones)
);

}



function buscarJugador(id){

return jugadores.find(
j=>j.id===id
);

}



function buscarPartido(id){

return partidos.find(
p=>p.id===id
);

}



function botonRegresar(){

return `

<button class="back-button" onclick="mostrarSeccion('${paginaAnterior}')">

← Regresar

</button>

`;

}





// =======================
// INICIO
// =======================


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


<h3>Predicción destacada</h3>


<p>${p.prediccion}</p>

<p>Confianza ${p.confianza}</p>


<button onclick="cargarPredicciones()">

Ver todas las predicciones

</button>



</div>


`;

}







// =======================
// PARTIDOS
// =======================


function cargarPartidos(){


paginaAnterior="inicio";


let contenido=document.getElementById("contenido");


contenido.innerHTML=`

<h2>Partidos</h2>


${partidos.map(p=>`


<div class="card">


<h3>${p.local} vs ${p.visitante}</h3>


<p>${p.hora}</p>


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







// =======================
// ANALISIS
// =======================


function mostrarAnalisis(id){


paginaAnterior="partidos";


let p=buscarPartido(id);


let contenido=document.getElementById("contenido");


contenido.innerHTML=`

${botonRegresar()}



<div class="card">


<h2>${p.local} vs ${p.visitante}</h2>



<h3>Predicción</h3>

<p>${p.prediccion}</p>

<p>Confianza: ${p.confianza}</p>



<h3>Probabilidades</h3>

<p>${p.local}: ${p.probabilidades.local}</p>

<p>Empate: ${p.probabilidades.empate}</p>

<p>${p.visitante}: ${p.probabilidades.visitante}</p>



<h3>Resultados favoritos</h3>


${p.marcadores.map(m=>`

<p>${m}</p>

`).join("")}




<h3>Forma reciente</h3>

<p>${p.local}: ${p.formaLocal}</p>

<p>${p.visitante}: ${p.formaVisitante}</p>




<h3>Ataque</h3>

<p>${p.local}: ${p.ataqueLocal}</p>

<p>${p.visitante}: ${p.ataqueVisitante}</p>




<h3>Defensa</h3>

<p>${p.local}: ${p.defensaLocal}</p>

<p>${p.visitante}: ${p.defensaVisitante}</p>



<h3>Goles recibidos</h3>

<p>${p.local}: ${p.golesRecibidosLocal}</p>

<p>${p.visitante}: ${p.golesRecibidosVisitante}</p>




<h3>Factor clave</h3>

<p>${p.factor}</p>



</div>


`;

}








// =======================
// ALINEACIONES
// =======================


function mostrarAlineacion(id){


paginaAnterior="partidos";


let equipo =
id==="america"
?
"america"
:
"tigres";



let data=alineaciones[equipo];


let contenido=document.getElementById("contenido");



contenido.innerHTML=`

${botonRegresar()}


<div class="card">


<h2>Alineación</h2>


<h3>${data.formacion}</h3>




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








// =======================
// POPUP JUGADOR
// =======================


function mostrarJugador(id){


let j=buscarJugador(id);



let popup=document.getElementById("player-popup");



if(!popup){


popup=document.createElement("div");

popup.id="player-popup";

document.body.appendChild(popup);


}



popup.innerHTML=`


<div class="popup-background"

onclick="cerrarJugadorPopup()">

</div>




<div class="player-modal">


<button class="close-popup"

onclick="cerrarJugadorPopup()">

×

</button>



<img src="${j.foto}" class="player-image">



<h2>${j.nombre}</h2>


<p>${j.equipo}</p>

<p>${j.posicion} #${j.numero}</p>




<h3>MatchIQ</h3>


<h1>${j.valoracion}/10</h1>




<div class="player-stats">


<div>

Goles

<b>${j.goles || 0}</b>

</div>


<div>

Asistencias

<b>${j.asistencias || 0}</b>

</div>


<div>

Pases

<b>${j.pases || 0}%</b>

</div>


<div>

Regates

<b>${j.regates || 0}%</b>

</div>


<div>

Tiros

<b>${j.tiros || 0}%</b>

</div>


<div>

Duelos

<b>${j.duelos || 0}%</b>

</div>


</div>




<h3>Ranking Liga MX</h3>


<p>Goles #${j.ranking.goles}</p>

<p>Pases #${j.ranking.pases}</p>

<p>Regates #${j.ranking.regates}</p>



</div>



`;



popup.style.display="block";


}





function cerrarJugadorPopup(){


let popup=document.getElementById("player-popup");


if(popup)

popup.style.display="none";


}








// =======================
// PREDICCIONES
// =======================


function cargarPredicciones(){


paginaAnterior="inicio";


let contenido=document.getElementById("contenido");


contenido.innerHTML=`


<h2>Predicciones</h2>


${partidos.map(p=>`


<div class="card">


<h3>${p.local} vs ${p.visitante}</h3>



<p>

Predicción:

${p.prediccion}

</p>



<p>

Confianza:

${p.confianza}

</p>



<h3>Marcadores probables</h3>


${p.marcadores.map(m=>`

<p>${m}</p>

`).join("")}



</div>



`).join("")}



`;

}








// =======================
// PERFIL
// =======================


function cargarPerfil(){


paginaAnterior="inicio";


let contenido=document.getElementById("contenido");



contenido.innerHTML=`

<h2>Perfil</h2>



<div class="card">

<h3>Usuario</h3>

<p>Isaac</p>

</div>





<div class="card">


<h3>Equipos seguidos</h3>



${equipos.map(e=>`


<div class="player-card">


<img src="${e.logo}">


<div>

<strong>${e.nombre}</strong>


<br>


${
notificaciones.includes(e.nombre)

?

"Notificaciones activadas"

:

"Sin notificaciones"

}


</div>



<button onclick="cambiarNotificacion('${e.nombre}')">


${

notificaciones.includes(e.nombre)

?

"Desactivar"

:

"Activar"

}


</button>



</div>


`).join("")}



</div>


`;

}




function cambiarNotificacion(nombre){


if(notificaciones.includes(nombre)){


notificaciones =
notificaciones.filter(
x=>x!==nombre
);


}

else{


notificaciones.push(nombre);


}


guardarDatos();


cargarPerfil();


}








// =======================
// ESTADISTICAS
// =======================


function cargarEstadisticas(){


paginaAnterior="inicio";


let contenido=document.getElementById("contenido");



contenido.innerHTML=`

<h2>Estadísticas Liga MX</h2>


<div class="card">

<h3>Goleadores</h3>

<p>Henry Martín - 7 goles</p>

<p>Gignac - 6 goles</p>

</div>



<div class="card">

<h3>Asistencias</h3>

<p>Fidalgo - 5 asistencias</p>

</div>



<div class="card">

<h3>Tarjetas amarillas</h3>

<p>Jugador América - 5</p>

</div>



<div class="card">

<h3>Tarjetas rojas</h3>

<p>Jugador Tigres - 1</p>

</div>



`;

}








// =======================
// NAVEGACION
// =======================


function mostrarSeccion(seccion){


if(seccion==="inicio")

cargarInicio();



if(seccion==="partidos")

cargarPartidos();



if(seccion==="predicciones")

cargarPredicciones();



if(seccion==="perfil")

cargarPerfil();



if(seccion==="estadisticas")

cargarEstadisticas();



}




cargarInicio();
