// =============================
// MATCHIQ MX
// SCRIPT NUEVO PARTE 1/3
// =============================


let notificaciones = 
JSON.parse(localStorage.getItem("notificaciones")) || [];

let paginaAnterior = "inicio";




// =============================
// EQUIPOS
// =============================


const equipos = [


{
nombre:"América",
logo:"images/america.png"
},


{
nombre:"Atlas",
logo:"images/atlas.png"
},


{
nombre:"Atlante",
logo:"images/atlante.png"
},


{
nombre:"Atlético San Luis",
logo:"images/atleticosanluis.png"
},


{
nombre:"Cruz Azul",
logo:"images/cruzazul.png"
},


{
nombre:"Chivas",
logo:"images/chivas.png"
},


{
nombre:"FC Juárez",
logo:"images/juarez.png"
},


{
nombre:"León",
logo:"images/leon.png"
},


{
nombre:"Mazatlán",
logo:"images/mazatlan.png"
},


{
nombre:"Monterrey",
logo:"images/monterrey.png"
},


{
nombre:"Necaxa",
logo:"images/necaxa.png"
},


{
nombre:"Pachuca",
logo:"images/pachuca.png"
},


{
nombre:"Puebla",
logo:"images/puebla.png"
},


{
nombre:"Pumas",
logo:"images/pumas.png"
},


{
nombre:"Querétaro",
logo:"images/queretaro.png"
},


{
nombre:"Santos Laguna",
logo:"images/santos.png"
},


{
nombre:"Tigres",
logo:"images/tigres.png"
},


{
nombre:"Tijuana",
logo:"images/tijuana.png"
},


{
nombre:"Toluca",
logo:"images/toluca.png"
}


];








// =============================
// JUGADORES
// =============================


const jugadores = [


{

id:"malagon",

nombre:"Luis Malagón",

equipo:"América",

posicion:"Portero",

numero:1,

foto:"images/malagon.png",

valoracion:8.6,


stats:{

partidos:10,

minutos:900,

atajadas:32,

porcentajeAtajadas:78,

golesRecibidos:8,

porteriasCero:4,

penalesAtajados:1

}

},




{

id:"henry",

nombre:"Henry Martín",

equipo:"América",

posicion:"Delantero",

numero:21,

foto:"images/henry.png",

valoracion:9,


stats:{

partidos:11,

goles:7,

asistencias:3,

tiros:72,

conversion:22,

regates:63

}

},




{

id:"fidalgo",

nombre:"Álvaro Fidalgo",

equipo:"América",

posicion:"Mediocampista",

numero:8,

foto:"images/fidalgo.png",

valoracion:8.7,


stats:{

partidos:12,

asistencias:5,

pases:91,

pasesClave:34,

regates:78,

ocasionesCreadas:29

}

},




{

id:"orozco",

nombre:"Jesús Orozco",

equipo:"Chivas",

posicion:"Defensa",

numero:4,

foto:"images/orozco.png",

valoracion:8.2,


stats:{

partidos:11,

entradas:36,

intercepciones:42,

despejes:55,

duelosGanados:74

}

}



];







// =============================
// PARTIDOS
// =============================


const partidos=[


{

id:"america-toluca",

local:"América",

logoLocal:"images/america.png",

visitante:"Toluca",

logoVisitante:"images/toluca.png",

hora:"20:00",

estadio:"Ciudad de los Deportes",

prediccion:"América gana o empate",

confianza:"80%",


marcadores:[

"2-1",

"1-0",

"1-1"

],


factor:"América tiene mayor generación ofensiva."

},




{

id:"tigres-chivas",

local:"Tigres",

logoLocal:"images/tigres.png",

visitante:"Chivas",

logoVisitante:"images/chivas.png",

hora:"21:00",

estadio:"Universitario",

prediccion:"Tigres gana",

confianza:"75%",


marcadores:[

"2-0",

"2-1"

],


factor:"Tigres domina como local."

},




{

id:"cruzazul-monterrey",

local:"Cruz Azul",

logoLocal:"images/cruzazul.png",

visitante:"Monterrey",

logoVisitante:"images/monterrey.png",

hora:"19:00",

estadio:"Ciudad de los Deportes",

prediccion:"Partido cerrado",

confianza:"65%",


marcadores:[

"1-1",

"1-0"

],


factor:"Dos equipos equilibrados."

}


];
// =============================
// MATCHIQ MX
// SCRIPT NUEVO PARTE 2/3
// =============================



// =============================
// FUNCIONES
// =============================


function guardarDatos(){

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



function logoEquipo(url,tamaño="small"){

return `

<img 
src="${url}" 
class="team-logo-${tamaño}"
>

`;

}






// =============================
// HOME
// =============================


function cargarInicio(){


paginaAnterior="inicio";


let contenido=document.getElementById("contenido");


let p=partidos[0];


contenido.innerHTML=`

<h2>Inicio</h2>



<div class="card featured-match">


<h3>Partido destacado</h3>



<div class="match-teams">


<div class="team-box">


${logoEquipo(p.logoLocal,"medium")}


<p>${p.local}</p>


</div>



<h2>VS</h2>




<div class="team-box">


${logoEquipo(p.logoVisitante,"medium")}


<p>${p.visitante}</p>


</div>



</div>




<p>${p.hora}</p>

<p>${p.estadio}</p>




<button onclick="mostrarAnalisis('${p.id}')">

Ver análisis

</button>



<button onclick="mostrarAlineacion()">

Alineaciones

</button>



</div>





<div class="card">


<h3>Predicción</h3>


<p>${p.prediccion}</p>


<p>Confianza ${p.confianza}</p>



<button onclick="cargarPredicciones()">

Ver predicciones

</button>


</div>



`;

}








// =============================
// PARTIDOS
// =============================


function cargarPartidos(){


paginaAnterior="inicio";


let contenido=document.getElementById("contenido");



contenido.innerHTML=`


<h2>Partidos</h2>



${partidos.map(p=>`


<div class="card match-card">



<div class="match-teams-small">



<div>

${logoEquipo(p.logoLocal,"small")}

<p>${p.local}</p>

</div>



<h3>VS</h3>



<div>

${logoEquipo(p.logoVisitante,"small")}

<p>${p.visitante}</p>

</div>



</div>



<p>${p.hora}</p>



<button onclick="mostrarAnalisis('${p.id}')">

Ver análisis

</button>



</div>



`).join("")}



`;

}








// =============================
// ANALISIS
// =============================


function mostrarAnalisis(id){


paginaAnterior="partidos";


let p=buscarPartido(id);


let contenido=document.getElementById("contenido");



contenido.innerHTML=`


<button onclick="mostrarSeccion('partidos')">

← Regresar

</button>




<div class="card">



<div class="match-teams">


<div>

${logoEquipo(p.logoLocal,"medium")}

<h3>${p.local}</h3>

</div>



<h2>VS</h2>



<div>

${logoEquipo(p.logoVisitante,"medium")}

<h3>${p.visitante}</h3>

</div>



</div>





<h3>Predicción</h3>


<p>${p.prediccion}</p>


<p>Confianza: ${p.confianza}</p>





<h3>Marcadores probables</h3>



${p.marcadores.map(m=>`

<p>${m}</p>

`).join("")}





<h3>Factor clave</h3>


<p>${p.factor}</p>



</div>



`;

}








// =============================
// PREDICCIONES
// =============================


function cargarPredicciones(){



let contenido=document.getElementById("contenido");



contenido.innerHTML=`


<h2>Predicciones</h2>



${partidos.map(p=>`


<div class="card">



<div class="match-teams-small">


${logoEquipo(p.logoLocal,"small")}

<b>${p.local}</b>



<h3>VS</h3>



${logoEquipo(p.logoVisitante,"small")}

<b>${p.visitante}</b>



</div>




<p>${p.prediccion}</p>


<p>

Confianza:

${p.confianza}

</p>



</div>



`).join("")}



`;

}








// =============================
// STATS
// =============================


function cargarEstadisticas(){


let contenido=document.getElementById("contenido");


contenido.innerHTML=`


<h2>Estadísticas Liga MX</h2>




<div class="card">


<h3>Goleadores</h3>



<p>Henry Martín - América ⚽ 7 goles</p>


<p>André-Pierre Gignac - Tigres ⚽ 6 goles</p>


</div>






<div class="card">


<h3>Asistencias</h3>



<p>Álvaro Fidalgo - América 🎯 5 asistencias</p>


<p>Jugador Tigres - 4 asistencias</p>



</div>






<div class="card">


<h3>Tarjetas amarillas</h3>



<p>Jesús Orozco - Chivas 🟨 5</p>


<p>Jugador Tigres 🟨 4</p>



</div>






<div class="card">


<h3>Tarjetas rojas</h3>



<p>Jugador León 🟥 1</p>


</div>




<div class="card">


<h3>Porteros</h3>



<p>Luis Malagón - América 🧤 4 porterías a cero</p>



</div>




`;

}
// =============================
// MATCHIQ MX
// SCRIPT NUEVO PARTE 3/3
// =============================




// =============================
// POPUP JUGADOR
// =============================


function mostrarJugador(id){


let jugador=buscarJugador(id);


let popup=document.getElementById("player-popup");



if(!popup){


popup=document.createElement("div");

popup.id="player-popup";

document.body.appendChild(popup);


}




popup.innerHTML=`


<div class="popup-background"

onclick="cerrarJugador()">

</div>





<div class="player-modal">



<button class="close-popup"

onclick="cerrarJugador()">

×

</button>



<img src="${jugador.foto}" class="player-image">



<h2>${jugador.nombre}</h2>


<p>${jugador.equipo}</p>


<p>${jugador.posicion} #${jugador.numero}</p>



<h2>${jugador.valoracion}/10</h2>



${mostrarStatsJugador(jugador)}



</div>



`;



popup.style.display="block";


}





function cerrarJugador(){


let popup=document.getElementById("player-popup");


if(popup){

popup.style.display="none";

}


}









// =============================
// STATS POR POSICION
// =============================


function mostrarStatsJugador(j){


let s=j.stats;




if(j.posicion==="Portero"){


return `


<h3>Portero 🧤</h3>


<div class="player-stats">


<p>Partidos: ${s.partidos}</p>


<p>Minutos: ${s.minutos}</p>


<p>Atajadas: ${s.atajadas}</p>


<p>% Atajadas: ${s.porcentajeAtajadas}%</p>


<p>Goles recibidos: ${s.golesRecibidos}</p>


<p>Porterías a cero: ${s.porteriasCero}</p>


<p>Penales atajados: ${s.penalesAtajados}</p>



</div>



`;

}




if(j.posicion==="Defensa"){


return `


<h3>Defensa 🛡️</h3>


<div class="player-stats">


<p>Entradas: ${s.entradas}</p>


<p>Intercepciones: ${s.intercepciones}</p>


<p>Despejes: ${s.despejes}</p>


<p>Duelos ganados: ${s.duelosGanados}%</p>



</div>



`;

}




if(j.posicion==="Mediocampista"){


return `


<h3>Mediocampista ⚽</h3>


<div class="player-stats">


<p>Asistencias: ${s.asistencias}</p>


<p>Pases completados: ${s.pases}%</p>


<p>Pases clave: ${s.pasesClave}</p>


<p>Regates: ${s.regates}%</p>


<p>Ocasiones creadas: ${s.ocasionesCreadas}</p>



</div>



`;

}




return `


<h3>Delantero 🔥</h3>


<div class="player-stats">


<p>Goles: ${s.goles}</p>


<p>Asistencias: ${s.asistencias}</p>


<p>Tiros: ${s.tiros}</p>


<p>Conversión: ${s.conversion}%</p>


<p>Regates: ${s.regates}%</p>



</div>



`;

}








// =============================
// PERFIL
// =============================


function cargarPerfil(){


let contenido=document.getElementById("contenido");



contenido.innerHTML=`


<h2>Perfil</h2>




<div class="card">


<h3>Isaac</h3>


<p>Equipos para recibir notificaciones</p>


</div>





${equipos.map(e=>`


<div class="card team-follow">



${logoEquipo(e.logo,"small")}



<strong>${e.nombre}</strong>




<button onclick="cambiarNotificacion('${e.nombre}')">


${

notificaciones.includes(e.nombre)

?

"🔔 Activado"

:

"🔕 Activar"

}



</button>



</div>



`).join("")}



`;

}




function cambiarNotificacion(nombre){


if(notificaciones.includes(nombre)){


notificaciones = notificaciones.filter(

x=>x!==nombre

);


}

else{


notificaciones.push(nombre);


}



guardarDatos();


cargarPerfil();


}









// =============================
// NAVEGACION
// =============================


function mostrarSeccion(seccion){


switch(seccion){


case "inicio":

cargarInicio();

break;



case "partidos":

cargarPartidos();

break;



case "predicciones":

cargarPredicciones();

break;



case "stats":

cargarEstadisticas();

break;



case "perfil":

cargarPerfil();

break;



}


}







// =============================
// LOGO LIGA MX
// =============================


function regresarInicioLogo(){


cargarInicio();


}







// CARGAR APP


cargarInicio();
