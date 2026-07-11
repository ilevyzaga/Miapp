// ==================================
// MATCHIQ MX
// SCRIPT NUEVO 1/3
// BASE DE DATOS
// ==================================


let notificaciones =
JSON.parse(localStorage.getItem("notificaciones")) || [];


let paginaAnterior = "inicio";




// ==================================
// EQUIPOS LIGA MX
// ==================================


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




// ==================================
// EQUIPOS EXTRA
// ==================================


const equiposExtra=[

{
nombre:"Atlante",
logo:"images/atlante.png"
}

];





// ==================================
// JUGADORES
// ==================================


const jugadores=[


// PORTERO

{

id:"malagon",

nombre:"Luis Malagón",

equipo:"América",

posicion:"Portero",

numero:1,

foto:"images/malagon.png",


valoracion:8.7,


stats:{

partidos:10,

minutos:900,

atajadas:32,

porcentajeAtajadas:78,

golesRecibidos:8,

porteriasCero:4,

penalesAtajados:1,

pases:82

}


},




// DELANTERO

{

id:"henry",

nombre:"Henry Martín",

equipo:"América",

posicion:"Delantero",

numero:21,

foto:"images/henry.png",


valoracion:9.1,


stats:{

partidos:11,

minutos:850,

goles:7,

asistencias:3,

tiros:72,

tirosPuerta:45,

conversion:22,

regates:63,

pases:86

}


},





// MEDIOCAMPISTA

{

id:"fidalgo",

nombre:"Álvaro Fidalgo",

equipo:"América",

posicion:"Mediocampista",

numero:8,

foto:"images/fidalgo.png",


valoracion:8.8,


stats:{

partidos:12,

minutos:920,

goles:2,

asistencias:5,

pases:91,

pasesClave:34,

ocasionesCreadas:29,

regates:78

}


},






// DEFENSA

{

id:"orozco",

nombre:"Jesús Orozco",

equipo:"Chivas",

posicion:"Defensa",

numero:4,

foto:"images/orozco.png",


valoracion:8.3,


stats:{

partidos:11,

minutos:990,

entradas:36,

intercepciones:42,

despejes:55,

duelosGanados:74,

pases:88

}


}



];









// ==================================
// PARTIDOS
// ==================================


const partidos=[


{

id:"america-toluca",

local:"América",

logoLocal:"images/america.png",

visitante:"Toluca",

logoVisitante:"images/toluca.png",

hora:"20:00",

estadio:"Ciudad de los Deportes",



probabilidades:{


local:55,

empate:25,

visitante:20


},



prediccion:"América gana o empate",


confianza:80,




marcadores:[

"2-1",

"1-0",

"1-1"

],



ataque:{


local:"Alto",

visitante:"Bueno"


},




defensa:{


local:"Media",

visitante:"Buena"


},




golesRecibidos:{


local:8,

visitante:10


},




forma:{


local:"G-G-G-E-G",

visitante:"G-E-G-G-P"


},




factorClave:

"América genera más ocasiones y Toluca suele recibir goles fuera de casa."


},







{

id:"tigres-chivas",


local:"Tigres",

logoLocal:"images/tigres.png",


visitante:"Chivas",

logoVisitante:"images/chivas.png",


hora:"21:00",

estadio:"Universitario",



probabilidades:{


local:50,

empate:30,

visitante:20


},



prediccion:"Tigres gana",


confianza:75,



marcadores:[

"2-0",

"2-1"

],


ataque:{

local:"Muy alto",

visitante:"Medio"

},


defensa:{

local:"Buena",

visitante:"Media"

},


golesRecibidos:{

local:7,

visitante:12

},


forma:{

local:"G-G-E-G-G",

visitante:"E-P-G-E-P"

},


factorClave:

"Tigres aumenta mucho su rendimiento como local."

}


];
// ==================================
// MATCHIQ MX
// SCRIPT NUEVO 2/3
// FUNCIONES
// ==================================




// ==================================
// BUSCAR DATOS
// ==================================


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







// ==================================
// LOGOS
// ==================================


function logoEquipo(src,tamaño){


return `

<img src="${src}" class="logo-${tamaño}">

`;

}








// ==================================
// BARRA DE PROBABILIDAD
// ==================================


function barraProbabilidad(nombre,valor,clase){


return `


<div class="prob-row">


<div class="prob-title">

${nombre}

<span>${valor}%</span>

</div>



<div class="prob-bar">


<div class="prob-fill ${clase}"

style="width:${valor}%">

</div>


</div>



</div>


`;

}









// ==================================
// ANALISIS COMPLETO
// ==================================


function mostrarAnalisis(id){


paginaAnterior="partidos";


let p=buscarPartido(id);



let contenido=document.getElementById("contenido");



contenido.innerHTML=`



<button onclick="mostrarSeccion('partidos')">

← Regresar

</button>




<div class="card">



<div class="match-header">



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






<h3>Predicción MatchIQ</h3>


<p>${p.prediccion}</p>


<p>

Confianza:

${p.confianza}%

</p>






<h3>Probabilidades</h3>



${barraProbabilidad(

p.local,

p.probabilidades.local,

"local"

)}



${barraProbabilidad(

"Empate",

p.probabilidades.empate,

"draw"

)}



${barraProbabilidad(

p.visitante,

p.probabilidades.visitante,

"away"

)}





<h3>Marcadores favoritos</h3>


${p.marcadores.map(m=>`

<p>⚽ ${m}</p>

`).join("")}





<h3>Forma reciente</h3>



<div class="form-box">


<p>

${p.local}

${p.forma.local}

</p>



<p>

${p.visitante}

${p.forma.visitante}

</p>


</div>






<h3>Ataque</h3>


<p>

${p.local}: ${p.ataque.local}

</p>


<p>

${p.visitante}: ${p.ataque.visitante}

</p>







<h3>Defensa</h3>


<p>

${p.local}: ${p.defensa.local}

</p>


<p>

${p.visitante}: ${p.defensa.visitante}

</p>






<h3>Goles recibidos</h3>


<p>

${p.local}: ${p.golesRecibidos.local}

goles recibidos

</p>



<p>

${p.visitante}: ${p.golesRecibidos.visitante}

goles recibidos

</p>







<h3>Factor clave</h3>


<p>${p.factorClave}</p>





</div>



`;

}










// ==================================
// ALINEACIONES
// ==================================


const alineaciones={


america:{


formacion:"4-2-3-1",


titulares:[

"malagon",

"fidalgo",

"henry"

],


suplentes:[

]

}



};







function mostrarAlineacion(){


let contenido=document.getElementById("contenido");


let equipo=alineaciones.america;



contenido.innerHTML=`



<button onclick="mostrarSeccion('inicio')">

← Regresar

</button>





<div class="card">


<h2>Alineación ${equipo.formacion}</h2>



<h3>Titulares</h3>



${equipo.titulares.map(id=>{


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



</div>



`;

}









// ==================================
// POPUP JUGADOR
// ==================================


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

onclick="cerrarJugador()">

</div>




<div class="player-modal">


<button onclick="cerrarJugador()">

✕

</button>



<img src="${j.foto}" class="player-photo">



<h2>${j.nombre}</h2>


<p>${j.equipo}</p>


<p>${j.posicion} #${j.numero}</p>



<h2>${j.valoracion}/10</h2>



${generarStats(j)}



</div>



`;



popup.style.display="block";


}








function cerrarJugador(){


let p=document.getElementById("player-popup");


if(p)

p.style.display="none";


}









// ==================================
// STATS POR POSICION
// ==================================


function generarStats(j){



let s=j.stats;



if(j.posicion==="Portero"){


return `


<h3>Estadísticas de portero 🧤</h3>


<p>Partidos: ${s.partidos}</p>

<p>Atajadas: ${s.atajadas}</p>

<p>% Atajadas: ${s.porcentajeAtajadas}%</p>

<p>Goles recibidos: ${s.golesRecibidos}</p>

<p>Porterías a cero: ${s.porteriasCero}</p>

<p>Penales atajados: ${s.penalesAtajados}</p>



`;

}





if(j.posicion==="Defensa"){


return `


<h3>Estadísticas defensa 🛡️</h3>


<p>Entradas: ${s.entradas}</p>

<p>Intercepciones: ${s.intercepciones}</p>

<p>Despejes: ${s.despejes}</p>

<p>Duelos ganados: ${s.duelosGanados}%</p>


`;

}





if(j.posicion==="Mediocampista"){


return `


<h3>Estadísticas mediocampo ⚽</h3>


<p>Pases: ${s.pases}%</p>

<p>Asistencias: ${s.asistencias}</p>

<p>Pases clave: ${s.pasesClave}</p>

<p>Regates: ${s.regates}%</p>


`;

}





return `


<h3>Estadísticas delantero 🔥</h3>


<p>Goles: ${s.goles}</p>

<p>Asistencias: ${s.asistencias}</p>

<p>Tiros: ${s.tiros}</p>

<p>Conversión: ${s.conversion}%</p>


`;

}
// ==================================
// MATCHIQ MX
// SCRIPT NUEVO 3/3
// NAVEGACION Y PANTALLAS
// ==================================





// ==================================
// HOME
// ==================================


function cargarInicio(){


paginaAnterior="inicio";


let contenido=document.getElementById("contenido");


let p=partidos[0];



contenido.innerHTML=`


<h2>Inicio</h2>




<div class="card">


<h3>Partido destacado</h3>




<div class="match-header">



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




<p>

🕒 ${p.hora}

</p>



<p>

🏟️ ${p.estadio}

</p>





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


<p>

Confianza ${p.confianza}%

</p>



<button onclick="cargarPredicciones()">

Ver predicciones

</button>


</div>



`;

}









// ==================================
// PARTIDOS
// ==================================


function cargarPartidos(){


paginaAnterior="inicio";


let contenido=document.getElementById("contenido");



contenido.innerHTML=`


<h2>Partidos</h2>



${partidos.map(p=>`


<div class="card match-card">



<div class="match-header">



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





<p>

🕒 ${p.hora}

</p>




<button onclick="mostrarAnalisis('${p.id}')">

Ver análisis

</button>




<button onclick="mostrarAlineacion()">

Alineaciones

</button>



</div>



`).join("")}



`;

}








// ==================================
// PREDICCIONES
// ==================================


function cargarPredicciones(){


let contenido=document.getElementById("contenido");



contenido.innerHTML=`


<h2>Predicciones</h2>




${partidos.map(p=>`


<div class="card">


<div class="match-header">


<div>

${logoEquipo(p.logoLocal,"small")}

${p.local}

</div>



VS



<div>

${logoEquipo(p.logoVisitante,"small")}

${p.visitante}

</div>



</div>





<h3>${p.prediccion}</h3>


<p>

Confianza:

${p.confianza}%

</p>



${barraProbabilidad(

p.local,

p.probabilidades.local,

"local"

)}



${barraProbabilidad(

"Empate",

p.probabilidades.empate,

"draw"

)}



${barraProbabilidad(

p.visitante,

p.probabilidades.visitante,

"away"

)}



</div>



`).join("")}



`;

}








// ==================================
// ESTADISTICAS GENERALES
// ==================================


function cargarEstadisticas(){



let contenido=document.getElementById("contenido");



contenido.innerHTML=`



<h2>Estadísticas Liga MX</h2>





<div class="card">


<h3>⚽ Goleadores</h3>


<p>

Henry Martín - América

<br>

7 goles

</p>


<p>

André-Pierre Gignac - Tigres

<br>

6 goles

</p>


</div>






<div class="card">


<h3>🎯 Asistencias</h3>


<p>

Álvaro Fidalgo - América

<br>

5 asistencias

</p>


</div>






<div class="card">


<h3>🟨 Tarjetas amarillas</h3>


<p>

Jesús Orozco - Chivas

<br>

5 tarjetas

</p>


<p>

Jugador Tigres

<br>

4 tarjetas

</p>


</div>







<div class="card">


<h3>🟥 Tarjetas rojas</h3>


<p>

Jugador León

<br>

1 tarjeta

</p>


</div>






<div class="card">


<h3>🧤 Porteros</h3>


<p>

Luis Malagón - América

<br>

4 porterías a cero

</p>


</div>



`;

}









// ==================================
// PERFIL
// ==================================


function cargarPerfil(){



let contenido=document.getElementById("contenido");



contenido.innerHTML=`


<h2>Perfil</h2>




<div class="card">


<h3>Isaac</h3>


<p>

Selecciona equipos para recibir notificaciones

</p>


</div>





${equipos.map(e=>`



<div class="card team-follow">



${logoEquipo(e.logo,"small")}



<strong>

${e.nombre}

</strong>





<button onclick="cambiarNotificacion('${e.nombre}')">


${

notificaciones.includes(e.nombre)

?

"🔔"

:

"🔕"

}


</button>



</div>




`).join("")}



`;

}








function cambiarNotificacion(nombre){



if(notificaciones.includes(nombre)){


notificaciones=

notificaciones.filter(

x=>x!==nombre

);


}

else{


notificaciones.push(nombre);


}



localStorage.setItem(

"notificaciones",

JSON.stringify(notificaciones)

);



cargarPerfil();



}









// ==================================
// NAVEGACION
// ==================================


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








// ==================================
// LOGO LIGA MX
// ==================================


document.addEventListener(

"click",

function(e){


if(e.target.classList.contains("liga-logo")){


cargarInicio();


}


}

);







// INICIO APP


cargarInicio();
