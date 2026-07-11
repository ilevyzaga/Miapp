// =======================================
// MATCHIQ MX
// SCRIPT.JS NUEVO
// PARTE 1
// =======================================


// ===============================
// VARIABLES
// ===============================


let notificaciones =
JSON.parse(localStorage.getItem("notificaciones")) || [];




// ===============================
// EQUIPOS LIGA MX
// ===============================


const equipos = [


{
id:"america",
nombre:"América",
logo:"images/america.png"
},


{
id:"atlas",
nombre:"Atlas",
logo:"images/atlas.png"
},


{
id:"atletico-san-luis",
nombre:"Atlético San Luis",
logo:"images/atleticosanluis.png"
},


{
id:"atlante",
nombre:"Atlante",
logo:"images/atlante.png"
},


{
id:"chivas",
nombre:"Chivas",
logo:"images/chivas.png"
},


{
id:"cruz-azul",
nombre:"Cruz Azul",
logo:"images/cruzazul.png"
},


{
id:"juarez",
nombre:"FC Juárez",
logo:"images/juarez.png"
},


{
id:"leon",
nombre:"León",
logo:"images/leon.png"
},


{
id:"monterrey",
nombre:"Monterrey",
logo:"images/monterrey.png"
},


{
id:"necaxa",
nombre:"Necaxa",
logo:"images/necaxa.png"
},


{
id:"pachuca",
nombre:"Pachuca",
logo:"images/pachuca.png"
},


{
id:"puebla",
nombre:"Puebla",
logo:"images/puebla.png"
},


{
id:"pumas",
nombre:"Pumas",
logo:"images/pumas.png"
},


{
id:"queretaro",
nombre:"Querétaro",
logo:"images/queretaro.png"
},


{
id:"santos",
nombre:"Santos Laguna",
logo:"images/santos.png"
},


{
id:"tigres",
nombre:"Tigres",
logo:"images/tigres.png"
},


{
id:"tijuana",
nombre:"Tijuana",
logo:"images/tijuana.png"
},


{
id:"toluca",
nombre:"Toluca",
logo:"images/toluca.png"
}


];









// ===============================
// TABLA DE POSICIONES
// ===============================


let tablaPosiciones = equipos.map((equipo,index)=>{


return {

pos:index+1,

equipo:equipo.nombre,

logo:equipo.logo,

pj:0,

pg:0,

pe:0,

pp:0,

gf:0,

gc:0,

dg:0,

pts:0

};


});









// ===============================
// JUGADORES
// PREPARADO PARA API
// ===============================


let jugadores=[



{

id:"henry-martin",


nombre:"Henry Martín",


equipo:"América",


posicion:"Delantero",


foto:"images/henry.png",



stats:{


goles:5,


asistencias:2,


contribuciones:7,


tirosPuerta:12,


conversion:40,


amarillas:1,


rojas:0



}



}



];









// ===============================
// PARTIDOS DE PRUEBA
// ===============================


const partidos=[



{

id:"america-toluca",


local:{


nombre:"América",

logo:"images/america.png"


},


visitante:{


nombre:"Toluca",

logo:"images/toluca.png"


},


hora:"20:00",


estadio:"Ciudad de los Deportes",



probabilidades:{


local:55,

empate:25,

visitante:20


},



prediccion:

"América tiene ventaja por ofensiva y rendimiento reciente.",



confianza:80,



marcadoresProbables:[


"2-1",

"1-0",

"1-1"


],




analisis:{


ataque:{


local:"Alto",

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



forma:{


local:"G-G-G-E-G",

visitante:"G-E-G-G-P"


},



factorClave:

"La efectividad ofensiva puede definir el partido."



}



},







{

id:"tigres-chivas",



local:{


nombre:"Tigres",

logo:"images/tigres.png"


},


visitante:{


nombre:"Chivas",

logo:"images/chivas.png"


},


hora:"21:00",


estadio:"Universitario",



probabilidades:{


local:45,

empate:30,

visitante:25


},



prediccion:

"Partido cerrado con ligera ventaja para Tigres.",



confianza:70,



marcadoresProbables:[


"1-0",

"1-1",

"2-1"


],



analisis:{


ataque:{


local:"Bueno",

visitante:"Bueno"


},



defensa:{


local:"Buena",

visitante:"Media"


},



golesRecibidos:{


local:7,

visitante:11


},



forma:{


local:"G-G-E-G-P",

visitante:"E-G-G-P-G"


},



factorClave:

"La defensa puede marcar diferencia."



}



},







{

id:"cruz-azul-monterrey",


local:{


nombre:"Cruz Azul",

logo:"images/cruzazul.png"


},


visitante:{


nombre:"Monterrey",

logo:"images/monterrey.png"


},


hora:"19:00",


estadio:"Ciudad de los Deportes",



probabilidades:{


local:40,

empate:30,

visitante:30


},



prediccion:

"Partido equilibrado con posibilidad de pocos goles.",



confianza:65,



marcadoresProbables:[


"1-1",

"1-0",

"2-1"


],



analisis:{


ataque:{


local:"Bueno",

visitante:"Alto"


},



defensa:{


local:"Buena",

visitante:"Buena"


},



golesRecibidos:{


local:9,

visitante:8


},



forma:{


local:"G-G-P-G-E",

visitante:"G-E-G-G-G"


},



factorClave:

"El control del mediocampo será importante."



}



}



];









// ===============================
// FUNCIONES BASE
// ===============================


function buscarPartido(id){


return partidos.find(

p=>p.id===id

);


}





function buscarJugador(id){


return jugadores.find(

j=>j.id===id

);


}




function mostrarLogo(src,tamaño="small"){


return `


<img

src="${src}"

class="logo-${tamaño}"

alt="logo">


`;


}






function barraProbabilidad(nombre,valor,tipo){


return `



<div class="probabilidad">


<div class="prob-header">


<span>${nombre}</span>


<strong>${valor}%</strong>


</div>





<div class="barra">


<div class="relleno ${tipo}"

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
// =======================================



// ===============================
// HOME
// ===============================


function cargarInicio(){


const contenido=document.getElementById("contenido");


let p=partidos[0];



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

${p.prediccion}

</p>








${barraProbabilidad(

p.local.nombre,

p.probabilidades.local,

"local"

)}








${barraProbabilidad(

"Empate",

p.probabilidades.empate,

"empate"

)}








${barraProbabilidad(

p.visitante.nombre,

p.probabilidades.visitante,

"visitante"

)}






</div>



`;



}









// ===============================
// PARTIDOS
// ===============================


function cargarPartidos(){


const contenido=document.getElementById("contenido");



contenido.innerHTML=`



<h2>

Partidos

</h2>







${partidos.map(p=>`



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





`).join("")}







`;



}









// ===============================
// ANALISIS
// ===============================


function mostrarAnalisis(id){



const p=buscarPartido(id);



const contenido=document.getElementById("contenido");



contenido.innerHTML=`




<button onclick="cargarPartidos()">

Regresar

</button>








<div class="card">







<div class="match-header">






<div>



${mostrarLogo(p.local.logo,"medium")}




<h3>

${p.local.nombre}

</h3>




</div>







<h2>

VS

</h2>








<div>



${mostrarLogo(p.visitante.logo,"medium")}





<h3>

${p.visitante.nombre}

</h3>





</div>







</div>








<h3>

Predicción

</h3>





<p>

${p.prediccion}

</p>







<p>

Confianza:

${p.confianza}%

</p>







<h3>

Probabilidad

</h3>








${barraProbabilidad(

p.local.nombre,

p.probabilidades.local,

"local"

)}








${barraProbabilidad(

"Empate",

p.probabilidades.empate,

"empate"

)}








${barraProbabilidad(

p.visitante.nombre,

p.probabilidades.visitante,

"visitante"

)}








<h3>

Marcadores probables

</h3>







${p.marcadoresProbables.map(m=>`



<p>

${m}

</p>



`).join("")}









<h3>

Ataque

</h3>







<p>

${p.local.nombre}:

${p.analisis.ataque.local}

</p>







<p>

${p.visitante.nombre}:

${p.analisis.ataque.visitante}

</p>








<h3>

Defensa

</h3>







<p>

${p.local.nombre}:

${p.analisis.defensa.local}

</p>







<p>

${p.visitante.nombre}:

${p.analisis.defensa.visitante}

</p>









<h3>

Goles recibidos

</h3>







<p>

${p.local.nombre}:

${p.analisis.golesRecibidos.local}

</p>







<p>

${p.visitante.nombre}:

${p.analisis.golesRecibidos.visitante}

</p>








<h3>

Forma reciente

</h3>







<p>

${p.local.nombre}:

${p.analisis.forma.local}

</p>







<p>

${p.visitante.nombre}:

${p.analisis.forma.visitante}

</p>








<h3>

Factor clave

</h3>







<p>

${p.analisis.factorClave}

</p>








</div>



`;



}









// ===============================
// PREDICCIONES
// ===============================


function cargarPredicciones(){



const contenido=document.getElementById("contenido");



contenido.innerHTML=`



<h2>

Predicciones

</h2>







${partidos.map(p=>`



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








<h3>

Predicción

</h3>







<p>

${p.prediccion}

</p>







<p>

Confianza:

${p.confianza}%

</p>








${barraProbabilidad(

p.local.nombre,

p.probabilidades.local,

"local"

)}








${barraProbabilidad(

"Empate",

p.probabilidades.empate,

"empate"

)}








${barraProbabilidad(

p.visitante.nombre,

p.probabilidades.visitante,

"visitante"

)}








<h3>

Marcadores probables

</h3>








${p.marcadoresProbables.map(m=>`



<p>

${m}

</p>



`).join("")}







</div>






`).join("")}







`;



}
// =======================================
// MATCHIQ MX
// SCRIPT.JS NUEVO
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
// POPUP JUGADOR
// ===============================


function mostrarJugador(id){



const jugador=buscarJugador(id);




if(!jugador){

return;

}







const popup=document.getElementById("player-popup");









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



const popup=document.getElementById("player-popup");



popup.style.display="none";



popup.innerHTML="";



}









// ===============================
// STATS DEL JUGADOR
// ===============================


function crearStatsJugador(jugador){



let s = jugador.stats || {};








// DELANTERO


if(jugador.posicion==="Delantero"){



return `




<div class="stats-box">





<h3>

Estadísticas ofensivas

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

Contribuciones de gol:

${s.contribuciones ?? "-"}

</p>








<p>

Tiros a puerta:

${s.tirosPuerta ?? "-"}

</p>








<p>

Conversión:

${s.conversion ?? "-"}%

</p>








<p>

Tarjetas amarillas:

${s.amarillas ?? "-"}

</p>








<p>

Tarjetas rojas:

${s.rojas ?? "-"}

</p>








</div>



`;



}









// MEDIOCAMPISTA


if(jugador.posicion==="Mediocampista"){



return `



<div class="stats-box">



<h3>

Estadísticas ofensivas

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

Contribuciones de gol:

${s.contribuciones ?? "-"}

</p>







<p>

Precisión de pases:

${s.precisionPases ?? "-"}%

</p>







<p>

Regates:

${s.regates ?? "-"}%

</p>







<p>

Tarjetas amarillas:

${s.amarillas ?? "-"}

</p>







<p>

Tarjetas rojas:

${s.rojas ?? "-"}

</p>







</div>



`;



}









// DEFENSA


if(jugador.posicion==="Defensa"){



return `



<div class="stats-box">



<h3>

Estadísticas defensivas

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

Intercepciones:

${s.intercepciones ?? "-"}

</p>







<p>

Despejes:

${s.despejes ?? "-"}

</p>







<p>

Entradas:

${s.entradas ?? "-"}

</p>







<p>

Tarjetas amarillas:

${s.amarillas ?? "-"}

</p>







<p>

Tarjetas rojas:

${s.rojas ?? "-"}

</p>







</div>



`;



}









// PORTERO


return `



<div class="stats-box">



<h3>

Estadísticas de portero

</h3>







<p>

Atajadas:

${s.atajadas ?? "-"}

</p>







<p>

Porcentaje de atajadas:

${s.porcentajeAtajadas ?? "-"}%

</p>







<p>

Goles recibidos:

${s.golesRecibidos ?? "-"}

</p>







<p>

Porterías en cero:

${s.porteriasCero ?? "-"}

</p>







<p>

Penales atajados:

${s.penalesAtajados ?? "-"}

</p>







</div>



`;



}
// =======================================
// MATCHIQ MX
// SCRIPT.JS NUEVO
// PARTE 4
// =======================================



// ===============================
// STATS GENERALES
// ===============================


function cargarStats(){


const contenido=document.getElementById("contenido");



contenido.innerHTML=`



<h2>

Stats

</h2>







<div class="card">



<h3>

Tabla de posiciones Liga MX

</h3>







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






${tablaPosiciones.map(e=>`



<tr>




<td>

${e.pos}

</td>







<td class="team-cell">



<img

src="${e.logo}"

class="table-logo">



${e.equipo}



</td>







<td>

${e.pj}

</td>


<td>

${e.pg}

</td>


<td>

${e.pe}

</td>


<td>

${e.pp}

</td>


<td>

${e.gf}

</td>


<td>

${e.gc}

</td>


<td>

${e.dg}

</td>


<td>

<strong>

${e.pts}

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

Goles

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

Goles más asistencias.

</p>



</div>









<div class="card stats-ranking">



<img

src="images/stats.svg"

class="section-icon">





<h3>

Tarjetas amarillas

</h3>



<p>

Ranking disciplinario.

</p>



</div>









<div class="card stats-ranking">



<img

src="images/stats.svg"

class="section-icon">





<h3>

Tarjetas rojas

</h3>



<p>

Ranking de expulsiones.

</p>



</div>






`;



}









// ===============================
// PERFIL
// ===============================


function cargarPerfil(){



const contenido=document.getElementById("contenido");



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
// LOGO LIGA MX
// VOLVER A HOME
// ===============================


document.addEventListener(

"DOMContentLoaded",

()=>{



const logoLiga=document.getElementById("ligaLogo");





if(logoLiga){



logoLiga.onclick=()=>{


cargarInicio();



};



}







cargarInicio();



}

);
