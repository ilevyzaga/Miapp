// =======================================
// MATCHIQ MX
// SCRIPT.JS NUEVO
// PARTE 1
// API FOOTBALL INTEGRATION
// =======================================


// ===============================
// VARIABLES
// ===============================


let notificaciones =
JSON.parse(localStorage.getItem("notificaciones")) || [];


// Torneo seleccionado
let torneoActual = "clausura";


// Datos que llegarán desde API

let equiposAPI = [];

let tablasLigaMX = {

clausura: [],

apertura: []

};


let partidosAPI = [];

let jugadoresAPI = [];




// ===============================
// EQUIPOS LIGA MX
// ===============================
// Se mantienen para los logos locales
// y compatibilidad con la interfaz


const equipos = [


{
id:"america",
apiId:2287,
nombre:"América",
logo:"images/america.png"
},


{
id:"atlas",
apiId:2283,
nombre:"Atlas",
logo:"images/atlas.png"
},


{
id:"atletico-san-luis",
apiId:2314,
nombre:"Atlético San Luis",
logo:"images/atleticosanluis.png"
},


{
id:"chivas",
apiId:2278,
nombre:"Chivas",
logo:"images/chivas.png"
},


{
id:"cruz-azul",
apiId:2295,
nombre:"Cruz Azul",
logo:"images/cruzazul.png"
},


{
id:"juarez",
apiId:2298,
nombre:"FC Juárez",
logo:"images/juarez.png"
},


{
id:"leon",
apiId:2289,
nombre:"León",
logo:"images/leon.png"
},


{
id:"monterrey",
apiId:2282,
nombre:"Monterrey",
logo:"images/monterrey.png"
},


{
id:"necaxa",
apiId:2288,
nombre:"Necaxa",
logo:"images/necaxa.png"
},


{
id:"pachuca",
apiId:2292,
nombre:"Pachuca",
logo:"images/pachuca.png"
},


{
id:"puebla",
apiId:2291,
nombre:"Puebla",
logo:"images/puebla.png"
},


{
id:"pumas",
apiId:2286,
nombre:"Pumas",
logo:"images/pumas.png"
},


{
id:"queretaro",
apiId:2290,
nombre:"Querétaro",
logo:"images/queretaro.png"
},


{
id:"santos",
apiId:2285,
nombre:"Santos Laguna",
logo:"images/santos.png"
},


{
id:"tigres",
apiId:2279,
nombre:"Tigres",
logo:"images/tigres.png"
},


{
id:"tijuana",
apiId:2280,
nombre:"Tijuana",
logo:"images/tijuana.png"
},


{
id:"toluca",
apiId:2281,
nombre:"Toluca",
logo:"images/toluca.png"
},


{
id:"mazatlan",
apiId:14002,
nombre:"Mazatlán",
logo:"images/mazatlan.png"
}


];





// ===============================
// TABLA INICIAL
// AHORA VIENE DESDE API
// ===============================


let tablaPosiciones = [];




// ===============================
// CARGAR DATOS API FOOTBALL
// ===============================


async function cargarDatosFootball(){


try{


// Equipos

let equiposRespuesta =
await fetch("/api/football?type=teams");


let equiposData =
await equiposRespuesta.json();


equiposAPI =
equiposData.response;




// Tabla posiciones

let tablaRespuesta =
await fetch("/api/football?type=standings");


let tablaData =
await tablaRespuesta.json();



let standings =
tablaData.response[0]
.league
.standings;



tablasLigaMX.clausura =
standings[0];


tablasLigaMX.apertura =
standings[1];





// Partidos

let partidosRespuesta =
await fetch("/api/football?type=fixtures");


let partidosData =
await partidosRespuesta.json();


partidosAPI =
partidosData.response;




console.log("API Football cargada");



}

catch(error){


console.log(

"Error cargando Football API",

error

);



}


}







// ===============================
// CAMBIAR TORNEO
// ===============================


function cambiarTorneo(valor){


torneoActual = valor;


cargarStats();


}





// ===============================
// BUSCAR EQUIPO
// ===============================


function buscarEquipo(id){


return equipos.find(

e=>e.id===id

);


}





// ===============================
// BUSCAR PARTIDO
// ===============================


function buscarPartido(id){


return partidosAPI.find(

p=>p.fixture.id==id

);


}





// ===============================
// MOSTRAR LOGO
// ===============================


function mostrarLogo(src,tamaño="small"){


return `


<img

src="${src}"

class="logo-${tamaño}"

alt="logo">


`;


}





// ===============================
// BARRA PROBABILIDAD
// ===============================


function barraProbabilidad(nombre,valor,tipo){


return `


<div class="probabilidad">


<div class="prob-header">


<span>${nombre}</span>


<strong>${valor}%</strong>


</div>



<div class="barra">


<div

class="relleno ${tipo}"

style="width:${valor}%">

</div>


</div>


</div>


`;

}
// =======================================
// MATCHIQ MX
// SCRIPT.JS NUEVO
// PARTE 2
// PARTIDOS API FOOTBALL
// =======================================


// ===============================
// CONVERTIR PARTIDOS API
// A FORMATO MATCHIQ
// ===============================


function convertirPartidoAPI(partido){


return {


id:partido.fixture.id,


local:{


nombre:
partido.teams.home.name,


logo:
partido.teams.home.logo


},



visitante:{


nombre:
partido.teams.away.name,


logo:
partido.teams.away.logo


},



fecha:
partido.fixture.date,



hora:
new Date(partido.fixture.date)
.toLocaleTimeString(
[],
{
hour:"2-digit",
minute:"2-digit"
}
),



estadio:
partido.fixture.venue?.name ||
"Estadio por confirmar",



resultado:{


local:
partido.goals.home,


visitante:
partido.goals.away


},



estado:
partido.fixture.status.long



};


}







// ===============================
// OBTENER PARTIDOS ACTUALES
// ===============================


function obtenerPartidosMatchIQ(){


return partidosAPI.map(

p=>convertirPartidoAPI(p)

);


}









// ===============================
// HOME
// ===============================


function cargarInicio(){


const contenido=
document.getElementById("contenido");



let partidos =
obtenerPartidosMatchIQ();



let p =
partidos[0];





if(!p){


contenido.innerHTML=`

<div class="card">

<h3>

Cargando partidos...

</h3>

</div>

`;

return;


}






contenido.innerHTML=`



<h2>

Inicio

</h2>





<div class="card">


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

${p.hora}

</p>







<p>

${p.estadio}

</p>







<button onclick="mostrarAnalisis('${p.id}')">

Ver análisis

</button>







</div>





`;



}









// ===============================
// PARTIDOS
// ===============================


function cargarPartidos(){


const contenido=
document.getElementById("contenido");



let partidos =
obtenerPartidosMatchIQ();





contenido.innerHTML=`



<h2>

Partidos Liga MX

</h2>







${partidos.map(p=>`



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

${p.hora}

</p>






<p>

${p.estadio}

</p>







${
p.resultado.local !== null

?

`

<h3>

${p.resultado.local}

-

${p.resultado.visitante}

</h3>

`

:

`

<p>

Pendiente

</p>

`

}







<button onclick="mostrarAnalisis('${p.id}')">

Ver análisis

</button>







</div>






`).join("")}





`;



}









// ===============================
// ANALISIS DEL PARTIDO
// ===============================


function mostrarAnalisis(id){



const p =
buscarPartido(id);



const contenido =
document.getElementById("contenido");



if(!p){

return;

}



let partido =
convertirPartidoAPI(p);





contenido.innerHTML=`



<button onclick="cargarPartidos()">

Regresar

</button>







<div class="card">






<div class="match-header">





<div>


${mostrarLogo(
partido.local.logo,
"medium"
)}



<h3>

${partido.local.nombre}

</h3>



</div>








<h2>

VS

</h2>







<div>


${mostrarLogo(
partido.visitante.logo,
"medium"
)}



<h3>

${partido.visitante.nombre}

</h3>



</div>





</div>








<h3>

Resultado

</h3>





<p>

${
partido.resultado.local

}

-

${
partido.resultado.visitante

}

</p>








<h3>

Estado

</h3>





<p>

${partido.estado}

</p>








<h3>

Estadio

</h3>





<p>

${partido.estadio}

</p>








<h3>

Fecha

</h3>





<p>

${partido.fecha}

</p>







</div>



`;



}









// ===============================
// PREDICCIONES
// ===============================


function cargarPredicciones(){


const contenido =
document.getElementById("contenido");



let partidos =
obtenerPartidosMatchIQ();





contenido.innerHTML=`



<h2>

Predicciones MatchIQ

</h2>







${partidos.map(p=>`



<div class="card">






<h3>

${p.local.nombre}

VS

${p.visitante.nombre}

</h3>







<p>

Predicción inteligente próximamente con IA.

</p>







</div>






`).join("")}





`;



}
// =======================================
// MATCHIQ MX
// SCRIPT.JS NUEVO
// PARTE 3
// JUGADORES Y ALINEACIONES API FOOTBALL
// =======================================


// ===============================
// CARGAR PLANTILLA DE EQUIPO
// ===============================


async function cargarPlantillaAPI(teamId){


try{


let respuesta = await fetch(

`/api/football?type=players&team=${teamId}`

);



let datos = await respuesta.json();



jugadoresAPI = datos.response;



return jugadoresAPI;



}

catch(error){


console.log(

"Error cargando jugadores",

error

);


return [];


}



}








// ===============================
// BUSCAR JUGADOR
// ===============================


function buscarJugador(id){


return jugadoresAPI.find(

j=>j.player.id == id

);



}








// ===============================
// MOSTRAR ALINEACION
// ===============================


async function mostrarAlineacion(equipo){



const contenido =
document.getElementById("contenido");



let equipoInfo =
equipos.find(

e=>e.nombre===equipo

);




if(!equipoInfo){


contenido.innerHTML=`

<div class="card">

<p>

Equipo no encontrado

</p>

</div>

`;

return;


}






let plantilla =
await cargarPlantillaAPI(

equipoInfo.apiId

);







contenido.innerHTML=`



<button onclick="cargarPartidos()">

Regresar

</button>








<div class="card">





<h2>

Alineación ${equipo}

</h2>







<div class="alineacion-container">







${



plantilla.length > 0



?

plantilla.map(j=>`







<div class="player-card"

onclick="mostrarJugador('${j.player.id}')">








<img

src="${j.player.photo}"

alt="${j.player.name}">









<div>



<strong>

${j.player.name}

</strong>








<p>

${j.player.position || "Jugador"}

</p>






</div>









</div>









`).join("")





:

`

<p>

No hay jugadores disponibles.

</p>

`

}





</div>









</div>







`;



}









// ===============================
// POPUP JUGADOR
// ===============================


function mostrarJugador(id){



const jugador =
buscarJugador(id);




if(!jugador){

return;

}





const popup =
document.getElementById(
"player-popup"
);






popup.innerHTML=`







<div class="popup-background"

onclick="cerrarJugador()">

</div>









<div class="player-modal">









<img

src="${jugador.player.photo}"

class="player-photo"

alt="${jugador.player.name}">







<h2>

${jugador.player.name}

</h2>








<p>

${jugador.player.nationality || ""}

</p>








<p>

Edad:

${jugador.player.age || "-"}

</p>








<p>

Posición:

${jugador.player.position || "-"}

</p>







${crearStatsJugadorAPI(jugador)}





<button onclick="cerrarJugador()">

Cerrar

</button>







</div>








`;









popup.style.display="block";




}









function cerrarJugador(){



const popup =
document.getElementById(
"player-popup"
);



popup.style.display="none";



popup.innerHTML="";



}









// ===============================
// STATS DEL JUGADOR API
// ===============================


function crearStatsJugadorAPI(jugador){



let s =
jugador.statistics?.[0];





if(!s){


return `


<div class="stats-box">


<h3>

Estadísticas

</h3>


<p>

Datos de temporada no disponibles

</p>


</div>


`;



}







return `



<div class="stats-box">



<h3>

Estadísticas temporada

</h3>







<p>

Partidos:

${s.games.appearences || 0}

</p>







<p>

Minutos:

${s.games.minutes || 0}

</p>







<p>

Goles:

${s.goals.total || 0}

</p>







<p>

Asistencias:

${s.goals.assists || 0}

</p>







<p>

Tarjetas amarillas:

${s.cards.yellow || 0}

</p>







<p>

Tarjetas rojas:

${s.cards.red || 0}

</p>







</div>



`;

}
// =======================================
// MATCHIQ MX
// SCRIPT.JS NUEVO
// PARTE 4
// STATS, TABLA Y PERFIL API FOOTBALL
// =======================================



// ===============================
// STATS GENERALES
// ===============================


function cargarStats(){


const contenido =
document.getElementById("contenido");



let tabla =
tablasLigaMX[torneoActual];





contenido.innerHTML=`



<h2>

Stats Liga MX

</h2>







<div class="card">



<h3>

Tabla de posiciones

</h3>







<select onchange="cambiarTorneo(this.value)">



<option value="clausura"

${torneoActual==="clausura" ? "selected":""}>

Clausura 2024

</option>






<option value="apertura"

${torneoActual==="apertura" ? "selected":""}>

Apertura 2024

</option>





</select>







<div class="table-container">





<table class="liga-table">



<thead>


<tr>


<th>

#

</th>


<th>

Equipo

</th>


<th>

PJ

</th>


<th>

PG

</th>


<th>

PE

</th>


<th>

PP

</th>


<th>

GF

</th>


<th>

GC

</th>


<th>

DG

</th>


<th>

PTS

</th>



</tr>


</thead>







<tbody>






${tabla.map(e=>`



<tr>




<td>

${e.rank}

</td>







<td class="team-cell">



<img

src="${e.team.logo}"

class="table-logo">



${e.team.name}



</td>







<td>

${e.all.played}

</td>


<td>

${e.all.win}

</td>


<td>

${e.all.draw}

</td>


<td>

${e.all.lose}

</td>


<td>

${e.all.goals.for}

</td>


<td>

${e.all.goals.against}

</td>


<td>

${e.goalsDiff}

</td>


<td>

<strong>

${e.points}

</strong>

</td>







</tr>



`).join("")}







</tbody>



</table>







</div>







</div>









<div class="card stats-ranking">



<img

src="images/stats.svg"

class="section-icon">





<h3>

Goleadores

</h3>



<p>

Ranking de máximos goleadores Liga MX.

</p>



</div>









<div class="card stats-ranking">



<img

src="images/stats.svg"

class="section-icon">





<h3>

Asistencias

</h3>



<p>

Ranking de asistidores.

</p>



</div>









<div class="card stats-ranking">



<img

src="images/stats.svg"

class="section-icon">





<h3>

Contribuciones de gol

</h3>



<p>

Goles + asistencias.

</p>



</div>









<div class="card stats-ranking">



<img

src="images/stats.svg"

class="section-icon">





<h3>

Tarjetas

</h3>



<p>

Ranking disciplinario.

</p>



</div>






`;



}









// ===============================
// PERFIL
// ===============================


function cargarPerfil(){



const contenido =
document.getElementById("contenido");



contenido.innerHTML=`



<h2>

Perfil

</h2>







<div class="card perfil-card">



<img

src="images/profile.svg"

class="section-icon">





<h3>

Usuario

</h3>



<p>

Isaac

</p>



</div>








<div class="card">



<h3>

Equipos seguidos

</h3>








${equipos.map(e=>`



<div class="team-follow">






${mostrarLogo(e.logo,"small")}





<strong>

${e.nombre}

</strong>







<button onclick="cambiarNotificacion('${e.id}')">



${

notificaciones.includes(e.id)

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









// ===============================
// NOTIFICACIONES
// ===============================


function cambiarNotificacion(id){



if(notificaciones.includes(id)){



notificaciones =
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
// NAVEGACION
// ===============================


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



if(seccion==="stats"){


cargarStats();


}



if(seccion==="perfil"){


cargarPerfil();


}



}









// ===============================
// INICIO APP
// ===============================


document.addEventListener(

"DOMContentLoaded",

async()=>{



await cargarDatosFootball();






const logoLiga =
document.getElementById(
"ligaLogo"
);





if(logoLiga){



logoLiga.onclick=()=>{


cargarInicio();



};



}







cargarInicio();



}

);
