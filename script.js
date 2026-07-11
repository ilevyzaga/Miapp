// =======================================
// MATCHIQ MX
// SCRIPT.JS SPORTSDB
// PARTE 1/4
// =======================================


// ===============================
// CONFIGURACIÓN
// ===============================


const API_URL = "https://miapp-peach-six.vercel.app/api/sportsdb";


let temporada = 2026;

let partidos = [];

let equiposAPI = [];

let jugadoresAPI = [];

let notificaciones =
JSON.parse(localStorage.getItem("notificaciones")) || [];




// ===============================
// CONEXIÓN API
// ===============================


async function llamarAPI(type){


try{


const url = `${API_URL}?type=${type}`;


console.log("Consultando:", url);



const respuesta = await fetch(url);



const data = await respuesta.json();



console.log("Respuesta API:", data);





if(type === "teams"){


return data.teams || [];


}



if(type === "fixtures"){


return data.events || [];


}



return [];



}

catch(error){


console.log("Error API:", error);


return [];


}


}









// ===============================
// EQUIPOS
// ===============================


async function cargarEquiposAPI(){


let datos = await llamarAPI("teams");



if(!datos.length){


console.log("No llegaron equipos");


return;


}





equiposAPI = datos.map(e=>({


id:e.idTeam,


nombre:e.strTeam,


logo:e.strTeamBadge || "images/default.png"



}));



console.log("Equipos:", equiposAPI);



}









// ===============================
// BUSCAR EQUIPO
// ===============================


function buscarEquipo(id){



let equipo = equiposAPI.find(

e=>e.id == id

);



return equipo || {


nombre:"Equipo",

logo:"images/default.png"


};



}









// ===============================
// PARTIDOS
// ===============================


async function cargarPartidosAPI(){



let datos = await llamarAPI("fixtures");



if(!datos.length){


partidos=[];


return [];


}







partidos = datos.map(p=>({



id:p.idEvent,



local:{


id:p.idHomeTeam,


nombre:p.strHomeTeam,


logo:p.strHomeTeamBadge || "images/default.png"



},




visitante:{


id:p.idAwayTeam,


nombre:p.strAwayTeam,


logo:p.strAwayTeamBadge || "images/default.png"



},





fecha:p.dateEvent,





hora:p.strTime

?

p.strTime.substring(0,5)

:

"Por confirmar",





estadio:p.strVenue || "Por confirmar",





resultado:


p.intHomeScore !== null && p.intAwayScore !== null

?

`${p.intHomeScore}-${p.intAwayScore}`

:

"Pendiente"



}));







console.log("Partidos cargados:", partidos);



return partidos;



}









// ===============================
// LOGOS
// ===============================


function mostrarLogo(url,tamaño="small"){



let clase="logo-small";



if(tamaño==="medium")

clase="logo-medium";



if(tamaño==="large")

clase="logo-large";





return `

<img

class="${clase}"

src="${url || 'images/default.png'}"

onerror="this.src='images/default.png'"

>

`;



}









// ===============================
// INICIO
// ===============================


async function cargarInicio(){



const contenido =
document.getElementById("contenido");





contenido.innerHTML = `

<h2>

Inicio

</h2>


<div class="card">

Cargando partidos...

</div>

`;






if(partidos.length === 0){


await cargarPartidosAPI();


}






if(partidos.length === 0){



contenido.innerHTML = `

<h2>

Inicio

</h2>



<div class="card">

No hay partidos disponibles.

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

🕒 ${p.hora}

</p>




<p>

🏟 ${p.estadio}

</p>






<button onclick="mostrarAnalisis('${p.id}')">

Ver análisis

</button>



</div>



`;



}
// =======================================
// MATCHIQ MX
// SCRIPT.JS SPORTSDB
// PARTE 2/4
// =======================================


// ===============================
// PARTIDOS
// ===============================


async function cargarPartidos(){


const contenido =
document.getElementById("contenido");



contenido.innerHTML = `


<h2>

Partidos Liga MX

</h2>




<div class="card">


<select id="jornadaLiga">


<option>

Jornada 1

</option>


<option>

Jornada 2

</option>


<option>

Jornada 3

</option>


</select>


</div>





<div id="listaPartidosLiga">

Cargando...

</div>



`;





await cargarPartidosAPI();



mostrarListaPartidos();



}









// ===============================
// MOSTRAR PARTIDOS
// ===============================


function mostrarListaPartidos(){



const lista =
document.getElementById("listaPartidosLiga");



if(!lista)

return;







if(!partidos.length){



lista.innerHTML = `


<div class="card">

No hay partidos disponibles.

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

🕒 ${p.hora}

</p>





<p>

🏟 ${p.estadio}

</p>






<p>

Resultado: ${p.resultado}

</p>






<button onclick="mostrarAnalisis('${p.id}')">

Análisis

</button>





<button onclick="mostrarAlineaciones('${p.id}')">

Alineaciones

</button>





</div>



`).join("");



}









// ===============================
// ANALISIS
// ===============================


function mostrarAnalisis(id){



let p =
partidos.find(

x=>x.id == id

);





if(!p)

return;








document.getElementById("contenido").innerHTML = `



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

Análisis basado en resultados, rendimiento y contexto del partido.

</p>






<h3>

Probabilidades

</h3>






<p>

${p.local.nombre}: 40%

</p>





<p>

Empate: 30%

</p>





<p>

${p.visitante.nombre}: 30%

</p>








<h3>

Marcadores probables

</h3>





<p>

1-0 / 1-1 / 2-1

</p>





</div>



`;



}









// ===============================
// ALINEACIONES
// ===============================


async function mostrarAlineaciones(id){



let partido =
partidos.find(

p=>p.id == id

);





if(!partido)

return;






document.getElementById("contenido").innerHTML = `



<button onclick="cargarPartidos()">

← Regresar

</button>







<div class="card">



<h2>

${partido.local.nombre}

VS

${partido.visitante.nombre}

</h2>






<h3>

Alineaciones

</h3>






<p>

Las alineaciones se agregarán cuando conectemos la API de jugadores.

</p>





</div>



`;



}









// ===============================
// PREDICCIONES
// ===============================


async function cargarPredicciones(){



const contenido =
document.getElementById("contenido");





contenido.innerHTML = `



<h2>

Predicciones MatchIQ

</h2>





<div class="card">


Selecciona un partido para ver la predicción inteligente.

</div>



`;



}
// =======================================
// MATCHIQ MX
// SCRIPT.JS SPORTSDB
// PARTE 3/4
// =======================================


// ===============================
// JUGADOR (TEMPORAL)
// ===============================


function mostrarJugador(id){


let jugador =
jugadoresAPI.find(

j=>j.id == id

);



if(!jugador)

return;





let popup =
document.getElementById("player-popup");





if(!popup)

return;







popup.innerHTML = `


<div class="popup-background"

onclick="cerrarJugador()">

</div>






<div class="player-modal">



<h2>

${jugador.nombre}

</h2>




<p>

${jugador.posicion || "Jugador"}

</p>





<button onclick="cerrarJugador()">

Cerrar

</button>



</div>



`;






popup.style.display="block";



}









function cerrarJugador(){



let popup =
document.getElementById("player-popup");



if(popup){



popup.style.display="none";

popup.innerHTML="";


}



}









// ===============================
// PERFIL
// ===============================


async function cargarPerfil(){



const contenido =
document.getElementById("contenido");






if(!equiposAPI.length){


await cargarEquiposAPI();


}







contenido.innerHTML = `



<h2>

Perfil

</h2>







<div class="card">



<h3>

Equipos Liga MX

</h3>







${
equiposAPI.map(e=>`




<div class="team-follow">





<img

src="${e.logo}"

class="logo-small"

onerror="this.src='images/default.png'"

>





<strong>

${e.nombre}

</strong>






<button onclick="cambiarNotificacion('${e.id}')">


${
notificaciones.includes(String(e.id))

?

"Siguiendo"

:

"Seguir"

}



</button>





</div>




`).join("")
}







</div>



`;



}









// ===============================
// NOTIFICACIONES
// ===============================


function cambiarNotificacion(id){



id = String(id);





if(notificaciones.includes(id)){



notificaciones =
notificaciones.filter(

x=>x !== id

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
// ESTADÍSTICAS
// ===============================


async function cargarStats(){



const contenido =
document.getElementById("contenido");





contenido.innerHTML = `



<h2>

Estadísticas Liga MX

</h2>





<div class="card">


Las estadísticas estarán disponibles próximamente.

</div>



`;



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
// =======================================
// MATCHIQ MX
// SCRIPT.JS SPORTSDB
// PARTE 4/4
// =======================================


// ===============================
// INICIO DE LA APP
// ===============================


document.addEventListener(

"DOMContentLoaded",

async()=>{



console.log(

"MatchIQ iniciado"

);





await cargarEquiposAPI();





await cargarInicio();



}

);
