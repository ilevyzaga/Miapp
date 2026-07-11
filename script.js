// =======================================
// MATCHIQ MX
// SCRIPT.JS COMPLETO MEJORADO
// PARTE 1/4
// =======================================


// ===============================
// CONFIGURACIÓN
// ===============================


const ligaMX = 262;

const temporada = 2024;



// ===============================
// VARIABLES GLOBALES
// ===============================


let notificaciones =
JSON.parse(localStorage.getItem("notificaciones")) || [];



let torneoSeleccionado = "clausura";

let jornadaSeleccionada = 1;



let partidos = [];

let equiposAPI = [];

let tablaAPI = [];

let goleadoresAPI = [];

let jugadores = [];

let partidoSeleccionado = null;








// ===============================
// LLAMADA A VERCEL API
// ===============================


async function llamarAPI(tipo,extra=""){



try{



let url = `/api/football?type=${tipo}${extra}`;



let respuesta = await fetch(url);



let data = await respuesta.json();



return data.response || [];



}

catch(error){



console.log(error);



return [];



}



}







// ===============================
// CARGAR EQUIPOS API
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



let equipo = equiposAPI.find(e=>



nombre.toLowerCase()

.includes(

e.nombre.toLowerCase()

)



);



return equipo || {



nombre:nombre,

logo:"images/default.png"



};



}







// ===============================
// CARGAR PARTIDOS API
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





let torneo =

fecha.getMonth()<6

?

"clausura"

:

"apertura";







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

p.league.round || "",





torneo:torneo,





fecha:fecha,





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

"Analizando estadísticas de equipos, jugadores y rendimiento reciente"



};



});





}
// =======================================
// MATCHIQ MX
// SCRIPT.JS COMPLETO MEJORADO
// PARTE 2/4
// =======================================


// ===============================
// INICIO
// ===============================


async function cargarInicio(){



const contenido=document.getElementById("contenido");



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



mostrarLogo(p.local.logo,"medium")



<strong>

${p.local.nombre}

</strong>



</div>





<h2>

VS

</h2>





<div>



mostrarLogo(p.visitante.logo,"medium")



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





<button onclick="mostrarAlineaciones('${p.id}')">

Ver alineaciones

</button>





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




<select id="tipoTorneo" onchange="actualizarFiltros()">



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






<select id="jornadaLiga" onchange="actualizarFiltros()">



${crearJornadas()}



</select>



</div>







<div id="listaPartidosLiga">

</div>



`;





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
// FILTROS PARTIDOS
// ===============================


function actualizarFiltros(){



torneoSeleccionado =

document.getElementById(

"tipoTorneo"

).value;





jornadaSeleccionada =

Number(

document.getElementById(

"jornadaLiga"

).value

);






mostrarListaPartidos();



}









// ===============================
// MOSTRAR PARTIDOS FILTRADOS
// ===============================


function mostrarListaPartidos(){



const lista=document.getElementById(

"listaPartidosLiga"

);



if(!lista){

return;

}






let partidosFiltrados = partidos.filter(p=>{



return (

p.torneo===torneoSeleccionado &&

Number(

p.jornada

)

===jornadaSeleccionada



);



});







if(partidosFiltrados.length===0){



lista.innerHTML=`



<div class="card">

<p>

No hay partidos registrados para esta jornada.

</p>

</div>



`;



return;



}







lista.innerHTML=partidosFiltrados.map(p=>`



<div class="card">





<div class="match-header">



<div>



<img src="${p.local.logo}" width="60">



<strong>

${p.local.nombre}

</strong>



</div>





<h3>

VS

</h3>





<div>



<img src="${p.visitante.logo}" width="60">



<strong>

${p.visitante.nombre}

</strong>



</div>



</div>







<p>

Jornada ${p.jornada}

</p>




<p>

${p.hora}

</p>




<p>

${p.estadio}

</p>






${

p.resultado

?

`<h3>

Resultado:

${p.resultado}

</h3>`

:

""

}





<button onclick="mostrarAnalisis('${p.id}')">

Análisis

</button>




<button onclick="mostrarAlineaciones('${p.id}')">

Alineaciones

</button>





</div>



`).join("");



}
// =======================================
// MATCHIQ MX
// SCRIPT.JS COMPLETO MEJORADO
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
partidos.map(p=>`



<div class="card prediction-card">



<h3>

${p.local.nombre}

VS

${p.visitante.nombre}

</h3>





<p>

Predicción basada en:

</p>



<ul>

<li>

Forma reciente

</li>

<li>

Goles anotados y recibidos

</li>

<li>

Rendimiento defensivo

</li>

<li>

Historial entre equipos

</li>

<li>

Jugadores disponibles

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
// ANALISIS COMPLETO
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






let probLocal=55;

let probEmpate=25;

let probVisitante=20;






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

Probabilidad del partido

</h3>




<p>

${p.local.nombre}: ${probLocal}%

</p>



<p>

Empate: ${probEmpate}%

</p>



<p>

${p.visitante.nombre}: ${probVisitante}%

</p>



</div>







<div class="analysis-section">



<h3>

Análisis del partido

</h3>



<p>

Se toman en cuenta la forma reciente, goles a favor, goles recibidos, rendimiento como local y visitante, historial y jugadores disponibles.

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







<button onclick="mostrarAlineaciones('${p.id}')">

Ver alineaciones

</button>






</div>



`;



}









// ===============================
// ALINEACIONES TIPO CANCHA
// ===============================


async function mostrarAlineaciones(id){



let partido=partidos.find(

p=>p.id==id

);



if(!partido){

return;

}



partidoSeleccionado=partido;






const contenido=document.getElementById(

"contenido"

);





contenido.innerHTML=`



<button onclick="cargarPartidos()">

Regresar

</button>





<h2>

${partido.local.nombre}

VS

${partido.visitante.nombre}

</h2>





<div class="card">



<h3>

Cargando alineaciones...

</h3>



</div>



`;







let local = await cargarPlantilla(

partido.local.nombre

);



let visitante = await cargarPlantilla(

partido.visitante.nombre

);







contenido.innerHTML=`



<button onclick="cargarPartidos()">

Regresar

</button>





<div class="card">



<h2>

Alineaciones

</h2>








<div class="field">



<div class="team-side">



<h3>

${partido.local.nombre}

</h3>



${crearCanchaJugadores(local)}



</div>






<div class="team-side">



<h3>

${partido.visitante.nombre}

</h3>



${crearCanchaJugadores(visitante)}



</div>



</div>





<h3>

Suplentes

</h3>



<div class="bench">



${crearBanca(local)}

${crearBanca(visitante)}



</div>



</div>



`;



}









async function cargarPlantilla(equipo){



let encontrado=equiposAPI.find(e=>

e.nombre===equipo

);





if(!encontrado){

return [];

}



let datos=await llamarAPI(

"players",

`&team=${encontrado.id}`

);





return datos.slice(0,18).map(j=>({



id:j.player.id,

nombre:j.player.name,

foto:j.player.photo,

posicion:

j.statistics?.[0]?.games?.position || "Jugador"



}));



}









function crearCanchaJugadores(lista){



return lista.slice(0,11).map(j=>`



<div class="field-player"

onclick="mostrarJugador(${j.id})">



<img src="${j.foto}">



<span>

${j.nombre}

</span>



</div>



`).join("");



}









function crearBanca(lista){



return lista.slice(11,18).map(j=>`



<div class="bench-player">



<img src="${j.foto}">



${j.nombre}



</div>



`).join("");



}
// =======================================
// MATCHIQ MX
// SCRIPT.JS COMPLETO MEJORADO
// PARTE 4/4
// =======================================


// ===============================
// STATS TABLA + GOLEADORES
// ===============================


async function cargarStats(){



const contenido=document.getElementById("contenido");



contenido.innerHTML=`



<h2>

Estadísticas Liga MX

</h2>



<div class="card">

<p>

Cargando datos...

</p>

</div>



`;







let tabla = await llamarAPI("standings");

let goleadores = await llamarAPI("players");







contenido.innerHTML=`



<h2>

Stats Liga MX 2024

</h2>





<div class="card">



<h3>

Selecciona torneo

</h3>



<select id="tipoStats" onchange="cambiarStats()">



<option value="clausura">

Clausura 2024

</option>



<option value="apertura">

Apertura 2024

</option>



</select>



</div>







<div id="tablaStats"></div>





<div id="goleadoresStats"></div>



`;






mostrarTablaStats(tabla);





}









function cambiarStats(){



cargarStats();



}









function mostrarTablaStats(datos){



const tabla=document.getElementById(

"tablaStats"

);





if(!datos.length){



tabla.innerHTML=`



<div class="card">

No hay tabla disponible.

</div>



`;



return;



}






let standings =

datos[0]?.league?.standings?.[0] || [];






tabla.innerHTML=`



<div class="card table-container">



<h3>

Tabla de posiciones

</h3>






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







${standings.map(e=>`



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
// GOLEADORES
// ===============================


async function cargarGoleadores(){



let datos = await llamarAPI(

"players"

);





const contenedor=document.getElementById(

"goleadoresStats"

);





if(!contenedor){

return;

}





if(!datos.length){



contenedor.innerHTML="";

return;



}





contenedor.innerHTML=`



<div class="card">



<h3>

Máximos goleadores

</h3>





${datos.slice(0,10).map(j=>`



<div class="player-card">



<img src="${j.player.photo}">



<div>



<strong>

${j.player.name}

</strong>



<p>

${j.statistics?.[0]?.goals?.total || 0}

goles

</p>



</div>



</div>



`).join("")}






</div>



`;



}









// ===============================
// PERFIL
// ===============================


async function cargarPerfil(){



const contenido=document.getElementById(

"contenido"

);





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









// ===============================
// NOTIFICACIONES
// ===============================


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
// BUSCAR JUGADOR
// ===============================


function buscarJugador(id){



return jugadores.find(

j=>j.id==id

);



}









// ===============================
// MODAL JUGADOR
// ===============================


function mostrarJugador(id){



let jugador=buscarJugador(id);



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



<img src="${jugador.foto}" class="player-photo">



<h2>

${jugador.nombre}

</h2>



<p>

${jugador.posicion}

</p>



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









// ===============================
// LOGOS
// ===============================


function mostrarLogo(url,tamaño){



return `



<img

src="${url}"

class="logo-${tamaño}"

onerror="this.src='images/default.png'">



`;



}









// ===============================
// INICIO APP
// ===============================


document.addEventListener(

"DOMContentLoaded",

async()=>{



await cargarEquiposAPI();



await cargarPartidosAPI();



cargarInicio();



}

);
