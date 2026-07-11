// ======================================
// MATCHIQ MX
// SCRIPT.JS CORREGIDO
// CÓDIGO 2A
// BASE Y DATOS
// ======================================


// =============================
// VARIABLES
// =============================

let notificaciones = 
JSON.parse(localStorage.getItem("notificaciones")) || [];





// =============================
// EQUIPOS
// Preparado para API
// =============================


let equipos = [


{
id:"america",
nombre:"América",
logo:""
},


{
id:"atlas",
nombre:"Atlas",
logo:""
},


{
id:"atlante",
nombre:"Atlante",
logo:""
},


{
id:"atletico-san-luis",
nombre:"Atlético San Luis",
logo:""
},


{
id:"cruz-azul",
nombre:"Cruz Azul",
logo:""
},


{
id:"chivas",
nombre:"Chivas",
logo:""
},


{
id:"juarez",
nombre:"FC Juárez",
logo:""
},


{
id:"leon",
nombre:"León",
logo:""
},


{
id:"monterrey",
nombre:"Monterrey",
logo:""
},


{
id:"necaxa",
nombre:"Necaxa",
logo:""
},


{
id:"pachuca",
nombre:"Pachuca",
logo:""
},


{
id:"puebla",
nombre:"Puebla",
logo:""
},


{
id:"pumas",
nombre:"Pumas",
logo:""
},


{
id:"queretaro",
nombre:"Querétaro",
logo:""
},


{
id:"santos",
nombre:"Santos Laguna",
logo:""
},


{
id:"tigres",
nombre:"Tigres",
logo:""
},


{
id:"tijuana",
nombre:"Tijuana",
logo:""
},


{
id:"toluca",
nombre:"Toluca",
logo:""
}


];









// =============================
// JUGADORES
// Después la API llenará esto
// =============================


let jugadores = [

{

id:"",

nombre:"",

equipo:"",

posicion:"",

numero:"",

foto:"",


stats:{


}

}


];









// =============================
// PARTIDOS
// Estructura preparada para API
// =============================


let partidos = [



{


id:"america-toluca",


local:{

nombre:"América",

logo:""

},



visitante:{


nombre:"Toluca",

logo:""

},




hora:"20:00",


estadio:"Ciudad de los Deportes",




probabilidades:{


local:55,

empate:25,

visitante:20


},





prediccion:"América gana o empate",



confianza:80,





marcadores:[


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

"El rendimiento ofensivo y defensivo será clave."


}



}



];









// =============================
// FUNCIONES BASE
// =============================


function buscarJugador(id){


return jugadores.find(

jugador=>jugador.id===id

);


}





function buscarPartido(id){


return partidos.find(

partido=>partido.id===id

);


}






// =============================
// LOGOS
// =============================


function mostrarLogo(src,tamaño="small"){



if(!src){

return "";

}



return `

<img 

src="${src}"

class="logo-${tamaño}"

>

`;



}
// ======================================
// MATCHIQ MX
// SCRIPT.JS CORREGIDO
// CÓDIGO 2B
// FUNCIONES
// ======================================





// =============================
// BARRAS DE PROBABILIDAD
// =============================


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









// =============================
// HOME
// =============================


function cargarInicio(){



let contenido=document.getElementById("contenido");



let partido=partidos[0];



contenido.innerHTML=`


<h2>Inicio</h2>





<div class="card">


<h3>Partido destacado</h3>





<div class="match-header">



<div>

${mostrarLogo(partido.local.logo,"medium")}

<h3>${partido.local.nombre}</h3>

</div>





<h2>VS</h2>





<div>


${mostrarLogo(partido.visitante.logo,"medium")}

<h3>${partido.visitante.nombre}</h3>

</div>



</div>







<p>

🕒 ${partido.hora}

</p>



<p>

🏟️ ${partido.estadio}

</p>





<button onclick="mostrarAnalisis('${partido.id}')">

Ver análisis

</button>




</div>



`;



}









// =============================
// PARTIDOS
// =============================


function cargarPartidos(){


let contenido=document.getElementById("contenido");



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




<h3>VS</h3>





<div>


${mostrarLogo(p.visitante.logo,"small")}



<p>

${p.visitante.nombre}

</p>



</div>



</div>





<p>

🕒 ${p.hora}

</p>




<button onclick="mostrarAnalisis('${p.id}')">

Ver análisis

</button>



<button onclick="mostrarAlineacion('${p.local.nombre}')">

Alineaciones

</button>



</div>



`).join("")}



`;



}









// =============================
// ANALISIS
// =============================


function mostrarAnalisis(id){



let p=buscarPartido(id);


let contenido=document.getElementById("contenido");



contenido.innerHTML=`



<button onclick="cargarPartidos()">

← Regresar

</button>





<div class="card">



<div class="match-header">



<div>


${mostrarLogo(p.local.logo,"medium")}


<h3>

${p.local.nombre}

</h3>



</div>





<h2>VS</h2>






<div>


${mostrarLogo(p.visitante.logo,"medium")}



<h3>

${p.visitante.nombre}

</h3>


</div>



</div>







<h3>Predicción MatchIQ</h3>


<p>

${p.prediccion}

</p>




<p>

Confianza:

${p.confianza}%

</p>







<h3>Probabilidad</h3>



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





<h3>Resultados favoritos</h3>


${p.marcadores.map(x=>`

<p>⚽ ${x}</p>

`).join("")}







<h3>Ataque</h3>


<p>

${p.local.nombre}:

${p.analisis.ataque.local}

</p>


<p>

${p.visitante.nombre}:

${p.analisis.ataque.visitante}

</p>







<h3>Defensa</h3>


<p>

${p.local.nombre}:

${p.analisis.defensa.local}

</p>


<p>

${p.visitante.nombre}:

${p.analisis.defensa.visitante}

</p>







<h3>Goles recibidos</h3>


<p>

${p.local.nombre}:

${p.analisis.golesRecibidos.local}

</p>



<p>

${p.visitante.nombre}:

${p.analisis.golesRecibidos.visitante}

</p>







<h3>Forma reciente</h3>


<p>

${p.local.nombre}:

${p.analisis.forma.local}

</p>


<p>

${p.visitante.nombre}:

${p.analisis.forma.visitante}

</p>







<h3>Factor clave</h3>


<p>

${p.analisis.factorClave}

</p>





</div>



`;



}









// =============================
// ALINEACIONES
// =============================


function mostrarAlineacion(equipo){


let contenido=document.getElementById("contenido");



let lista=jugadores.filter(

j=>j.equipo===equipo

);





contenido.innerHTML=`



<button onclick="cargarPartidos()">

← Regresar

</button>





<div class="card">


<h2>Alineación ${equipo}</h2>





${lista.map(j=>`



<div class="player-card"

onclick="mostrarJugador('${j.id}')">



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



`).join("")}



</div>



`;



}









// =============================
// POPUP JUGADOR
// =============================


function mostrarJugador(id){



let j=buscarJugador(id);



let popup=document.getElementById("player-popup");



popup.innerHTML=`



<div class="popup-background"

onclick="cerrarJugador()">

</div>






<div class="player-modal">



<button onclick="cerrarJugador()">

X

</button>



<h2>${j.nombre}</h2>


<p>

${j.equipo}

</p>


<p>

${j.posicion}

</p>





${statsJugador(j)}





</div>



`;



popup.style.display="block";



}









function cerrarJugador(){


document.getElementById("player-popup")

.style.display="none";


}








// =============================
// STATS SEGÚN POSICIÓN
// =============================


function statsJugador(j){


if(j.posicion==="Portero"){


return `

<h3>Portero 🧤</h3>


<p>Atajadas</p>

<p>Goles recibidos</p>

<p>Porterías a cero</p>


`;

}



if(j.posicion==="Defensa"){


return `


<h3>Defensa 🛡️</h3>


<p>Entradas</p>

<p>Intercepciones</p>

<p>Despejes</p>

<p>Duelos ganados</p>


`;

}



if(j.posicion==="Mediocampista"){


return `


<h3>Mediocampista ⚽</h3>


<p>Goles</p>

<p>Asistencias</p>

<p>Pases</p>

<p>Regates</p>


`;

}



return `


<h3>Delantero 🔥</h3>


<p>Goles</p>

<p>Asistencias</p>

<p>Tiros</p>

<p>Conversión</p>


`;

}
// ======================================
// MATCHIQ MX
// SCRIPT.JS CORREGIDO
// CÓDIGO 2C
// CONEXIONES FINALES
// ======================================





// =============================
// STATS GENERALES
// =============================


function cargarEstadisticas(){


let contenido=document.getElementById("contenido");



contenido.innerHTML=`



<h2>Stats Liga MX</h2>





<div class="card">


<h3>⚽ Goles</h3>


<p>

Goleador principal

<br>

Datos se cargarán desde API

</p>


</div>







<div class="card">


<h3>🎯 Asistencias</h3>


<p>

Máximos asistentes

<br>

Datos se cargarán desde API

</p>


</div>







<div class="card">


<h3>🟨 Tarjetas amarillas</h3>


<p>

Jugadores con más tarjetas

<br>

Datos se cargarán desde API

</p>


</div>








<div class="card">


<h3>🟥 Tarjetas rojas</h3>


<p>

Jugadores expulsados

<br>

Datos se cargarán desde API

</p>


</div>







<div class="card">


<h3>🧤 Porteros</h3>


<p>

Atajadas, porterías a cero y goles recibidos

<br>

Datos se cargarán desde API

</p>


</div>





`;



}









// =============================
// PERFIL
// =============================


function cargarPerfil(){



let contenido=document.getElementById("contenido");



contenido.innerHTML=`



<h2>Perfil</h2>





<div class="card">


<h3>Isaac</h3>


<p>

Equipos para recibir notificaciones

</p>


</div>






${equipos.map(e=>`



<div class="card team-follow">



${mostrarLogo(e.logo,"small")}




<strong>

${e.nombre}

</strong>






<button onclick="cambiarNotificacion('${e.id}')">



${

notificaciones.includes(e.id)

?

"🔔"

:

"🔕"

}



</button>





</div>




`).join("")}





`;



}









// =============================
// NOTIFICACIONES
// =============================


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









// =============================
// NAVEGACIÓN
// =============================


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

cargarEstadisticas();

break;




case "perfil":

cargarPerfil();

break;



}



}









// =============================
// PREDICCIONES
// =============================


function cargarPredicciones(){



let contenido=document.getElementById("contenido");



contenido.innerHTML=`


<h2>Predicciones</h2>





${partidos.map(p=>`


<div class="card">



<div class="match-header">


<div>

${mostrarLogo(p.local.logo,"small")}

<p>${p.local.nombre}</p>


</div>



<h3>VS</h3>



<div>

${mostrarLogo(p.visitante.logo,"small")}

<p>${p.visitante.nombre}</p>


</div>


</div>





<h3>

${p.prediccion}

</h3>




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




</div>



`).join("")}



`;



}








// =============================
// LOGO LIGA MX
// =============================


document.addEventListener(

"DOMContentLoaded",

()=>{



const logo=document.getElementById("ligaLogo");



if(logo){


logo.addEventListener(

"click",

()=>{


cargarInicio();


}


);


}





cargarInicio();



}

);
