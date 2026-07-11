// =======================================
// MATCHIQ MX
// SCRIPT.JS CORREGIDO
// PARTE 1/4
// =======================================


// ===============================
// CONFIGURACIÓN
// ===============================


const API_KEY = "TU_API_KEY";

const API_URL = "/api/football";


const ligaMX = 262;

const temporada = 2024;




let torneoSeleccionado = "clausura";

let jornadaSeleccionada = 1;



let partidos=[];

let partidosAPI=[];

let equiposAPI=[];

let tablaAPI=[];

let jugadoresAPI=[];



let notificaciones =

JSON.parse(localStorage.getItem("notificaciones")) || [];






// ===============================
// LLAMAR API VERCEL
// ===============================


async function llamarAPI(type,extra=""){


try{


const respuesta = await fetch(

`${API_URL}?type=${type}${extra}`

);



const data = await respuesta.json();


return data.response || [];



}

catch(error){


console.log(
"Error API",
error
);


return [];


}


}









// ===============================
// CARGAR EQUIPOS
// ===============================


async function cargarEquiposAPI(){



let datos = await llamarAPI(
"teams"
);




equiposAPI = datos.map(e=>({


id:e.team.id,


nombre:e.team.name,


logo:e.team.logo



}));



}









// ===============================
// BUSCAR EQUIPO
// ===============================


function buscarEquipo(id){



let equipo=equiposAPI.find(

e=>e.id==id

);



return equipo || {


id:id,


nombre:"Equipo",


logo:"images/default.png"



};


}









// ===============================
// CARGAR PARTIDOS
// ===============================


async function cargarPartidosAPI(){



let datos = await llamarAPI(
"fixtures"
);




let jornadaReal = datos.filter(p=>{


let nombre=p.league.round || "";



return nombre.includes(

`Regular Season - ${jornadaSeleccionada}`

);



});





if(jornadaReal.length===0){


jornadaReal=datos.filter(p=>{


let fecha = new Date(
p.fixture.date
);



return fecha;



});


}






partidosAPI=jornadaReal;




partidos = jornadaReal.map(p=>({



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

null,





prediccion:

"Analizando datos históricos y rendimiento"



}));






return partidos;


}






// ===============================
// LOGOS
// ===============================


function mostrarLogo(url,tipo="small"){



let clase="logo-small";



if(tipo==="medium"){

clase="logo-medium";

}



if(tipo==="table"){

clase="table-logo";

}




return `


<img

class="${clase}"

src="${url}"

onerror="this.src='images/default.png'">


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

Hora:
${p.hora}

</p>



<p>

Estadio:
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


async function cargarPartidos(){



const contenido=document.getElementById(
"contenido"
);



contenido.innerHTML=`


<h2>
Partidos Liga MX
</h2>



<div class="card">


<h3>
Torneo
</h3>



<select id="tipoTorneo"
onchange="cambiarTorneo()">



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



<select id="jornadaLiga"
onchange="cambiarJornada()">



${crearOpcionesJornadas()}



</select>



</div>



<div id="listaPartidosLiga">

Cargando...

</div>



`;




await cargarPartidosAPI();


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









// ===============================
// CAMBIAR TORNEO
// ===============================


async function cambiarTorneo(){



torneoSeleccionado=

document.getElementById(

"tipoTorneo"

).value;




await cargarPartidosAPI();


mostrarListaPartidos();



}








// ===============================
// CAMBIAR JORNADA
// ===============================


async function cambiarJornada(){



jornadaSeleccionada=

document.getElementById(

"jornadaLiga"

).value;



await cargarPartidosAPI();


mostrarListaPartidos();



}








// ===============================
// MOSTRAR PARTIDOS
// ===============================


function mostrarListaPartidos(){



let lista=document.getElementById(

"listaPartidosLiga"

);



if(!lista)return;





if(partidos.length===0){



lista.innerHTML=`


<div class="card">

No hay partidos registrados.

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





<h2>

VS

</h2>




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





<button onclick="mostrarAnalisis('${p.id}')">

Análisis

</button>



<button onclick="mostrarAlineacion('${p.local.id}','${p.visitante.id}')">

Alineaciones

</button>




</div>



`).join("");



}
// =======================================
// MATCHIQ MX
// SCRIPT.JS CORREGIDO
// PARTE 3/4
// =======================================


// ===============================
// PREDICCIONES
// ===============================


async function cargarPredicciones(){


const contenido=document.getElementById(
"contenido"
);



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

No hay partidos disponibles.

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

Análisis inteligente basado en:

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



if(!p)return;



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
Forma reciente
</h3>

<p>
Rendimiento de los últimos partidos y tendencia actual.
</p>



<h3>
Ataque
</h3>

<p>
Goles anotados, generación de oportunidades y efectividad ofensiva.
</p>




<h3>
Defensa
</h3>

<p>
Goles recibidos y comportamiento defensivo.
</p>




<h3>
Predicción MatchIQ
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
// ALINEACIONES EN CANCHA
// ===============================


async function mostrarAlineacion(local,visitante){



const contenido=document.getElementById(

"contenido"

);





contenido.innerHTML=`

<h2>
Cargando alineaciones...
</h2>

`;






let jugadoresLocal = await cargarJugadoresEquipo(local);


let jugadoresVisitante = await cargarJugadoresEquipo(visitante);





contenido.innerHTML=`


<button onclick="cargarPartidos()">

Regresar

</button>




<h2>

Alineaciones

</h2>






<div class="cancha">


<div class="equipo-cancha local">


${crearFormacion(

jugadoresLocal,

"local"

)}


</div>





<div class="linea-cancha">


VS

</div>





<div class="equipo-cancha visitante">


${crearFormacion(

jugadoresVisitante,

"visitante"

)}



</div>



</div>







<h2>

Bancas

</h2>



<div class="bancas">



<div>

<h3>

${buscarNombreEquipo(local)}

</h3>


${crearBanca(
jugadoresLocal.slice(11)
)}



</div>






<div>

<h3>

${buscarNombreEquipo(visitante)}

</h3>


${crearBanca(
jugadoresVisitante.slice(11)
)}



</div>



</div>



`;



}









// ===============================
// CARGAR JUGADORES API
// ===============================


async function cargarJugadoresEquipo(id){



let datos = await llamarAPI(

"players",

`&team=${id}`

);





if(!datos.length)return [];






return datos.map(j=>({


nombre:j.player.name,


foto:j.player.photo || "images/default.png",



posicion:

j.statistics?.[0]?.games?.position || "Jugador"



})).slice(0,18);



}








// ===============================
// FORMACION
// ===============================


function crearFormacion(lista,tipo){



let titulares=lista.slice(0,11);



let posiciones=[

1,
4,
4,
2

];




return titulares.map((j,index)=>{


return `


<div class="jugador-cancha posicion-${index}">


<img

src="${j.foto}"

onerror="this.src='images/default.png'">



<span>

${j.nombre}

</span>



</div>


`;


}).join("");



}








function crearBanca(lista){


return lista.map(j=>`


<div class="banca-jugador">


<img

src="${j.foto}"

onerror="this.src='images/default.png'">



${j.nombre}


</div>



`).join("");



}








function buscarNombreEquipo(id){


let e=equiposAPI.find(

x=>x.id==id

);



return e?

e.nombre:

"Equipo";


}
// =======================================
// MATCHIQ MX
// SCRIPT.JS CORREGIDO
// PARTE 4/4
// =======================================


// ===============================
// ESTADÍSTICAS COMPLETAS
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

Cargando datos...

</div>

`;






let tabla = await llamarAPI(
"standings"
);





if(!tabla.length){



contenido.innerHTML=`

<div class="card">

Error cargando estadísticas.

</div>


`;

return;


}






tablaAPI = tabla[0].league.standings[0];








let jugadores = await cargarEstadisticasJugadores();







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

class="table-logo"

src="${e.team.logo}"

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






<h2>

Líderes individuales

</h2>




<div class="stats-grid">



${crearTarjetasJugadores(jugadores)}



</div>



`;



}









// ===============================
// DATOS JUGADORES
// ===============================


async function cargarEstadisticasJugadores(){



let equipos= equiposAPI.slice(0,18);



let lista=[];





for(let e of equipos){



let jugadores = await llamarAPI(

"players",

`&team=${e.id}`

);





jugadores.slice(0,5).forEach(j=>{



let stat=j.statistics?.[0];



lista.push({



nombre:j.player.name,


foto:j.player.photo || "images/default.png",



equipo:e.nombre,



goles:

stat?.goals?.total || 0,



asistencias:

stat?.goals?.assists || 0,



apariciones:

stat?.games?.appearences || 0,



minutos:

stat?.games?.minutes || 0,



amarillas:

stat?.cards?.yellow || 0,



rojas:

stat?.cards?.red || 0,



contribuciones:

(stat?.goals?.total || 0)

+

(stat?.goals?.assists || 0)



});



});



}



return lista.sort(

(a,b)=>b.goles-a.goles

).slice(0,15);



}









// ===============================
// TARJETAS JUGADORES
// ===============================


function crearTarjetasJugadores(lista){



return lista.map(j=>`


<div class="stats-player-card">



<img

src="${j.foto}"

onerror="this.src='images/default.png'">





<div>


<h3>

${j.nombre}

</h3>



<p>

${j.equipo}

</p>




<p>

⚽ Goles: ${j.goles}

</p>



<p>

🎯 Asistencias: ${j.asistencias}

</p>



<p>

🔥 Contribuciones: ${j.contribuciones}

</p>



<p>

🟨 Amarillas: ${j.amarillas}

</p>



<p>

🟥 Rojas: ${j.rojas}

</p>



<p>

⏱ Minutos: ${j.minutos}

</p>



</div>



</div>



`).join("");



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


<img src="images/profile.svg"

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

Equipos Liga MX

</h3>



${equiposAPI.map(e=>`



<div class="team-follow">


<img

class="logo-small"

src="${e.logo}"

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
// NAVEGACIÓN
// ===============================


function mostrarSeccion(seccion){



if(seccion==="inicio")

cargarInicio();



if(seccion==="partidos")

cargarPartidos();



if(seccion==="predicciones")

cargarPredicciones();



if(seccion==="stats")

cargarStats();



if(seccion==="perfil")

cargarPerfil();



}









// ===============================
// INICIO
// ===============================


document.addEventListener(

"DOMContentLoaded",

async()=>{


await cargarEquiposAPI();



await cargarInicio();



}

);
