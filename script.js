// ======================================
// MATCHIQ MX
// SCRIPT.JS CORREGIDO
// PARTE 1/2
// ======================================


// =============================
// DATOS
// =============================


let notificaciones =
JSON.parse(localStorage.getItem("notificaciones")) || [];




// =============================
// EQUIPOS
// =============================


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







// =============================
// JUGADORES
// Preparado para API
// =============================


let jugadores = [];







// =============================
// PARTIDOS
// =============================


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

"América gana o empate",





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

"El rendimiento ofensivo y defensivo será clave en el resultado."

}



}



];







// =============================
// FUNCIONES BASE
// =============================



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




function mostrarLogo(src,tamaño){


return `

<img 
src="${src}"
class="logo-${tamaño}"
>

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
// ======================================
// MATCHIQ MX
// SCRIPT.JS CORREGIDO
// PARTE 2/2
// ======================================




// =============================
// HOME
// =============================


function cargarInicio(){


const contenido=document.getElementById("contenido");


let p=partidos[0];



contenido.innerHTML=`



<h2>Inicio</h2>



<div class="card">


<h3>Partido destacado</h3>




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




</div>



`;



}








// =============================
// PARTIDOS
// =============================


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

Regresar

</button>





<div class="card">



<div class="match-header">



<div>

${mostrarLogo(p.local.logo,"medium")}

<h3>${p.local.nombre}</h3>

</div>




<h2>

VS

</h2>





<div>


${mostrarLogo(p.visitante.logo,"medium")}



<h3>${p.visitante.nombre}</h3>



</div>



</div>








<h3>Predicción</h3>


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


${p.marcadores.map(m=>`

<p>${m}</p>

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



<h3>

VS

</h3>



<div>

${mostrarLogo(p.visitante.logo,"small")}

<p>${p.visitante.nombre}</p>

</div>


</div>




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



`).join("")}



`;



}









// =============================
// STATS
// =============================


function cargarEstadisticas(){



let contenido=document.getElementById("contenido");



contenido.innerHTML=`



<h2>Stats</h2>





<div class="card">

<h3>Goles</h3>

<p>

Ranking de goleadores

</p>

</div>




<div class="card">

<h3>Asistencias</h3>

<p>

Ranking de asistencias

</p>

</div>




<div class="card">

<h3>Tarjetas amarillas</h3>

<p>

Ranking de tarjetas

</p>

</div>




<div class="card">

<h3>Tarjetas rojas</h3>

<p>

Ranking de expulsiones

</p>

</div>




<div class="card">

<h3>Porteros</h3>

<p>

Estadísticas de porteros

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

Equipos seguidos

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

"Activado"

:

"Seguir"

}



</button>



</div>



`).join("")}





`;



}









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









// =============================
// NAVEGACION
// =============================


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

cargarEstadisticas();

}



if(seccion==="perfil"){

cargarPerfil();

}



}








// =============================
// LOGO LIGA MX
// =============================


document.addEventListener(

"DOMContentLoaded",

()=>{


const logo=document.getElementById("ligaLogo");



if(logo){


logo.onclick=()=>{

cargarInicio();

};


}




cargarInicio();


}

);
