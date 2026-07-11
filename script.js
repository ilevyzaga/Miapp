// =======================================
// MATCHIQ MX
// SCRIPT.JS CORREGIDO
// PARTE 1/4
// =======================================


// ===============================
// CONFIGURACIÓN
// ===============================


const API_URL = "/api/football";

let temporada = 2024;

let torneoSeleccionado = "clausura";

let jornadaSeleccionada = 1;


let partidos = [];

let equiposAPI = [];

let tablaAPI = [];

let jugadoresAPI = [];

let lideresAPI = [];

let torneoActual = "Regular Season";



let notificaciones =
JSON.parse(localStorage.getItem("notificaciones")) || [];




// ===============================
// LLAMADA API VERCEL
// ===============================


async function llamarAPI(type,extra=""){


try{


const respuesta = await fetch(

`${API_URL}?type=${type}&season=${temporada}${extra}`

);



const data = await respuesta.json();



return data.response || [];



}

catch(error){


console.log("API ERROR",error);


return [];


}



}









// ===============================
// EQUIPOS
// ===============================


async function cargarEquiposAPI(){


let datos = await llamarAPI(

"teams"

);



if(datos.length){



equiposAPI = datos.map(e=>({


id:e.team.id,


nombre:e.team.name,


logo:e.team.logo



}));



}



}









// ===============================
// BUSCAR EQUIPO
// ===============================


function buscarEquipo(id){


return equiposAPI.find(

e=>e.id==id

)

||

{

nombre:"Equipo",

logo:"images/default.png"

};


}









// ===============================
// PARTIDOS API
// ===============================


async function cargarPartidosAPI(){



let datos = await llamarAPI(

"fixtures"

);





let ronda =

`${torneoActual} - ${jornadaSeleccionada}`;



let filtrados = datos.filter(p=>{


return p.league.round===ronda;



});






// si API devuelve otro formato buscamos por número


if(filtrados.length===0){


filtrados = datos.filter(p=>{


let r=p.league.round || "";


return r.includes(

`${jornadaSeleccionada}`

);


});


}






partidos = filtrados.map(p=>({



id:p.fixture.id,



local:{


id:p.teams.home.id,


nombre:p.teams.home.name,


logo:p.teams.home.logo


},



visitante:{


id:p.teams.away.id,


nombre:p.teams.away.name,


logo:p.teams.away.logo


},



fecha:p.fixture.date,



hora:new Date(

p.fixture.date

).toLocaleTimeString(

"es-MX",

{

hour:"2-digit",

minute:"2-digit"

}

),



estadio:

p.fixture.venue?.name || "Por confirmar",




resultado:

p.goals.home!==null

?

`${p.goals.home}-${p.goals.away}`

:

"Pendiente"




}));





return partidos;



}









// ===============================
// CAMBIO TORNEO
// ===============================


async function cambiarTorneo(){



torneoSeleccionado =

document.getElementById(

"tipoTorneo"

).value;




if(torneoSeleccionado==="clausura"){


torneoActual="Regular Season";


}

else{


torneoActual="Regular Season";


}





await cargarPartidosAPI();


mostrarListaPartidos();



}









// ===============================
// CAMBIO JORNADA
// ===============================


async function cambiarJornada(){



jornadaSeleccionada =

Number(

document.getElementById(

"jornadaLiga"

).value

);





await cargarPartidosAPI();



mostrarListaPartidos();



}









// ===============================
// LOGOS
// ===============================


function mostrarLogo(url,tamaño){



let clase="logo-small";



if(tamaño==="medium")

clase="logo-medium";



if(tamaño==="large")

clase="logo-large";





return `

<img

class="${clase}"

src="${url}"

onerror="this.src='images/default.png'"

>

`;



}
// =======================================
// MATCHIQ MX
// SCRIPT.JS CORREGIDO
// PARTE 2/4
// =======================================


// ===============================
// INICIO
// ===============================


async function cargarInicio(){



const contenido=document.getElementById(
"contenido"
);




contenido.innerHTML=`

<h2>

Inicio

</h2>


<div class="card">

Cargando partidos...

</div>

`;





if(partidos.length===0){


await cargarPartidosAPI();



}







if(partidos.length===0){



contenido.innerHTML=`

<h2>

Inicio

</h2>


<div class="card">

No hay partidos cargados todavía.

</div>


`;

return;



}






let p=partidos[0];






contenido.innerHTML=`

<h2>

Inicio

</h2>





<div class="card home-match">



<h3>

Partido destacado

</h3>






<div class="match-header">





<div>


${mostrarLogo(

p.local.logo,

"medium"

)}




<strong>

${p.local.nombre}

</strong>



</div>







<h2>

VS

</h2>







<div>


${mostrarLogo(

p.visitante.logo,

"medium"

)}





<strong>

${p.visitante.nombre}

</strong>



</div>





</div>







<p>

🕒 ${p.hora}

</p>




<p>

🏟 ${p.estadio}

</p>




<button onclick="mostrarAnalisis(${p.id})">

Ver análisis

</button>



</div>



`;



}









// ===============================
// PARTIDOS
// ===============================


async function cargarPartidos(){



const contenido=document.getElementById(

"contenido"

);




contenido.innerHTML=`

<h2>

Partidos Liga MX

</h2>





<div class="card">



<select id="tipoTorneo"

onchange="cambiarTorneo()">



<option value="clausura">

Clausura 2024

</option>




<option value="apertura">

Apertura 2024

</option>



</select>







<select id="jornadaLiga"

onchange="cambiarJornada()">



${crearJornadas()}



</select>



</div>







<div id="listaPartidosLiga">

Cargando partidos...

</div>



`;





await cargarPartidosAPI();



mostrarListaPartidos();



}









function crearJornadas(){


let html="";



for(let i=1;i<=17;i++){



html+=`

<option value="${i}">

Jornada ${i}

</option>


`;



}



return html;



}









// ===============================
// MOSTRAR PARTIDOS
// ===============================


function mostrarListaPartidos(){



const lista=document.getElementById(

"listaPartidosLiga"

);



if(!lista)

return;







if(partidos.length===0){



lista.innerHTML=`

<div class="card">


No hay partidos registrados para esta jornada.


</div>

`;

return;



}







lista.innerHTML=partidos.map(p=>`



<div class="card">





<div class="match-header">





<div>



${mostrarLogo(

p.local.logo,

"small"

)}




<strong>

${p.local.nombre}

</strong>




</div>







<h3>

VS

</h3>







<div>



${mostrarLogo(

p.visitante.logo,

"small"

)}




<strong>

${p.visitante.nombre}

</strong>



</div>




</div>






<p>

🕒 ${p.hora}

</p>




<p>

${p.resultado}

</p>






<button onclick="mostrarAnalisis(${p.id})">

Análisis

</button>






<button onclick="mostrarAlineaciones(${p.id})">

Alineaciones

</button>




</div>



`).join("");



}









// ===============================
// ANALISIS
// ===============================


function mostrarAnalisis(id){



let p=partidos.find(

x=>x.id==id

);




if(!p)

return;







document.getElementById(

"contenido"

).innerHTML=`

<button onclick="cargarPartidos()">

← Regresar

</button>






<div class="card analysis-section">



<h2>

${p.local.nombre}

VS

${p.visitante.nombre}

</h2>




<h3>

Predicción MatchIQ

</h3>




<p>

Forma reciente, ataque, defensa, goles esperados, historial y rendimiento actual.

</p>





<h3>

Probabilidades

</h3>




<div class="probabilidad">

Local: 40%

</div>



<div class="probabilidad">

Empate: 30%

</div>



<div class="probabilidad">

Visitante: 30%

</div>





<h3>

Marcadores probables

</h3>




<div class="score-box">


<div>

2-1

</div>


<div>

1-1

</div>


<div>

1-0

</div>



</div>



</div>



`;



}
// =======================================
// MATCHIQ MX
// SCRIPT.JS CORREGIDO
// PARTE 3/4
// =======================================


// ===============================
// ALINEACIONES CON CANCHA
// ===============================


async function mostrarAlineaciones(id){


let partido = partidos.find(

p=>p.id==id

);



if(!partido)

return;





let local = await cargarJugadoresEquipo(

partido.local.id

);



let visitante = await cargarJugadoresEquipo(

partido.visitante.id

);



mostrarCancha(

partido,

local,

visitante

);



}









async function cargarJugadoresEquipo(id){



let datos = await llamarAPI(

"players",

`&team=${id}`

);



if(datos.length){

jugadoresAPI=[

...jugadoresAPI,

...datos

];

}



return datos;



}









function mostrarCancha(partido,local,visitante){



const contenido=document.getElementById(

"contenido"

);





let jugadoresLocal = local.slice(0,11);

let jugadoresVisitante = visitante.slice(0,11);



let bancaLocal = local.slice(11);

let bancaVisitante = visitante.slice(11);







contenido.innerHTML=`

<button onclick="cargarPartidos()">

← Regresar

</button>






<div class="card">



<h2>

${partido.local.nombre}

VS

${partido.visitante.nombre}

</h2>







<div class="cancha-futbol">







<div class="equipo-linea visitante">



${crearJugadoresCancha(

jugadoresVisitante

)}



</div>







<div class="medio-cancha">

⚽

</div>








<div class="equipo-linea local">



${crearJugadoresCancha(

jugadoresLocal

)}



</div>






</div>







<h2>

Bancas

</h2>






<div class="bancas">





<div>


<h3>

${partido.local.nombre}

</h3>



${crearBanca(

bancaLocal

)}



</div>







<div>


<h3>

${partido.visitante.nombre}

</h3>



${crearBanca(

bancaVisitante

)}



</div>





</div>





</div>



`;



}









// ===============================
// JUGADORES CANCHA
// ===============================


function crearJugadoresCancha(jugadores){



let posiciones=[



"Portero",


"Defensa",


"Defensa",


"Defensa",


"Defensa",


"Medio",


"Medio",


"Medio",


"Delantero",


"Delantero",


"Delantero"



];






return jugadores.map((j,i)=>`



<div class="jugador-cancha"

onclick="mostrarJugador('${j.player.id}')">



<img

src="${j.player.photo}"

onerror="this.src='images/default.png'"

>



<span>

${j.player.name}

</span>



<small>

${posiciones[i]}

</small>



</div>



`).join("");



}









// ===============================
// BANCAS
// ===============================


function crearBanca(jugadores){



if(jugadores.length===0)

return "<p>Sin suplentes</p>";






return jugadores.map(j=>`



<div class="banca-jugador"

onclick="mostrarJugador('${j.player.id}')">



<img

src="${j.player.photo}"

onerror="this.src='images/default.png'"

>




<span>

${j.player.name}

</span>



</div>



`).join("");



}









// ===============================
// POPUP JUGADOR
// ===============================


async function mostrarJugador(id){



let encontrado = jugadoresAPI.find(

j=>j.player.id==id

);



let jugador = encontrado?.player;





if(!jugador){


let datos=await llamarAPI(

"players",

`&id=${id}`

);



jugador=datos[0]?.player;



}






if(!jugador)

return;








let popup=document.getElementById(

"player-popup"

);







popup.innerHTML=`

<div class="popup-background"

onclick="cerrarJugador()">

</div>






<div class="player-modal">





<img

class="player-photo"

src="${jugador.photo}"

onerror="this.src='images/default.png'"

>






<h2>

${jugador.name}

</h2>




<p>

${jugador.position || "Jugador"}

</p>







<div class="stats-box">



<h3>

Estadísticas

</h3>



<p>

Partidos: -

</p>



<p>

Goles: -

</p>




<p>

Asistencias: -

</p>



<p>

Tarjetas: -

</p>



</div>







<button onclick="cerrarJugador()">

Cerrar

</button>



</div>

`;





popup.style.display="block";



}









function cerrarJugador(){



const popup=document.getElementById(

"player-popup"

);



popup.style.display="none";


popup.innerHTML="";


}
// =======================================
// MATCHIQ MX
// SCRIPT.JS CORREGIDO
// PARTE 4/4
// =======================================


// ===============================
// ESTADÍSTICAS
// ===============================


async function cargarStats(){



const contenido=document.getElementById(

"contenido"

);




contenido.innerHTML=`

<h2>

Estadísticas Liga MX

</h2>





<div class="card">



<select id="tipoStats"

onchange="cambiarStats()">



<option value="clausura">

Clausura 2024

</option>



<option value="apertura">

Apertura 2024

</option>



</select>



</div>





<div id="statsContenido">

Cargando...

</div>

`;





await cargarContenidoStats();



}









async function cambiarStats(){



torneoSeleccionado =

document.getElementById(

"tipoStats"

).value;





await cargarContenidoStats();



}









async function cargarContenidoStats(){



let contenedor=document.getElementById(

"statsContenido"

);



if(!contenedor)

return;







let tabla = await llamarAPI(

"standings"

);





let goleadores = await llamarAPI(

"topscorers"

);






tablaAPI=tabla;

lideresAPI=goleadores;







contenedor.innerHTML=`

<div class="card">


<h2>

Tabla ${torneoSeleccionado}

</h2>





<div class="table-container">



<table class="liga-table">



<tr>

<th>#</th>

<th>Equipo</th>

<th>PTS</th>

<th>GF</th>

<th>GC</th>

</tr>




${tabla.map(t=>`



<tr>


<td>

${t.rank}

</td>




<td class="team-cell">


<img

src="${t.team.logo}"

class="table-logo"

onerror="this.src='images/default.png'"

>


${t.team.name}


</td>




<td>

${t.points}

</td>



<td>

${t.all.goals.for}

</td>



<td>

${t.all.goals.against}

</td>



</tr>



`).join("")}




</table>


</div>


</div>







<div class="card">



<h2>

Líderes Liga MX

</h2>





${crearRanking(

"⚽ Goles",

goleadores

)}






${crearRanking(

"🎯 Asistencias",

goleadores

)}







${crearRanking(

"🔥 Contribuciones de gol",

goleadores

)}







${crearRanking(

"🟨 Tarjetas amarillas",

goleadores

)}







${crearRanking(

"🟥 Tarjetas rojas",

goleadores

)}








${crearRanking(

"🧤 Porterías a cero",

goleadores

)}




</div>

`;



}









// ===============================
// RANKING JUGADORES
// ===============================


function crearRanking(titulo,jugadores){



return `



<h3>

${titulo}

</h3>




${jugadores.slice(0,5).map(j=>`




<div class="leader-card"

onclick="mostrarJugador('${j.player.id}')">





<img

class="leader-photo"

src="${j.player.photo}"

onerror="this.src='images/default.png'"

>






<div>


<strong>

${j.player.name}

</strong>




<p>

${j.statistics?.[0]?.team?.name || ""}

</p>




</div>




</div>






`).join("")}



`;



}









// ===============================
// PERFIL
// ===============================


async function cargarPerfil(){



const contenido=document.getElementById(

"contenido"

);





if(equiposAPI.length===0)

await cargarEquiposAPI();








contenido.innerHTML=`

<h2>

Perfil

</h2>





<div class="card">


<h3>

Equipos Liga MX

</h3>





${equiposAPI.map(e=>`




<div class="team-follow">



<img

src="${e.logo}"

class="logo-small"

onerror="this.src='images/default.png'"

>




<strong>

${e.nombre}

</strong>






<button onclick="cambiarNotificacion(${e.id})">



${notificaciones.includes(e.id)

?

"Siguiendo"

:

"Seguir"

}



</button>





</div>




`).join("")}



</div>

`;



}









function cambiarNotificacion(id){



if(notificaciones.includes(id)){



notificaciones=

notificaciones.filter(

x=>x!==id

);



}

else{


notificaciones.push(id);


}



localStorage.setItem(

"notificaciones",

JSON.stringify(notificaciones)

);



cargarPerfil();



}









// ===============================
// NAVEGACIÓN
// ===============================


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

cargarStats();

break;



case "perfil":

cargarPerfil();

break;



}



}









// ===============================
// INICIO APP
// ===============================


document.addEventListener(

"DOMContentLoaded",

async()=>{



await cargarEquiposAPI();



await cargarInicio();



}

);
