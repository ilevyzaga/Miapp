// =======================================
// MATCHIQ MX
// SCRIPT.JS ACTUALIZADO
// PARTE 1/4
// =======================================


// ===============================
// CONFIGURACIÓN
// ===============================


const API_URL = "/api/football";


const ligaMX = 262;


const temporada = 2024;





// ===============================
// VARIABLES GLOBALES
// ===============================


let torneoSeleccionado = "clausura";


let jornadaSeleccionada = 1;


let partidos = [];


let equiposAPI = [];


let tablaAPI = [];


let jugadoresAPI = [];



let notificaciones =

JSON.parse(localStorage.getItem("notificaciones")) || [];






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
id:2287,
nombre:"América",
logo:"images/america.png"
},


{
id:2295,
nombre:"Cruz Azul",
logo:"images/cruzazul.png"
},


{
id:2292,
nombre:"Pachuca",
logo:"images/pachuca.png"
},


{
id:2286,
nombre:"Pumas",
logo:"images/pumas.png"
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
id:2298,
nombre:"FC Juárez",
logo:"images/juarez.png"
},


{
id:14002,
nombre:"Mazatlán",
logo:"images/mazatlan.png"
},


{
id:2314,
nombre:"Atlético San Luis",
logo:"images/atleticosanluis.png"
}


];








// ===============================
// LLAMADA API VERCEL
// ===============================


async function llamarAPI(type,extra=""){


try{


let respuesta = await fetch(

`${API_URL}?type=${type}${extra}`

);



let datos = await respuesta.json();



return datos.response || [];



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



let api = equiposAPI.find(e=>


nombre.toLowerCase()

.includes(

e.nombre.toLowerCase()

)


);



if(api){

return api;

}




let base = equipos.find(e=>


nombre.toLowerCase()

.includes(

e.nombre.toLowerCase()

)


);



return base || {


nombre:nombre,


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





if(!datos.length){


partidos=[];


return;


}







let filtroJornada = datos.filter(p=>{


let round = p.league.round || "";


return round.includes(

String(jornadaSeleccionada)

);



});







partidos = filtroJornada.map(p=>({



id:p.fixture.id,



local:{


nombre:p.teams.home.name,


logo:p.teams.home.logo,


id:p.teams.home.id


},




visitante:{


nombre:p.teams.away.name,


logo:p.teams.away.logo,


id:p.teams.away.id


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




fecha:p.fixture.date,




estadio:

p.fixture.venue?.name || "Por confirmar",




resultado:

p.goals.home!==null

?

`${p.goals.home}-${p.goals.away}`

:

null,




prediccion:

"Analizando datos de forma, goles y rendimiento"


}));





}
// =======================================
// MATCHIQ MX
// SCRIPT.JS ACTUALIZADO
// PARTE 2/4
// =======================================


// ===============================
// INICIO
// ===============================


async function cargarInicio(){


const contenido = document.getElementById(
"contenido"
);



contenido.innerHTML=`

<h2>Inicio</h2>

<div class="card">
<p>Cargando partidos...</p>
</div>

`;



if(partidos.length===0){

await cargarPartidosAPI();

}





if(partidos.length===0){


contenido.innerHTML=`

<h2>Inicio</h2>

<div class="empty-state">

<p>
No hay partidos cargados todavía.
</p>

</div>

`;


return;

}




let p = partidos[0];





contenido.innerHTML=`

<h2>Inicio</h2>


<div class="card home-match">


<h3>
Partido destacado
</h3>



<div class="match-header">


<div>

<img 
class="logo-medium"
src="${p.local.logo}"
onerror="this.src='images/default.png'">

<strong>
${p.local.nombre}
</strong>


</div>




<h2>
VS
</h2>




<div>


<img 
class="logo-medium"
src="${p.visitante.logo}"
onerror="this.src='images/default.png'">


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

Cargando partidos...

</div>

`;



await cargarPartidosAPI();



mostrarListaPartidos();


}








// ===============================
// JORNADAS
// ===============================


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
// LISTA PARTIDOS
// ===============================


function mostrarListaPartidos(){



let lista=document.getElementById(

"listaPartidosLiga"

);



if(!lista)return;





if(partidos.length===0){



lista.innerHTML=`

<div class="empty-state">

No hay partidos para esta jornada.

</div>

`;



return;


}







lista.innerHTML = partidos.map(p=>`



<div class="card">


<div class="match-header">


<div>


<img 
class="logo-small"
src="${p.local.logo}"
onerror="this.src='images/default.png'">


<strong>

${p.local.nombre}

</strong>


</div>





<h2>

VS

</h2>





<div>


<img 
class="logo-small"
src="${p.visitante.logo}"
onerror="this.src='images/default.png'">


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
Resultado ${p.resultado}
</h3>
`

:""

}




<button onclick="mostrarAnalisis('${p.id}')">

Ver análisis

</button>



<button onclick="mostrarAlineacion('${p.local.id}','${p.visitante.id}')">

Alineaciones

</button>



</div>



`).join("");
  



}
// =======================================
// MATCHIQ MX
// SCRIPT.JS ACTUALIZADO
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

<div class="empty-state">

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
// ANALISIS COMPLETO
// ===============================


function mostrarAnalisis(id){



let p = partidos.find(x=>x.id==id);



if(!p)return;



let contenido=document.getElementById(

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

Se evaluará rendimiento de últimos partidos, goles y resultados.

</p>



<h3>

Ataque

</h3>


<p>

Promedio de goles anotados y capacidad ofensiva.

</p>




<h3>

Defensa

</h3>


<p>

Goles recibidos y solidez defensiva.

</p>




<h3>

Predicción final MatchIQ

</h3>


<p>

Marcadores probables:

</p>



<div class="score-box">


<div>
2 - 1
</div>


<div>
1 - 1
</div>


<div>
1 - 0
</div>



</div>



</div>


</div>


`;



}









// ===============================
// ALINEACIONES COMPLETAS
// ===============================


async function mostrarAlineacion(local,visitante){



const contenido=document.getElementById(

"contenido"

);





contenido.innerHTML=`


<h2>

Alineaciones

</h2>


<div class="card">

Cargando alineaciones...

</div>


`;







let jugadoresLocal = await cargarJugadoresEquipo(local);


let jugadoresVisitante = await cargarJugadoresEquipo(visitante);








contenido.innerHTML=`


<button onclick="cargarPartidos()">

Regresar

</button>





<h2>

Cancha

</h2>




<div class="cancha-container">



<div class="linea-jugadores">

${crearJugadorCancha(jugadoresLocal.slice(0,1))}

</div>



<div class="linea-jugadores">

${crearJugadorCancha(jugadoresLocal.slice(1,4))}

</div>



<div class="linea-jugadores">

${crearJugadorCancha(jugadoresLocal.slice(4,8))}

</div>



<div class="linea-jugadores">

${crearJugadorCancha(jugadoresLocal.slice(8,11))}

</div>



</div>







<div class="alineaciones-doble">



<div class="equipo-alineacion">


<h3>

${buscarNombreEquipo(local)}

</h3>



${crearListaJugadores(jugadoresLocal)}

</div>







<div class="equipo-alineacion">


<h3>

${buscarNombreEquipo(visitante)}

</h3>




${crearListaJugadores(jugadoresVisitante)}

</div>




</div>

`;



}









// ===============================
// CARGAR JUGADORES
// ===============================


async function cargarJugadoresEquipo(id){



let datos = await llamarAPI(

"players",

`&team=${id}`

);



if(!datos.length)return [];




return datos.slice(0,18).map(j=>({


nombre:j.player.name,


foto:

j.player.photo || "images/default.png",



posicion:

j.statistics?.[0]?.games?.position || "Jugador"



}));


}









// ===============================
// JUGADORES CANCHA
// ===============================


function crearJugadorCancha(lista){


return lista.map(j=>`


<div class="jugador-cancha">


<img src="${j.foto}"
onerror="this.src='images/default.png'">


<span>

${j.nombre}

</span>


</div>


`).join("");



}








// ===============================
// LISTA JUGADORES
// ===============================


function crearListaJugadores(lista){


return lista.map(j=>`


<div class="player-card">


<img src="${j.foto}"
onerror="this.src='images/default.png'">


<div>


<strong>

${j.nombre}

</strong>



<p>

${j.posicion}

</p>


</div>



</div>


`).join("");



}






function buscarNombreEquipo(id){


let e = equiposAPI.find(x=>x.id==id);



return e ? e.nombre : "Equipo";



}
// =======================================
// MATCHIQ MX
// SCRIPT.JS ACTUALIZADO
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

Cargando estadísticas...

</div>

`;





let datos = await llamarAPI(

"standings"

);





if(!datos.length){


contenido.innerHTML=`

<div class="empty-state">

Error cargando estadísticas.

</div>

`;

return;

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





<div class="stats-card">


<h3>

Goleadores

</h3>



${crearGoleadores()}



</div>

`;



}








// ===============================
// GOLEADORES
// ===============================


function crearGoleadores(){


let goleadores=[


{
nombre:"Henry Martín",
equipo:"América",
goles:0,
foto:"images/henry.png"
},


{
nombre:"André-Pierre Gignac",
equipo:"Tigres",
goles:0,
foto:"images/gignac.png"
},


{
nombre:"Alexis Vega",
equipo:"Toluca",
goles:0,
foto:"images/alexis.png"
}


];




return goleadores.map(j=>`



<div class="goleador-card">


<img

src="${j.foto}"

onerror="this.src='images/default.png'">



<div class="goleador-info">


<strong>

${j.nombre}

</strong>



<span>

${j.equipo}

</span>



<span>

${j.goles} goles

</span>


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

Equipos Liga MX

</h3>





${equiposAPI.map(e=>`


<div class="team-follow">


<img

src="${e.logo}"

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


}else{


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
