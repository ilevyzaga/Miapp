// =======================================
// MATCHIQ MX
// SCRIPT.JS COMPLETO
// PARTE 1
// =======================================


// ===============================
// CONFIGURACIÓN
// ===============================

const API_KEY = "TU_API_KEY";

const API_URL = "https://v3.football.api-sports.io";

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

let partidosAPI = [];

let tablaAPI = [];




// ===============================
// EQUIPOS LIGA MX
// ===============================


const equipos = [


{
id:2278,
nombre:"Chivas",
logo:"images/chivas.png"
},


{
id:2279,
nombre:"Tigres",
logo:"images/tigres.png"
},


{
id:2280,
nombre:"Tijuana",
logo:"images/tijuana.png"
},


{
id:2281,
nombre:"Toluca",
logo:"images/toluca.png"
},


{
id:2282,
nombre:"Monterrey",
logo:"images/monterrey.png"
},


{
id:2283,
nombre:"Atlas",
logo:"images/atlas.png"
},


{
id:2285,
nombre:"Santos Laguna",
logo:"images/santos.png"
},


{
id:2286,
nombre:"Pumas",
logo:"images/pumas.png"
},


{
id:2287,
nombre:"América",
logo:"images/america.png"
},


{
id:2288,
nombre:"Necaxa",
logo:"images/necaxa.png"
},


{
id:2289,
nombre:"León",
logo:"images/leon.png"
},


{
id:2290,
nombre:"Querétaro",
logo:"images/queretaro.png"
},


{
id:2291,
nombre:"Puebla",
logo:"images/puebla.png"
},


{
id:2292,
nombre:"Pachuca",
logo:"images/pachuca.png"
},


{
id:2295,
nombre:"Cruz Azul",
logo:"images/cruzazul.png"
},


{
id:2298,
nombre:"FC Juárez",
logo:"images/juarez.png"
},


{
id:2314,
nombre:"Atlético San Luis",
logo:"images/atleticosanluis.png"
},


{
id:14002,
nombre:"Mazatlán",
logo:"images/mazatlan.png"
}


];




// ===============================
// JUGADORES
// ===============================


let jugadores = [


{
id:"henry-martin",

nombre:"Henry Martín",

equipo:"América",

posicion:"Delantero",

foto:"images/henry.png",

stats:{

goles:0,

asistencias:0,

tirosPuerta:0,

amarillas:0,

rojas:0

}

}


];




// ===============================
// LLAMAR API
// ===============================


async function llamarAPI(endpoint){


try{


const respuesta = await fetch(

API_URL + endpoint,

{

headers:{

"x-apisports-key":API_KEY

}

}

);



const data = await respuesta.json();



return data.response || [];


}

catch(error){


console.log("Error API:",error);


return [];


}



}




// ===============================
// CARGAR PARTIDOS API
// ===============================


async function cargarPartidosAPI(){



const datos = await llamarAPI(

`/fixtures?league=${ligaMX}&season=${temporada}&round=Regular Season - ${jornadaSeleccionada}`

);



partidosAPI = datos;



return datos;



}




// ===============================
// BUSCAR EQUIPO
// ===============================


function buscarEquipoAPI(nombre){



return equipos.find(e =>


nombre.toLowerCase()

.includes(

e.nombre.toLowerCase()

)


)

||

{

nombre:nombre,

logo:"images/default.png"

};



}
// =======================================
// MATCHIQ MX
// SCRIPT.JS COMPLETO
// PARTE 2
// =======================================


// ===============================
// INICIO
// ===============================


function cargarInicio(){


const contenido=document.getElementById("contenido");


let p = partidos[0];



if(!p){


contenido.innerHTML=`

<div class="card">

<h2>

MatchIQ MX

</h2>


<p>

No hay partidos cargados todavía.

</p>


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


${mostrarLogo(p.local.logo,"medium")}


<strong>

${p.local.nombre}

</strong>


</div>



<h2>

VS

</h2>



<div>


${mostrarLogo(p.visitante.logo,"medium")}


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



<button onclick="mostrarAlineacion('${p.local.nombre}')">

Ver alineaciones

</button>



</div>




<div class="card">


<h3>

Predicción MatchIQ

</h3>


<p>

${p.prediccion || "Analizando datos..."}

</p>



</div>


`;



}





// ===============================
// PARTIDOS
// APERTURA / CLAUSURA
// JORNADAS
// ===============================


function cargarPartidos(){


const contenido=document.getElementById("contenido");



contenido.innerHTML=`



<h2>

Partidos Liga MX

</h2>




<div class="card">


<h3>

Torneo

</h3>



<select id="tipoTorneo" onchange="actualizarPartidos()">



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




<select id="jornadaLiga" onchange="actualizarPartidos()">



${crearOpcionesJornadas()}



</select>



</div>





<div id="listaPartidosLiga">


${crearListaPartidos()}


</div>



`;



}





// ===============================
// CREAR JORNADAS
// ===============================


function crearOpcionesJornadas(){


let opciones="";


for(let i=1;i<=17;i++){


opciones+=`


<option value="${i}">

Jornada ${i}

</option>


`;


}



return opciones;


}







// ===============================
// ACTUALIZAR PARTIDOS
// ===============================


function actualizarPartidos(){



const torneo =
document.getElementById("tipoTorneo").value;



const jornada =
document.getElementById("jornadaLiga").value;



torneoSeleccionado = torneo;


jornadaSeleccionada = jornada;



document.getElementById(

"listaPartidosLiga"

).innerHTML = crearListaPartidos();



}





// ===============================
// CREAR LISTA PARTIDOS
// ===============================


function crearListaPartidos(){



let torneo =

document.getElementById("tipoTorneo")?.value

||

torneoSeleccionado;



let jornada =

document.getElementById("jornadaLiga")?.value

||

jornadaSeleccionada;





let partidosFiltrados = partidos.filter(p=>


p.torneo === torneo &&

p.jornada == jornada


);






if(partidosFiltrados.length===0){


return `


<div class="card">


<p>

No hay partidos registrados para esta jornada.

</p>


</div>


`;


}





return partidosFiltrados.map(p=>`



<div class="card">



<div class="match-header">



<div>


${mostrarLogo(p.local.logo,"small")}


<strong>

${p.local.nombre}

</strong>


</div>




<h3>

VS

</h3>




<div>


${mostrarLogo(p.visitante.logo,"small")}


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




${p.resultado ?


`

<h3>

Resultado: ${p.resultado}

</h3>


`

:

""

}





<button onclick="mostrarAnalisis('${p.id}')">

Ver análisis

</button>




<button onclick="mostrarAlineacion('${p.local.nombre}')">

Ver alineaciones

</button>



</div>



`).join("");



}
// =======================================
// MATCHIQ MX
// SCRIPT.JS COMPLETO
// PARTE 3
// =======================================


// ===============================
// ALINEACIONES
// ===============================


function mostrarAlineacion(equipo){


const contenido=document.getElementById("contenido");



let plantilla = jugadores.filter(

jugador=>jugador.equipo===equipo

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

onclick="mostrarJugador('${j.id}')">



<img

src="${j.foto}"

alt="${j.nombre}">





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

Alineación oficial cargando desde API...

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



const jugador = buscarJugador(id);



if(!jugador){

return;

}



const popup = document.getElementById(

"player-popup"

);



if(!popup){

return;

}




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




${crearStatsJugador(jugador)}




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



if(popup){


popup.style.display="none";


popup.innerHTML="";


}



}








// ===============================
// ESTADÍSTICAS JUGADOR
// ===============================


function crearStatsJugador(jugador){



let s = jugador.stats || {};



return `



<div class="stats-box">


<h3>

Estadísticas

</h3>



<p>

Goles: ${s.goles ?? "-"}

</p>



<p>

Asistencias: ${s.asistencias ?? "-"}

</p>



<p>

Tiros a puerta: ${s.tirosPuerta ?? "-"}

</p>



<p>

Tarjetas amarillas: ${s.amarillas ?? "-"}

</p>



<p>

Tarjetas rojas: ${s.rojas ?? "-"}

</p>



</div>



`;



}








// ===============================
// PREDICCIONES
// ===============================


function cargarPredicciones(){



const contenido=document.getElementById(

"contenido"

);



contenido.innerHTML=`



<h2>

Predicciones MatchIQ

</h2>





${
partidos.map(p=>`



<div class="card">



<h3>

${p.local.nombre}

VS

${p.visitante.nombre}

</h3>




<p>

${p.prediccion || "Analizando estadísticas..."}

</p>




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



let p = partidos.find(

x=>x.id===id

);




if(!p){


alert("Partido no encontrado");


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




<h3>

Predicción MatchIQ

</h3>



<p>

${p.prediccion || "Calculando..."}

</p>




<h3>

Marcadores probables

</h3>



<p>

2-1

</p>


<p>

1-1

</p>


<p>

1-0

</p>




</div>



`;



}







// ===============================
// BUSCAR JUGADOR
// ===============================


function buscarJugador(id){


return jugadores.find(

j=>j.id===id

);



}
// =======================================
// MATCHIQ MX
// SCRIPT.JS COMPLETO
// PARTE 4
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

Cargando estadísticas...

</p>


</div>



`;



try{


let datos = await llamarAPI(

`/standings?league=${ligaMX}&season=${temporada}`

);



tablaAPI = datos[0].league.standings[0];



contenido.innerHTML=`



<h2>

Tabla Liga MX

</h2>



<div class="card">



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



<td>

<img src="${e.team.logo}" width="30">

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

catch(error){



contenido.innerHTML=`



<div class="card">

Error cargando estadísticas

</div>



`;



}



}







// ===============================
// PERFIL
// ===============================


function cargarPerfil(){



const contenido=document.getElementById(

"contenido"

);



contenido.innerHTML=`



<h2>

Perfil

</h2>




<div class="card">



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



<img

src="${e.logo}"

width="35">



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
// LOGOS
// ===============================


function mostrarLogo(url,tamano){



return `



<img

src="${url}"

class="logo-${tamano}"

alt="logo"



>



`;



}








// ===============================
// CARGA INICIAL
// ===============================


document.addEventListener(

"DOMContentLoaded",

()=>{



const logoLiga=document.getElementById(

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
