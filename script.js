// =======================================
// MATCHIQ MX
// SCRIPT.JS COMPLETO
// PARTE 1/4
// =======================================


// ===============================
// VARIABLES GLOBALES
// ===============================


let notificaciones = 
JSON.parse(localStorage.getItem("notificaciones")) || [];





// ===============================
// EQUIPOS
// Preparado para API
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
id:"atlante",
nombre:"Atlante",
logo:"images/atlante.png"
},


{
id:"atletico-san-luis",
nombre:"Atlético San Luis",
logo:"images/atleticosanluis.png"
},


{
id:"cruz-azul",
nombre:"Cruz Azul",
logo:"images/cruzazul.png"
},


{
id:"chivas",
nombre:"Chivas",
logo:"images/chivas.png"
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
// JUGADORES
// Después API reemplaza estos datos
// ===============================


let jugadores = [


/*

Ejemplo de estructura para API:


{
id:"jugador1",
nombre:"",
equipo:"",
posicion:"",
numero:"",
foto:"",
stats:{}
}


*/


];









// ===============================
// PARTIDOS
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






prediccion:

"América tiene ventaja por ofensiva y rendimiento reciente.",




confianza:80,





probabilidades:{


local:55,

empate:25,

visitante:20


},





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

"La efectividad ofensiva y la solidez defensiva pueden definir el partido."


}





}



];









// ===============================
// FUNCIONES BASE
// ===============================


function buscarPartido(id){


return partidos.find(

partido=>partido.id===id

);


}




function buscarJugador(id){


return jugadores.find(

jugador=>jugador.id===id

);


}






function buscarEquipo(id){


return equipos.find(

equipo=>equipo.id===id

);


}







function mostrarLogo(src,tamaño="small"){



if(!src){

return "";

}



return `

<img 
src="${src}"
class="logo-${tamaño}"
alt="logo equipo">

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
// SCRIPT.JS COMPLETO
// PARTE 2/4
// =======================================




// ===============================
// HOME
// ===============================


function cargarInicio(){



const contenido=document.getElementById("contenido");


const partido=partidos[0];



contenido.innerHTML=`



<h2>Inicio</h2>





<div class="card">


<h3>Partido destacado</h3>





<div class="match-header">



<div>


${mostrarLogo(partido.local.logo,"medium")}



<strong>

${partido.local.nombre}

</strong>


</div>





<h2>

VS

</h2>





<div>


${mostrarLogo(partido.visitante.logo,"medium")}



<strong>

${partido.visitante.nombre}

</strong>



</div>




</div>







<p>

${partido.hora}

</p>



<p>

${partido.estadio}

</p>







<button onclick="mostrarAnalisis('${partido.id}')">

Ver análisis

</button>






<button onclick="mostrarAlineacion('${partido.local.nombre}')">

Ver alineaciones

</button>




</div>






<div class="card">


<h3>Predicción MatchIQ</h3>


<p>

${partido.prediccion}

</p>


<p>

Confianza:

${partido.confianza}%

</p>



</div>



`;



}









// ===============================
// PARTIDOS
// ===============================


function cargarPartidos(){



const contenido=document.getElementById("contenido");



contenido.innerHTML=`



<h2>Partidos</h2>




${partidos.map(p=>`




<div class="card">





<div class="match-header">



<div>


${mostrarLogo(p.local.logo,"small")}



<p>

${p.local.nombre}

</p>


</div>





<h3>

VS

</h3>





<div>


${mostrarLogo(p.visitante.logo,"small")}



<p>

${p.visitante.nombre}

</p>


</div>



</div>






<p>

${p.hora}

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
// ANALISIS COMPLETO
// ===============================


function mostrarAnalisis(id){



const partido=buscarPartido(id);



const contenido=document.getElementById("contenido");



contenido.innerHTML=`




<button onclick="cargarPartidos()">

Regresar

</button>






<div class="card">





<div class="match-header">



<div>


${mostrarLogo(partido.local.logo,"medium")}


<h3>

${partido.local.nombre}

</h3>


</div>






<h2>

VS

</h2>






<div>


${mostrarLogo(partido.visitante.logo,"medium")}


<h3>

${partido.visitante.nombre}

</h3>


</div>




</div>








<h3>Predicción</h3>



<p>

${partido.prediccion}

</p>




<p>

Confianza:

${partido.confianza}%

</p>








<h3>Probabilidad del partido</h3>




${barraProbabilidad(

partido.local.nombre,

partido.probabilidades.local,

"local"

)}






${barraProbabilidad(

"Empate",

partido.probabilidades.empate,

"empate"

)}






${barraProbabilidad(

partido.visitante.nombre,

partido.probabilidades.visitante,

"visitante"

)}







<h3>Resultados favoritos</h3>




${partido.marcadoresProbables.map(

marcador=>`

<p>${marcador}</p>

`

).join("")}








<h3>Ataque</h3>



<p>

${partido.local.nombre}:

${partido.analisis.ataque.local}

</p>




<p>

${partido.visitante.nombre}:

${partido.analisis.ataque.visitante}

</p>









<h3>Defensa</h3>



<p>

${partido.local.nombre}:

${partido.analisis.defensa.local}

</p>





<p>

${partido.visitante.nombre}:

${partido.analisis.defensa.visitante}

</p>








<h3>Goles recibidos</h3>



<p>

${partido.local.nombre}:

${partido.analisis.golesRecibidos.local}

</p>





<p>

${partido.visitante.nombre}:

${partido.analisis.golesRecibidos.visitante}

</p>








<h3>Forma reciente</h3>



<p>

${partido.local.nombre}:

${partido.analisis.forma.local}

</p>




<p>

${partido.visitante.nombre}:

${partido.analisis.forma.visitante}

</p>








<h3>Factor clave</h3>



<p>

${partido.analisis.factorClave}

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



<h2>Predicciones</h2>





${partidos.map(p=>`




<div class="card">





<div class="match-header">



<div>


${mostrarLogo(p.local.logo,"small")}



<p>

${p.local.nombre}

</p>


</div>






<h3>

VS

</h3>





<div>


${mostrarLogo(p.visitante.logo,"small")}



<p>

${p.visitante.nombre}

</p>


</div>




</div>







<h3>

Predicción:

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




${p.marcadoresProbables.map(

m=>`

<p>${m}</p>

`

).join("")}






</div>




`).join("")}





`;



}
// =======================================
// MATCHIQ MX
// SCRIPT.JS COMPLETO
// PARTE 3/4
// =======================================






// ===============================
// ALINEACIONES
// ===============================


function mostrarAlineacion(equipo){



const contenido=document.getElementById("contenido");



const plantilla = jugadores.filter(

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

La plantilla se cargará con datos oficiales.

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





<button onclick="cerrarJugador()">

Cerrar

</button>







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

#${jugador.numero}

</p>








${generarEstadisticasJugador(jugador)}







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
// STATS POR POSICION
// ===============================


function generarEstadisticasJugador(jugador){



const stats=jugador.stats || {};






// PORTERO


if(jugador.posicion==="Portero"){



return `



<div class="stats-box">


<h3>Estadísticas de portero</h3>



<p>

Atajadas:

${stats.atajadas || "-"}

</p>



<p>

Porcentaje de atajadas:

${stats.porcentajeAtajadas || "-"}%

</p>




<p>

Goles recibidos:

${stats.golesRecibidos || "-"}

</p>




<p>

Porterías a cero:

${stats.porteriasCero || "-"}

</p>




<p>

Penales atajados:

${stats.penalesAtajados || "-"}

</p>



</div>



`;



}







// DEFENSA


if(jugador.posicion==="Defensa"){



return `



<div class="stats-box">


<h3>Estadísticas defensivas</h3>



<p>

Entradas:

${stats.entradas || "-"}

</p>



<p>

Intercepciones:

${stats.intercepciones || "-"}

</p>



<p>

Despejes:

${stats.despejes || "-"}

</p>




<p>

Duelos ganados:

${stats.duelos || "-"}%

</p>



</div>



`;



}








// MEDIOCAMPISTA


if(jugador.posicion==="Mediocampista"){



return `



<div class="stats-box">


<h3>Estadísticas ofensivas</h3>



<p>

Goles:

${stats.goles || "-"}

</p>




<p>

Asistencias:

${stats.asistencias || "-"}

</p>





<p>

Precisión de pases:

${stats.pases || "-"}%

</p>




<p>

Regates completados:

${stats.regates || "-"}%

</p>



<p>

Ranking de pases:

${stats.rankPases || "-"}

</p>




<p>

Ranking de regates:

${stats.rankRegates || "-"}

</p>




</div>



`;



}









// DELANTERO


return `




<div class="stats-box">


<h3>Estadísticas ofensivas</h3>



<p>

Goles:

${stats.goles || "-"}

</p>




<p>

Asistencias:

${stats.asistencias || "-"}

</p>




<p>

Tiros a puerta:

${stats.tiros || "-"}

</p>




<p>

Conversión:

${stats.conversion || "-"}%

</p>




<p>

Ranking de definición:

${stats.rankDefinicion || "-"}

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
// STATS GENERALES
// ===============================


function cargarStats(){



const contenido=document.getElementById("contenido");



contenido.innerHTML=`



<h2>Stats</h2>





<div class="card">


<h3>Jugadores</h3>


<p>

Goles, asistencias, tarjetas, pases, regates y rankings individuales.

</p>


</div>







<div class="card">


<h3>Porteros</h3>


<p>

Atajadas, porcentaje de paradas, goles recibidos y porterías a cero.

</p>


</div>






<div class="card">


<h3>Equipos</h3>


<p>

Ataque, defensa, goles marcados y goles recibidos.

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



<h2>Perfil</h2>





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





${mostrarLogo(e.logo,"small")}





<strong>

${e.nombre}

</strong>






<button onclick="cambiarNotificacion('${e.id}')">


${

notificaciones.includes(e.id)

?

"Activado"

:

"Seguir"

}



</button>





</div>



<br>



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

equipo=>equipo!==id

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
// LOGO LIGA MX
// REGRESA A HOME
// ===============================


document.addEventListener(

"DOMContentLoaded",

()=>{





const logoLiga=document.getElementById("ligaLogo");





if(logoLiga){



logoLiga.addEventListener(

"click",

()=>{


cargarInicio();



}

);



}





cargarInicio();





}

);
