// =============================
// MATCHIQ MX - SCRIPT
// PARTE 1/2
// =============================


let equiposSeguidos = JSON.parse(localStorage.getItem("equiposSeguidos")) || [];

let notificaciones = JSON.parse(localStorage.getItem("notificaciones")) || [];

let paginaAnterior = "inicio";




// =============================
// EQUIPOS LIGA MX
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
},

{
nombre:"Guadalajara",
logo:"images/chivas.png"
}

];







// =============================
// JUGADORES EJEMPLO
// DESPUÉS SERÁ API
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


estadisticas:{

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



{

id:"henry",

nombre:"Henry Martín",

equipo:"América",

posicion:"Delantero",

numero:21,

foto:"images/henry.png",

valoracion:9.0,


estadisticas:{

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



{

id:"jugadormedio",

nombre:"Jugador Mediocampista",

equipo:"América",

posicion:"Mediocampista",

numero:8,

foto:"images/player.png",

valoracion:8.4,


estadisticas:{

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



{

id:"defensa",

nombre:"Jesús Orozco",

equipo:"Chivas",

posicion:"Defensa",

numero:4,

foto:"images/orozco.png",

valoracion:8.2,


estadisticas:{

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







// =============================
// PARTIDOS
// =============================


const partidos = [


{

id:"partido1",

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


ataqueLocal:"Alto",

ataqueVisitante:"Bueno",

defensaLocal:"Media",

defensaVisitante:"Buena",


golesRecibidosLocal:8,

golesRecibidosVisitante:10,


factorClave:"América genera más ocasiones y tiene ventaja como local."


},




{

id:"partido2",

local:"Tigres",

visitante:"Chivas",

logoLocal:"images/tigres.png",

logoVisitante:"images/chivas.png",

hora:"21:00",

estadio:"Universitario",


prediccion:"Tigres gana",

confianza:"75%",


probabilidades:{

local:"50%",

empate:"30%",

visitante:"20%"

},


marcadores:[

"Tigres 2-0 Chivas",

"Tigres 2-1 Chivas"

],


ataqueLocal:"Muy alto",

ataqueVisitante:"Medio",


defensaLocal:"Buena",

defensaVisitante:"Media",


golesRecibidosLocal:7,

golesRecibidosVisitante:12,


factorClave:"Tigres tiene mayor dominio ofensivo."


},




{

id:"partido3",

local:"Cruz Azul",

visitante:"Monterrey",

logoLocal:"images/cruzazul.png",

logoVisitante:"images/monterrey.png",

hora:"19:00",

estadio:"Ciudad de los Deportes",


prediccion:"Partido cerrado",

confianza:"65%",


probabilidades:{

local:"35%",

empate:"35%",

visitante:"30%"

},


marcadores:[

"1-1",

"1-0",

"0-1"

],


ataqueLocal:"Bueno",

ataqueVisitante:"Bueno",

defensaLocal:"Buena",

defensaVisitante:"Buena",


golesRecibidosLocal:9,

golesRecibidosVisitante:9,


factorClave:"Dos equipos muy equilibrados."


}


];
// =============================
// MATCHIQ MX - SCRIPT
// PARTE 2/2
// =============================



// =============================
// UTILIDADES
// =============================


function guardarDatos(){

localStorage.setItem(
"notificaciones",
JSON.stringify(notificaciones)
);

localStorage.setItem(
"equiposSeguidos",
JSON.stringify(equiposSeguidos)
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





// =============================
// LOGO LIGA MX
// =============================


function clickLogoLiga(){

cargarInicio();

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


<div class="card">


<h3>Partido destacado</h3>


<div class="teams">


<div>

<img src="${p.logoLocal}">

<p>${p.local}</p>

</div>


<h2>VS</h2>


<div>

<img src="${p.logoVisitante}">

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


<div class="card">


<h3>

${p.local} vs ${p.visitante}

</h3>



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


<button onclick="mostrarSeccion('${paginaAnterior}')">

← Regresar

</button>



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


${p.marcadores.map(x=>`

<p>${x}</p>

`).join("")}




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

<p>${p.factorClave}</p>




</div>



`;

}









// =============================
// POPUP JUGADOR
// =============================


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



<img src="${j.foto}">


<h2>${j.nombre}</h2>


<p>${j.equipo}</p>


<p>${j.posicion} #${j.numero}</p>



<h2>${j.valoracion}/10</h2>



${estadisticasJugador(j)}



</div>



`;



popup.style.display="block";


}





function cerrarJugador(){


document.getElementById("player-popup").style.display="none";


}









function estadisticasJugador(j){


let s=j.estadisticas;



if(j.posicion==="Portero"){


return `

<h3>Portero 🧤</h3>

<p>Atajadas: ${s.atajadas}</p>

<p>% Atajadas: ${s.porcentajeAtajadas}%</p>

<p>Goles recibidos: ${s.golesRecibidos}</p>

<p>Porterías a cero: ${s.porteriasCero}</p>

<p>Penales atajados: ${s.penalesAtajados}</p>

`;

}




if(j.posicion==="Defensa"){


return `

<h3>Defensa 🛡️</h3>

<p>Entradas: ${s.entradas}</p>

<p>Intercepciones: ${s.intercepciones}</p>

<p>Despejes: ${s.despejes}</p>

<p>Duelos ganados: ${s.duelosGanados}%</p>

`;

}




if(j.posicion==="Mediocampista"){


return `

<h3>Mediocampista ⚽</h3>

<p>Asistencias: ${s.asistencias}</p>

<p>Pases: ${s.pases}%</p>

<p>Pases clave: ${s.pasesClave}</p>

<p>Regates: ${s.regates}%</p>

`;

}




return `

<h3>Delantero 🔥</h3>

<p>Goles: ${s.goles}</p>

<p>Asistencias: ${s.asistencias}</p>

<p>Tiros: ${s.tiros}</p>

<p>Conversión: ${s.conversion}%</p>

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


<h3>${p.local} vs ${p.visitante}</h3>


<p>${p.prediccion}</p>


<p>Confianza ${p.confianza}</p>


</div>



`).join("")}



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


<p>Equipos seguidos</p>


</div>




${equipos.map(e=>`


<div class="card">


<img src="${e.logo}" width="40">


${e.nombre}



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







// =============================
// NAVEGACION
// =============================


function mostrarSeccion(seccion){


if(seccion==="inicio")

cargarInicio();


if(seccion==="partidos")

cargarPartidos();


if(seccion==="predicciones")

cargarPredicciones();


if(seccion==="perfil")

cargarPerfil();


}




cargarInicio();
