// =======================================
// MATCHIQ MX
// SCRIPT.JS COMPLETO
// PARTE 1/4
// =======================================


// ===============================
// CONFIGURACIÓN API
// ===============================


const API_KEY = "TU_API_KEY";

const API_URL = "https://v3.football.api-sports.io";

const ligaMX = 262;


// Liga MX Clausura/Apertura
const temporada = 2024;





// ===============================
// VARIABLES GLOBALES
// ===============================


let notificaciones =
JSON.parse(localStorage.getItem("notificaciones")) || [];



let torneoSeleccionado = "clausura";

let jornadaSeleccionada = 1;



let partidos = [];

let partidosAPI = [];

let tablaAPI = [];

let equiposAPI = [];

let jugadores = [];






// ===============================
// EQUIPOS BASE
// ===============================


let equipos = [


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
// LLAMADA API FOOTBALL
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


console.log(
"Error API:",
error
);


return [];


}


}







// ===============================
// CARGAR EQUIPOS DESDE API
// ===============================


async function cargarEquiposAPI(){



let datos = await llamarAPI(

`/teams?league=${ligaMX}&season=${temporada}`

);



if(datos.length>0){



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



let equipoAPI = equiposAPI.find(e=>

nombre.toLowerCase()

.includes(

e.nombre.toLowerCase()

)

);



if(equipoAPI){


return equipoAPI;


}




let equipoBase = equipos.find(e=>

nombre.toLowerCase()

.includes(

e.nombre.toLowerCase()

)

);



return equipoBase || {


nombre:nombre,

logo:"images/default.png"

};



}









// ===============================
// CARGAR PARTIDOS API
// ===============================


async function cargarPartidosAPI(){



let torneo = torneoSeleccionado;



let ronda =

`Regular Season - ${jornadaSeleccionada}`;



let datos = await llamarAPI(

`/fixtures?league=${ligaMX}&season=${temporada}&round=${ronda}`

);





if(datos.length===0){


partidos=[];

return [];


}







partidosAPI = datos;







partidos = datos.map(p=>{



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

p.goals.home !== null

?

`${p.goals.home}-${p.goals.away}`

:

null,





prediccion:

"Predicción generada por MatchIQ con estadísticas del equipo"



};



});





return partidos;



}









// ===============================
// LOGOS
// ===============================


function mostrarLogo(url,tamaño){



let width = 40;



if(tamaño==="medium"){

width=80;

}



if(tamaño==="small"){

width=35;

}





return `


<img

src="${url}"

width="${width}"

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


const contenido = document.getElementById(
"contenido"
);



contenido.innerHTML = `


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



contenido.innerHTML = `


<h2>
Inicio
</h2>


<div class="card">

<p>
No hay partidos cargados todavía.
</p>

</div>


`;



return;


}





let p = partidos[0];






contenido.innerHTML = `


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







<div class="card">


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



const contenido=document.getElementById(
"contenido"
);





contenido.innerHTML=`


<h2>
Partidos Liga MX
</h2>




<div class="card">



<h3>
Selecciona torneo
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
Selecciona jornada
</h3>




<select id="jornadaLiga" onchange="cambiarJornada()">



${crearOpcionesJornadas()}



</select>




</div>






<div id="listaPartidosLiga">


Cargando partidos...


</div>



`;





await cargarPartidosAPI();



mostrarListaPartidos();



}









// ===============================
// CREAR JORNADAS
// ===============================


function crearOpcionesJornadas(){



let opciones="";



for(let i=1;i<=17;i++){



opciones += `


<option value="${i}"
${i==jornadaSeleccionada ? "selected":""}
>

Jornada ${i}

</option>


`;



}



return opciones;



}









// ===============================
// CAMBIAR TORNEO
// ===============================


async function cambiarTorneo(){



torneoSeleccionado =

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



jornadaSeleccionada =

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



const lista = document.getElementById(
"listaPartidosLiga"
);




if(!lista){

return;

}






if(partidos.length===0){



lista.innerHTML=`



<div class="card">


<p>

No hay partidos registrados para esta jornada.

</p>


</div>



`;



return;

}





lista.innerHTML = partidos.map(p=>`



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

p.resultado ?

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


<p>

No hay partidos disponibles para analizar.

</p>


</div>


`


:


partidos.map(p=>`



<div class="card">


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

Historial entre equipos

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
// ANALISIS PARTIDO
// ===============================


function mostrarAnalisis(id){



let p = partidos.find(

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





<h3>

Predicción MatchIQ

</h3>



<p>

${p.prediccion}

</p>







<h3>

Resultado

</h3>



<p>

${p.resultado || "Pendiente"}

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
// ALINEACIONES
// ===============================


function mostrarAlineacion(equipo){



const contenido=document.getElementById(
"contenido"
);




let plantilla = jugadores.filter(

j=>

j.equipo===equipo

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
plantilla.length>0


?


plantilla.map(j=>`



<div class="player-card"

onclick="mostrarJugador('${j.id}')">


<img

src="${j.foto}"

alt="${j.nombre}">






<strong>

${j.nombre}

</strong>



<p>

${j.posicion}

</p>





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



let jugador = buscarJugador(id);





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

class="player-photo"

alt="${jugador.nombre}">






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



let popup=document.getElementById(
"player-popup"
);




popup.style.display="none";



popup.innerHTML="";



}









// ===============================
// BUSCAR JUGADOR
// ===============================


function buscarJugador(id){



return jugadores.find(

j=>

j.id===id

);



}









// ===============================
// STATS JUGADOR
// ===============================


function crearStatsJugador(jugador){



let s = jugador.stats || {};





return `



<div class="stats-box">



<h3>

Estadísticas

</h3>




<p>

Goles:

${s.goles ?? "-"}

</p>




<p>

Asistencias:

${s.asistencias ?? "-"}

</p>




<p>

Tiros a puerta:

${s.tirosPuerta ?? "-"}

</p>




<p>

Amarillas:

${s.amarillas ?? "-"}

</p>




<p>

Rojas:

${s.rojas ?? "-"}

</p>




</div>



`;



}
// =======================================
// MATCHIQ MX
// SCRIPT.JS COMPLETO
// PARTE 4/4
// =======================================


// ===============================
// ESTADÍSTICAS LIGA MX
// ===============================


async function cargarStats(){


const contenido=document.getElementById(
"contenido"
);




contenido.innerHTML=`



<h2>

Stats Liga MX

</h2>




<div class="card">


<p>

Cargando tabla oficial...

</p>


</div>



`;





try{



let datos = await llamarAPI(

`/standings?league=${ligaMX}&season=${temporada}`

);






if(!datos || datos.length===0){


throw new Error(
"Sin datos"
);


}







tablaAPI = datos[0].league.standings[0];






contenido.innerHTML=`



<h2>

Tabla Liga MX 2024

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



<img

src="${e.team.logo}"

width="35">



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



console.log(
error
);




contenido.innerHTML=`



<div class="card">


<p>

Error cargando estadísticas.

</p>


</div>



`;



}



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







let lista = equiposAPI.length>0

?

equiposAPI

:

equipos;







contenido.innerHTML=`



<h2>

Perfil

</h2>







<div class="card">



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






${lista.map(e=>`



<div class="team-follow">






<img

src="${e.logo}"

width="40"

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

x=>

x!==id

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

async ()=>{



const logoLiga=document.getElementById(
"ligaLogo"
);





if(logoLiga){



logoLiga.onclick=()=>{


cargarInicio();


};



}






await cargarEquiposAPI();



await cargarInicio();



}

);
