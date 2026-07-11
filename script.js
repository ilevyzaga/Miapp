// ==================================
// MATCHIQ MX
// SCRIPT COMPLETO NUEVO
// PARTE 1/3
// ==================================


let notificaciones =
JSON.parse(localStorage.getItem("notificaciones")) || [];



// ==================================
// EQUIPOS
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
// JUGADORES
// ==================================


const jugadores=[


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

atajas:32,

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

valoracion:9.1,


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

valoracion:8.8,


stats:{

partidos:12,

goles:2,

asistencias:5,

pases:91,

pasesClave:34,

regates:78

}

},






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

entradas:36,

intercepciones:42,

despejes:55,

duelosGanados:74

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

local:"Muy alto",

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


factorClave:

"América genera más ocasiones de gol."

}



];
// ==================================
// MATCHIQ MX
// SCRIPT COMPLETO NUEVO
// PARTE 2/3
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


function logoEquipo(url,tamaño="small"){

return `

<img src="${url}" class="logo-${tamaño}">

`;

}





// ==================================
// BARRAS DE PROBABILIDAD
// ==================================


function barraProbabilidad(nombre,valor,tipo){


return `


<div class="prob-row">


<div class="prob-text">

<span>${nombre}</span>

<b>${valor}%</b>

</div>



<div class="prob-background">


<div 

class="prob-fill ${tipo}"

style="width:${valor}%">

</div>


</div>


</div>


`;

}







// ==================================
// HOME
// ==================================


function cargarInicio(){



let contenido=document.getElementById("contenido");


let p=partidos[0];



contenido.innerHTML=`


<h2>Inicio</h2>




<div class="card">


<h3>Partido destacado</h3>




<div class="match-header">



<div>

${logoEquipo(p.logoLocal,"medium")}

<strong>${p.local}</strong>


</div>



<h2>VS</h2>




<div>

${logoEquipo(p.logoVisitante,"medium")}

<strong>${p.visitante}</strong>


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


<h3>Predicción MatchIQ</h3>


<p>${p.prediccion}</p>


<p>

Confianza ${p.confianza}%

</p>



</div>



`;

}









// ==================================
// PARTIDOS
// ==================================


function cargarPartidos(){



let contenido=document.getElementById("contenido");



contenido.innerHTML=`


<h2>Partidos</h2>



${partidos.map(p=>`



<div class="card">



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




</div>



`).join("")}



`;

}








// ==================================
// ANALISIS
// ==================================


function mostrarAnalisis(id){


let p=buscarPartido(id);



let contenido=document.getElementById("contenido");



contenido.innerHTML=`



<button onclick="cargarPartidos()">

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






<h3>Predicción</h3>


<p>${p.prediccion}</p>


<p>

Confianza: ${p.confianza}%

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

"empate"

)}



${barraProbabilidad(

p.visitante,

p.probabilidades.visitante,

"visitante"

)}





<h3>Marcadores favoritos</h3>


${p.marcadores.map(m=>`

<p>⚽ ${m}</p>

`).join("")}






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

</p>



<p>

${p.visitante}: ${p.golesRecibidos.visitante}

</p>






<h3>Factor clave</h3>


<p>

${p.factorClave}

</p>




</div>



`;

}









// ==================================
// ALINEACIONES
// ==================================


const alineaciones={


america:[

"malagon",

"fidalgo",

"henry"

]


};





function mostrarAlineacion(){


let contenido=document.getElementById("contenido");


contenido.innerHTML=`


<button onclick="cargarInicio()">

← Regresar

</button>



<div class="card">


<h2>Alineación América</h2>



${alineaciones.america.map(id=>{


let j=buscarJugador(id);



return `


<div class="player-card"

onclick="mostrarJugador('${j.id}')">


<img src="${j.foto}">


<div>


<strong>${j.nombre}</strong>


<p>${j.posicion}</p>


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



popup.innerHTML=`



<div class="popup-background"

onclick="cerrarJugador()">

</div>




<div class="player-modal">



<button onclick="cerrarJugador()">

X

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


document.getElementById("player-popup")

.style.display="none";


}





// ==================================
// STATS INDIVIDUALES
// ==================================


function generarStats(j){


let s=j.stats;



if(j.posicion==="Portero"){


return `


<h3>Portero 🧤</h3>


<p>Atajadas: ${s.atajas}</p>

<p>% Atajadas: ${s.porcentajeAtajadas}%</p>

<p>Goles recibidos: ${s.golesRecibidos}</p>

<p>Porterías a cero: ${s.porteriasCero}</p>


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


<p>Goles: ${s.goles}</p>

<p>Asistencias: ${s.asistencias}</p>

<p>Pases: ${s.pases}%</p>

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
// ==================================
// MATCHIQ MX
// SCRIPT COMPLETO NUEVO
// PARTE 3/3
// ==================================






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

<p>${p.local}</p>

</div>




<h3>VS</h3>




<div>

${logoEquipo(p.logoVisitante,"small")}

<p>${p.visitante}</p>

</div>



</div>





<h3>

${p.prediccion}

</h3>



<p>

Confianza: ${p.confianza}%

</p>






${barraProbabilidad(

p.local,

p.probabilidades.local,

"local"

)}




${barraProbabilidad(

"Empate",

p.probabilidades.empate,

"empate"

)}





${barraProbabilidad(

p.visitante,

p.probabilidades.visitante,

"visitante"

)}




</div>



`).join("")}



`;

}









// ==================================
// STATS GENERALES
// ==================================


function cargarEstadisticas(){



let contenido=document.getElementById("contenido");



contenido.innerHTML=`



<h2>Stats Liga MX</h2>





<div class="card">


<h3>⚽ Goleadores</h3>



<p>

1. Henry Martín

<br>

7 goles

</p>



<p>

2. André-Pierre Gignac

<br>

6 goles

</p>


</div>








<div class="card">


<h3>🎯 Asistencias</h3>


<p>

1. Álvaro Fidalgo

<br>

5 asistencias

</p>


</div>







<div class="card">


<h3>🟨 Tarjetas amarillas</h3>


<p>

Jesús Orozco

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

Luis Malagón

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

Equipos para recibir notificaciones

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


notificaciones =

notificaciones.filter(

equipo=>equipo!==nombre

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


function volverInicio(){


cargarInicio();


}





document.addEventListener(

"DOMContentLoaded",

()=>{


let logo=document.querySelector(".liga-logo");



if(logo){


logo.onclick=volverInicio;


}



cargarInicio();



}

);
