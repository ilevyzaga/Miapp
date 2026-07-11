// =======================================
// MATCHIQ MX
// SCRIPT.JS COMPLETO
// PARTE 1/4
// =======================================


// ===============================
// CONFIGURACIÓN
// ===============================


const ligaMX = 262;

const temporada = 2024;



// ===============================
// VARIABLES
// ===============================


let notificaciones =
JSON.parse(localStorage.getItem("notificaciones")) || [];



let torneoSeleccionado = "clausura";

let jornadaSeleccionada = 1;



let partidos = [];

let equiposAPI = [];

let tablaAPI = [];

let jugadores = [];





// ===============================
// LLAMADA A VERCEL API
// ===============================


async function llamarAPI(tipo, extra=""){



try{



let url = `/api/football?type=${tipo}${extra}`;



const respuesta = await fetch(url);



const data = await respuesta.json();



return data.response || [];



}

catch(error){



console.log("Error API:",error);



return [];



}



}







// ===============================
// CARGAR EQUIPOS
// ===============================


async function cargarEquiposAPI(){



let datos = await llamarAPI("teams");



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


function buscarEquipo(nombre){



let equipo=equiposAPI.find(e=>



nombre.toLowerCase()

.includes(

e.nombre.toLowerCase()

)



);



if(equipo){



return equipo;



}



return {


nombre:nombre,

logo:"images/default.png"



};



}








// ===============================
// CARGAR PARTIDOS
// ===============================


async function cargarPartidosAPI(){



let datos = await llamarAPI("fixtures");



if(!datos.length){



partidos=[];



return;



}






partidos = datos.map(p=>{



let fecha = new Date(

p.fixture.date

);



return {



id:p.fixture.id,



local:{



nombre:p.teams.home.name,

logo:p.teams.home.logo



},




visitante:{



nombre:p.teams.away.name,

logo:p.teams.away.logo



},





jornada:

p.league.round || "Jornada",




torneo:

fecha.getMonth()<6

?

"clausura"

:

"apertura",





hora:

fecha.toLocaleTimeString(

"es-MX",

{

hour:"2-digit",

minute:"2-digit"

}

),





estadio:

p.fixture.venue?.name ||

"Por confirmar",






resultado:



p.goals.home!==null

?

`${p.goals.home}-${p.goals.away}`

:

null,






prediccion:

"Predicción MatchIQ basada en estadísticas"



};



});





}







// ===============================
// LOGOS
// ===============================


function mostrarLogo(url,tamaño){



let clase="logo-small";



if(tamaño==="medium"){

clase="logo-medium";

}



if(tamaño==="large"){

clase="logo-large";

}





return `



<img

src="${url}"

class="${clase}"

onerror="this.src='images/default.png'">



`;



}
// =======================================
// MATCHIQ MX
// SCRIPT.JS COMPLETO
// PARTE 2/4
// =======================================


// ===============================
// INICIO
// ===============================


async function cargarInicio(){



const contenido=document.getElementById("contenido");



contenido.innerHTML=`



<h2>

Inicio

</h2>



<div class="card">

<p>

Cargando partidos...

</p>

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

<p>

No hay partidos disponibles.

</p>

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

Hora: ${p.hora}

</p>



<p>

Estadio: ${p.estadio}

</p>





<button onclick="mostrarAnalisis('${p.id}')">

Ver análisis

</button>



</div>







<div class="card prediction-card">



<h3>

Predicción MatchIQ

</h3>



<p>

${p.prediccion}

</p>



</div>



`;



}









// ===============================
// PARTIDOS
// ===============================


async function cargarPartidos(){



const contenido=document.getElementById("contenido");



contenido.innerHTML=`



<h2>

Partidos Liga MX

</h2>





<div class="card">



<h3>

Torneo

</h3>



<select id="tipoTorneo" onchange="cambiarTorneo()">



<option value="clausura">

Clausura 2024

</option>



<option value="apertura">

Apertura 2024

</option>



</select>







<h3>

Jornada

</h3>




<select id="jornadaLiga" onchange="cambiarJornada()">



${crearOpcionesJornadas()}



</select>



</div>






<div id="listaPartidosLiga">

Cargando...

</div>



`;





if(partidos.length===0){



await cargarPartidosAPI();



}



mostrarListaPartidos();



}








function crearOpcionesJornadas(){



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








async function cambiarTorneo(){



torneoSeleccionado =

document.getElementById(

"tipoTorneo"

).value;




mostrarListaPartidos();



}








async function cambiarJornada(){



jornadaSeleccionada =

document.getElementById(

"jornadaLiga"

).value;




mostrarListaPartidos();



}









// ===============================
// LISTA PARTIDOS
// ===============================


function mostrarListaPartidos(){



const lista=document.getElementById(

"listaPartidosLiga"

);



if(!lista){

return;

}





let filtro = partidos.filter(p=>{


return true;


});






if(filtro.length===0){



lista.innerHTML=`



<div class="card">

<p>

No hay partidos registrados.

</p>

</div>



`;



return;



}







lista.innerHTML=filtro.map(p=>`



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






${p.resultado ?

`

<h3>

Resultado:

${p.resultado}

</h3>

`

:

""

}






<button onclick="mostrarAnalisis('${p.id}')">

Ver análisis

</button>





<button onclick="mostrarAlineacion('${p.local.nombre}')">

Ver alineación

</button>






</div>



`).join("");



}
// =======================================
// MATCHIQ MX
// SCRIPT.JS COMPLETO
// PARTE 3/4
// =======================================


// ===============================
// PREDICCIONES
// ===============================


async function cargarPredicciones(){



const contenido=document.getElementById("contenido");



if(partidos.length===0){



await cargarPartidosAPI();



}





contenido.innerHTML=`



<h2>

Predicciones MatchIQ

</h2>





${
partidos.length===0

?

`

<div class="card">

<p>

No hay partidos disponibles.

</p>

</div>

`

:

partidos.map(p=>`



<div class="card prediction-card">



<h3>

${p.local.nombre}

VS

${p.visitante.nombre}

</h3>





<p>

Predicción inteligente basada en:

</p>



<ul>

<li>

Forma reciente

</li>


<li>

Goles anotados

</li>


<li>

Defensa

</li>


<li>

Historial

</li>


</ul>





<button onclick="mostrarAnalisis('${p.id}')">

Ver análisis

</button>



</div>



`).join("")

}



`;



}









// ===============================
// ANALISIS
// ===============================


function mostrarAnalisis(id){



let p=partidos.find(

x=>x.id==id

);





if(!p){

return;

}





const contenido=document.getElementById(

"contenido"

);





contenido.innerHTML=`



<button onclick="cargarPartidos()">

Regresar

</button>





<div class="card">



<h2>

${p.local.nombre}

VS

${p.visitante.nombre}

</h2>





<div class="analysis-section">



<h3>

Predicción MatchIQ

</h3>



<p>

${p.prediccion}

</p>



</div>







<div class="analysis-section">



<h3>

Resultado

</h3>



<p>

${p.resultado || "Pendiente"}

</p>



</div>







<div class="analysis-section">



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



</div>



`;



}









// ===============================
// ALINEACIONES
// ===============================


async function mostrarAlineacion(equipo){



const contenido=document.getElementById(

"contenido"

);






contenido.innerHTML=`



<button onclick="cargarPartidos()">

Regresar

</button>





<div class="card">



<h2>

Alineación ${equipo}

</h2>





<p>

Cargando jugadores desde API...

</p>



</div>



`;






let encontrado = equiposAPI.find(e=>

e.nombre===equipo

);






if(!encontrado){

return;

}





let datos = await llamarAPI(

"players",

`&team=${encontrado.id}`

);





jugadores = datos.map(j=>({



id:j.player.id,


nombre:j.player.name,


equipo:equipo,


posicion:

j.statistics?.[0]?.games?.position || "Jugador",



foto:j.player.photo,



stats:{


goles:

j.statistics?.[0]?.goals?.total || 0,



asistencias:

j.statistics?.[0]?.goals?.assists || 0,



amarillas:

j.statistics?.[0]?.cards?.yellow || 0



}



}));








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



jugadores.length

?

jugadores.map(j=>`



<div class="player-card"

onclick="mostrarJugador(${j.id})">



<img src="${j.foto}">



<div>



<strong>

${j.nombre}

</strong>



<p>

${j.posicion}

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
// MODAL JUGADOR
// ===============================


function mostrarJugador(id){



let jugador=jugadores.find(

j=>j.id==id

);





if(!jugador){

return;

}





let popup=document.getElementById(

"player-popup"

);






popup.innerHTML=`



<div class="popup-background"

onclick="cerrarJugador()">

</div>





<div class="player-modal">



<img 

src="${jugador.foto}"

class="player-photo">





<h2>

${jugador.nombre}

</h2>




<p>

${jugador.equipo}

</p>



<p>

${jugador.posicion}

</p>





<div class="stats-box">



<h3>

Estadísticas

</h3>



<p>

Goles: ${jugador.stats.goles}

</p>



<p>

Asistencias: ${jugador.stats.asistencias}

</p>



<p>

Amarillas: ${jugador.stats.amarillas}

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



let popup=document.getElementById(

"player-popup"

);



popup.style.display="none";

popup.innerHTML="";



}
// =======================================
// MATCHIQ MX
// SCRIPT.JS COMPLETO
// PARTE 4/4
// =======================================


// ===============================
// STATS LIGA MX
// ===============================


async function cargarStats(){



const contenido=document.getElementById("contenido");



contenido.innerHTML=`



<h2>

Stats Liga MX

</h2>



<div class="card">

<p>

Cargando tabla...

</p>

</div>



`;





let datos = await llamarAPI("standings");





if(!datos.length){



contenido.innerHTML=`



<div class="card">

<p>

No se pudieron cargar las estadísticas.

</p>

</div>



`;



return;



}







tablaAPI = datos[0].league.standings[0];






contenido.innerHTML=`



<h2>

Tabla Liga MX 2024

</h2>





<div class="card table-container">



<table class="liga-table">



<tr>

<th>

#

</th>

<th>

Equipo

</th>

<th>

PTS

</th>

<th>

GF

</th>

<th>

GC

</th>

</tr>







${tablaAPI.map(e=>`



<tr>



<td>

${e.rank}

</td>



<td class="team-cell">



<img

src="${e.team.logo}"

class="table-logo"

onerror="this.src='images/default.png'">



${e.team.name}



</td>





<td>

${e.points}

</td>




<td>

${e.all.goals.for}

</td>




<td>

${e.all.goals.against}

</td>




</tr>



`).join("")}





</table>



</div>



`;



}









// ===============================
// PERFIL
// ===============================


async function cargarPerfil(){



const contenido=document.getElementById("contenido");





if(equiposAPI.length===0){



await cargarEquiposAPI();



}





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







${equiposAPI.map(e=>`



<div class="team-follow">



<img

src="${e.logo}"

class="table-logo"

onerror="this.src='images/default.png'">





<strong>

${e.nombre}

</strong>







<button onclick="cambiarNotificacion(${e.id})">



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



notificaciones = notificaciones.filter(

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
// CARGA INICIAL
// ===============================


document.addEventListener(

"DOMContentLoaded",

async()=>{





await cargarEquiposAPI();



await cargarPartidosAPI();



cargarInicio();



}

);
