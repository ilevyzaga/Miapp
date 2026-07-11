let equiposSeguidos = JSON.parse(localStorage.getItem("equiposSeguidos")) || [];

let notificaciones = JSON.parse(localStorage.getItem("notificaciones")) || [];

let paginaAnterior = "inicio";



// =======================
// JUGADORES
// =======================

const jugadores = [


{
id:"malagon",

nombre:"Luis Malagón",

equipo:"América",

posicion:"Portero",

numero:1,

edad:28,

foto:"images/malagon.png",


estadisticas:{

partidos:10,

minutos:900,

atajadas:32,

porcentajeAtajadas:78,

golesRecibidos:8,

porteriasCero:4,

penalesAtajados:1,

pases:82

},


valoracion:8.5,


ranking:{

porterias:2,

atajadas:5

}

},




{
id:"henry",


nombre:"Henry Martín",

equipo:"América",

posicion:"Delantero",

numero:21,

edad:32,

foto:"images/henry.png",


estadisticas:{

partidos:11,

minutos:850,

goles:7,

asistencias:3,

tiros:72,

tirosPuerta:45,

conversion:22,

regates:63,

duelos:58,

pases:86

},


valoracion:9.1,


ranking:{

goles:3,

conversion:6,

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


estadisticas:{

partidos:12,

minutos:920,

goles:2,

asistencias:5,

pases:91,

pasesClave:34,

ocasionesCreadas:29,

regates:78,

duelos:61,

recuperaciones:55

},


valoracion:8.7,


ranking:{

pases:2,

regates:6,

creacion:4

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


estadisticas:{

partidos:10,

minutos:780,

goles:6,

asistencias:2,

tiros:70,

tirosPuerta:41,

conversion:19,

regates:55,

duelos:60,

pases:81

},


valoracion:8.8,


ranking:{

goles:5,

conversion:8,

regates:22

}

},





{
id:"jugador_defensa",


nombre:"Jesús Orozco",

equipo:"Chivas",

posicion:"Defensa",

numero:4,

edad:23,

foto:"images/orozco.png",


estadisticas:{

partidos:11,

minutos:990,

goles:1,

asistencias:1,

entradas:36,

intercepciones:42,

despejes:55,

duelosGanados:74,

pases:88,

recuperaciones:63

},


valoracion:8.2,


ranking:{

duelos:7,

intercepciones:5

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
},


{
nombre:"Toluca",
logo:"images/toluca.png"
},


{
nombre:"Pachuca",
logo:"images/pachuca.png"
},


{
nombre:"Pumas",
logo:"images/pumas.png"
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

estadio:"Ciudad de los Deportes",


prediccion:"América gana o empate",

confianza:"80%",


probabilidades:{

local:"55%",

empate:"25%",

visitante:"20%"

},


marcadores:[

"América 2-1 Toluca",

"América 1-0 Toluca",

"América 1-1 Toluca"

],


factor:"América tiene mayor volumen ofensivo y mejor localía."


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

"jugador_defensa"

]

}


};
// =======================
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
// ESTADISTICAS POR POSICION
// =======================


function generarEstadisticasJugador(j){



if(j.posicion==="Portero"){


return `


<h3>Estadísticas de portero 🧤</h3>


<div class="player-stats">


<div>

Partidos

<b>${j.estadisticas.partidos}</b>

</div>


<div>

Minutos

<b>${j.estadisticas.minutos}</b>

</div>


<div>

Atajadas

<b>${j.estadisticas.atajadas}</b>

</div>


<div>

% Atajadas

<b>${j.estadisticas.porcentajeAtajadas}%</b>

</div>


<div>

Goles recibidos

<b>${j.estadisticas.golesRecibidos}</b>

</div>


<div>

Porterías a cero

<b>${j.estadisticas.porteriasCero}</b>

</div>


<div>

Penales atajados

<b>${j.estadisticas.penalesAtajados}</b>

</div>


<div>

Pases

<b>${j.estadisticas.pases}%</b>

</div>


</div>



<h3>Ranking Liga MX</h3>


<p>#${j.ranking.porterias} en porterías a cero</p>

<p>#${j.ranking.atajadas} en atajadas</p>


`;

}





if(j.posicion==="Defensa"){


return `


<h3>Estadísticas de defensa 🛡️</h3>


<div class="player-stats">


<div>

Entradas

<b>${j.estadisticas.entradas}</b>

</div>


<div>

Intercepciones

<b>${j.estadisticas.intercepciones}</b>

</div>


<div>

Despejes

<b>${j.estadisticas.despejes}</b>

</div>


<div>

Duelos ganados

<b>${j.estadisticas.duelosGanados}%</b>

</div>


<div>

Pases

<b>${j.estadisticas.pases}%</b>

</div>


<div>

Recuperaciones

<b>${j.estadisticas.recuperaciones}</b>

</div>


</div>



`;

}





if(j.posicion==="Mediocampista"){


return `


<h3>Estadísticas de mediocampista ⚽</h3>



<div class="player-stats">


<div>

Goles

<b>${j.estadisticas.goles}</b>

</div>


<div>

Asistencias

<b>${j.estadisticas.asistencias}</b>

</div>


<div>

Pases

<b>${j.estadisticas.pases}%</b>

</div>


<div>

Pases clave

<b>${j.estadisticas.pasesClave}</b>

</div>


<div>

Creación

<b>${j.estadisticas.ocasionesCreadas}</b>

</div>


<div>

Regates

<b>${j.estadisticas.regates}%</b>

</div>


</div>



`;

}





return `


<h3>Estadísticas de delantero 🔥</h3>


<div class="player-stats">


<div>

Goles

<b>${j.estadisticas.goles}</b>

</div>


<div>

Asistencias

<b>${j.estadisticas.asistencias}</b>

</div>


<div>

Tiros

<b>${j.estadisticas.tiros}</b>

</div>


<div>

Tiros a puerta

<b>${j.estadisticas.tirosPuerta}</b>

</div>


<div>

Conversión

<b>${j.estadisticas.conversion}%</b>

</div>


<div>

Regates

<b>${j.estadisticas.regates}%</b>

</div>


</div>



<h3>Ranking Liga MX</h3>


<p>#${j.ranking.goles} en goles</p>

<p>#${j.ranking.conversion} en conversión</p>

<p>#${j.ranking.regates} en regates</p>


`;

}








// =======================
// ALINEACIONES
// =======================


function mostrarAlineacion(id){


paginaAnterior="partidos";


let equipo="america";


let data=alineaciones[equipo];


let contenido=document.getElementById("contenido");



contenido.innerHTML=`


${botonRegresar()}



<div class="card">


<h2>Alineación ${data.formacion}</h2>



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



<h2>${j.valoracion}/10</h2>



${generarEstadisticasJugador(j)}



</div>



`;



popup.style.display="block";


}







function cerrarJugadorPopup(){


let popup=document.getElementById("player-popup");


if(popup){

popup.style.display="none";

}


}
// =======================
// HOME
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

Ver predicciones

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





<h3>Marcadores favoritos</h3>


${p.marcadores.map(m=>`

<p>${m}</p>

`).join("")}




<h3>Forma reciente</h3>


<p>${p.local}: G G G E G</p>


<p>${p.visitante}: G E G G</p>





<h3>Ataque</h3>


<p>${p.local}: Alto</p>


<p>${p.visitante}: Bueno</p>





<h3>Defensa</h3>


<p>${p.local}: Media</p>


<p>${p.visitante}: Buena</p>





<h3>Goles recibidos</h3>


<p>${p.local}: 8 goles</p>


<p>${p.visitante}: 10 goles</p>





<h3>Factor clave</h3>


<p>${p.factor}</p>



</div>



`;

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


<h4>${p.prediccion}</h4>


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


<h3>Equipos y notificaciones</h3>



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

"Notificaciones apagadas"

}


</div>



<button onclick="cambiarNotificacion('${e.nombre}')">


${
notificaciones.includes(e.nombre)

?

"Quitar"

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
// ESTADISTICAS GENERALES
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


<p>Jugador América - 5 asistencias</p>


</div>




<div class="card">


<h3>Tarjetas amarillas</h3>


<p>Jugador - 5 amarillas</p>


</div>




<div class="card">


<h3>Tarjetas rojas</h3>


<p>Jugador - 1 roja</p>


</div>




<div class="card">


<h3>Porterías a cero</h3>


<p>Malagón - 4</p>


</div>



`;

}







// =======================
// NAVEGACION
// =======================


function mostrarSeccion(seccion){


if(seccion==="inicio"){

cargarInicio();

}



if(seccion==="partidos"){

cargarPartidos();

}



if(seccion==="predicciones"){

cargarPredicciones();

}



if(seccion==="perfil"){

cargarPerfil();

}



if(seccion==="estadisticas"){

cargarEstadisticas();

}



}





cargarInicio();
