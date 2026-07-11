let equiposSeguidos = JSON.parse(localStorage.getItem("equiposSeguidos")) || [];

let paginaAnterior = "inicio";

let notificaciones = JSON.parse(localStorage.getItem("notificaciones")) || [];



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
tiros:72,
pases:86,
regates:63,
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
tiros:64,
pases:91,
regates:78,
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
minutos:900,
atajadas:78,
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
tiros:70,
pases:81,
regates:55,
duelos:60,
valoracion:8.8,
ranking:{
goles:5,
pases:15,
regates:22
}

}

];






const equipos = [

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

confianza:"80%",

resultadosFavoritos:[

"América 2 - 1 Toluca 32%",

"América 1 - 0 Toluca 24%",

"América 1 - 1 Toluca 18%"

],

formaLocal:"G G G E G",

formaVisitante:"G E G G",

ataqueLocal:"Alto",

ataqueVisitante:"Bueno",

defensaLocal:"Media",

defensaVisitante:"Buena",

golesRecibidosLocal:8,

golesRecibidosVisitante:10,

factor:"América tiene mejor rendimiento como local y mayor volumen ofensivo."

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

resultadosFavoritos:[

"Tigres 2 - 0 Chivas 30%",

"Tigres 2 - 1 Chivas 25%",

"Tigres 1 - 1 Chivas 20%"

],

formaLocal:"G G E G",

formaVisitante:"E G G E",

ataqueLocal:"Muy alto",

ataqueVisitante:"Medio",

defensaLocal:"Buena",

defensaVisitante:"Media",

golesRecibidosLocal:7,

golesRecibidosVisitante:12,

factor:"Tigres suele controlar más la posesión y generar más ocasiones."

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

resultadosFavoritos:[

"Cruz Azul 1 - 1 Monterrey 30%",

"Cruz Azul 1 - 0 Monterrey 22%",

"Cruz Azul 0 - 1 Monterrey 20%"

],

formaLocal:"G G E E",

formaVisitante:"G E G G",

ataqueLocal:"Bueno",

ataqueVisitante:"Bueno",

defensaLocal:"Buena",

defensaVisitante:"Buena",

golesRecibidosLocal:9,

golesRecibidosVisitante:9,

factor:"Dos equipos con niveles similares, partido cerrado."

}

];






const alineaciones = {


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


};
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




function botonRegresar(){

return `

<button class="back-button" onclick="mostrarSeccion('${paginaAnterior}')">

← Regresar

</button>

`;

}





function cambiarNotificaciones(nombre){


if(notificaciones.includes(nombre)){


notificaciones =
notificaciones.filter(
e=>e!==nombre
);


equiposSeguidos =
equiposSeguidos.filter(
e=>e!==nombre
);


}else{


notificaciones.push(nombre);


if(!equiposSeguidos.includes(nombre)){

equiposSeguidos.push(nombre);

}

}


guardarDatos();


mostrarSeccion("perfil");

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


<h3>Resumen de jornada</h3>


<p>Partidos próximos: 3</p>

<p>Predicciones actualizadas</p>

<p>Estadísticas de jugadores disponibles</p>


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




<h3>Resultados favoritos</h3>


${p.resultadosFavoritos.map(r=>`

<p>${r}</p>

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







function mostrarAlineacion(id){


paginaAnterior="partidos";


let equipo =
id==="america"
?
"america"
:
"tigres";


let alineacion =
alineaciones[equipo];



let contenido=document.getElementById("contenido");



contenido.innerHTML=`

${botonRegresar()}



<div class="card">


<h2>Alineación</h2>


<h3>${alineacion.formacion}</h3>



<h3>Titulares</h3>


${alineacion.titulares.map(id=>{


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


${alineacion.suplentes.map(id=>{


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

<p>${j.posicion} #${j.numero}</p>


<p>Edad: ${j.edad}</p>



<h3>Valoración MatchIQ</h3>


<h1>${j.valoracion}</h1>




<h3>Estadísticas</h3>


<p>Goles: ${j.goles || 0}</p>

<p>Asistencias: ${j.asistencias || 0}</p>

<p>Minutos: ${j.minutos}</p>


<h3>Porcentajes</h3>


<p>Pases completados: ${j.pases || 0}%</p>

<p>Regates: ${j.regates || 0}%</p>

<p>Tiros: ${j.tiros || 0}%</p>

<p>Duelos ganados: ${j.duelos || 0}%</p>




<h3>Ranking Liga MX</h3>


<p>Goles: #${j.ranking.goles || "-"}</p>

<p>Pases: #${j.ranking.pases || "-"}</p>

<p>Regates: #${j.ranking.regates || "-"}</p>



</div>


`;

}







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


<small>

${
notificaciones.includes(e.nombre)

?

"Notificaciones activadas"

:

"Activar notificaciones"

}


</small>


</div>



<button onclick="cambiarNotificaciones('${e.nombre}')">


${
notificaciones.includes(e.nombre)

?

"Activado"

:

"Activar"

}


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

${botonRegresar()}



<h2>Estadísticas</h2>



<div class="card">

<h3>Goleadores</h3>

<p>Henry Martín — 7 goles</p>

<p>Gignac — 6 goles</p>

<p>Berterame — 5 goles</p>

</div>



<div class="card">

<h3>Asistidores</h3>

<p>Fidalgo — 5 asistencias</p>

<p>Valdés — 4 asistencias</p>

</div>



<div class="card">

<h3>Tarjetas amarillas</h3>

<p>Fidalgo — 5</p>

<p>Erick Sánchez — 4</p>

</div>



<div class="card">

<h3>Tarjetas rojas</h3>

<p>Lichnovsky — 1</p>

</div>



<div class="card">

<h3>Porterías a cero</h3>

<p>Malagón — 4</p>

</div>



`;

}







function mostrarSeccion(seccion){


if(seccion==="inicio")
cargarInicio();


if(seccion==="partidos")
cargarPartidos();


if(seccion==="perfil")
cargarPerfil();


if(seccion==="estadisticas")
cargarEstadisticas();


if(seccion==="predicciones")
cargarPredicciones();


}



cargarInicio();
