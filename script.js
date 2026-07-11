let equiposSeguidos = JSON.parse(localStorage.getItem("equiposSeguidos")) || [];


const partidos = [

{
id:"america",
local:"América",
visitante:"Toluca",
logoLocal:"images/america.png",
logoVisitante:"images/toluca.png",
hora:"20:00",
estadio:"Estadio Ciudad de los Deportes",
prediccion:"América gana o empate",
confianza:"80%",
marcadores:[
"América 2 - 1 Toluca",
"América 1 - 0 Toluca",
"América 1 - 1 Toluca"
]
},

{
id:"tigres",
local:"Tigres",
visitante:"Chivas",
logoLocal:"images/tigres.png",
logoVisitante:"images/chivas.png",
hora:"21:00",
estadio:"Estadio Universitario",
prediccion:"Tigres gana o empate",
confianza:"75%",
marcadores:[
"Tigres 2 - 0 Chivas",
"Tigres 2 - 1 Chivas",
"Tigres 1 - 1 Chivas"
]
},

{
id:"cruzazul",
local:"Cruz Azul",
visitante:"Monterrey",
logoLocal:"images/cruzazul.png",
logoVisitante:"images/monterrey.png",
hora:"19:00",
estadio:"Ciudad de los Deportes",
prediccion:"Partido equilibrado",
confianza:"65%",
marcadores:[
"Cruz Azul 1 - 1 Monterrey",
"Cruz Azul 1 - 0 Monterrey",
"Cruz Azul 0 - 1 Monterrey"
]
}

];



const equipos=[

{
nombre:"América",
logo:"images/america.png"
},

{
nombre:"Tigres",
logo:"images/tigres.png"
},

{
nombre:"Chivas",
logo:"images/chivas.png"
},

{
nombre:"Cruz Azul",
logo:"images/cruzazul.png"
},

{
nombre:"Monterrey",
logo:"images/monterrey.png"
}

];




function guardarEquipos(){

localStorage.setItem(
"equiposSeguidos",
JSON.stringify(equiposSeguidos)
);

}




function seguirEquipo(nombre){

if(equiposSeguidos.includes(nombre)){

equiposSeguidos =
equiposSeguidos.filter(
e=>e!==nombre
);

}else{

equiposSeguidos.push(nombre);

}

guardarEquipos();

mostrarSeccion("perfil");

}





function cargarInicio(){

let contenido=document.getElementById("contenido");

let p=partidos[0];

contenido.innerHTML=`

<h2>Inicio</h2>


<div class="card partido">


<h3>Partido destacado</h3>


<div class="teams">

<div class="team">

<img src="${p.logoLocal}">

<span>${p.local}</span>

</div>


<div class="vs">

VS

</div>


<div class="team">

<img src="${p.logoVisitante}">

<span>${p.visitante}</span>

</div>

</div>


<p>${p.hora}</p>

<p>${p.estadio}</p>


<button onclick="mostrarAnalisis('${p.id}')">

Ver análisis

</button>


</div>




<div class="card">

<h3>Próximos partidos</h3>

<p>Tigres vs Chivas - 21:00</p>

<p>Cruz Azul vs Monterrey - 19:00</p>

</div>

`;

}







function cargarPartidos(){

let contenido=document.getElementById("contenido");


contenido.innerHTML=`

<h2>Partidos</h2>


${partidos.map(p=>`

<div class="card partido">


<div class="teams">


<div class="team">

<img src="${p.logoLocal}">

${p.local}

</div>


<div class="vs">

VS

</div>


<div class="team">

<img src="${p.logoVisitante}">

${p.visitante}

</div>


</div>


<p>${p.hora}</p>


<button onclick="mostrarAnalisis('${p.id}')">

Ver análisis

</button>


</div>

`).join("")}

`;

}







function mostrarAnalisis(id){

let p=partidos.find(
x=>x.id===id
);


let contenido=document.getElementById("contenido");


contenido.innerHTML=`

<div class="card">


<h2>${p.local} vs ${p.visitante}</h2>


<div class="analisis">


<h3>Predicción</h3>

<p>${p.prediccion}</p>

<p>Confianza: ${p.confianza}</p>



<h3>Resultados probables</h3>


${p.marcadores.map(m=>`

<p>${m}</p>

`).join("")}



<h3>Factores clave</h3>

<p>Ataque</p>

<p class="stars">★★★★★</p>


<p>Defensa</p>

<p class="stars">★★★★☆</p>



</div>


</div>

`;

}







function cargarPredicciones(){

let contenido=document.getElementById("contenido");


contenido.innerHTML=`

<h2>Predicciones</h2>


${partidos.map(p=>`

<div class="card">

<h3>${p.local} vs ${p.visitante}</h3>

<p>${p.prediccion}</p>

<p>Confianza: ${p.confianza}</p>

</div>


`).join("")}

`;

}







function cargarEstadisticas(){

let contenido=document.getElementById("contenido");


contenido.innerHTML=`

<h2>Estadísticas</h2>



<div class="card">

<h3>Goleadores</h3>

<p>Henry Martín — 7 goles</p>

<p>Gignac — 6 goles</p>

<p>Berterame — 5 goles</p>

</div>




<div class="card">

<h3>Asistidores</h3>

<p>Fidalgo — 5 asistencias</p>

<p>Quiñones — 4 asistencias</p>

<p>Córdova — 4 asistencias</p>

</div>




<div class="card">

<h3>Contribuciones de gol</h3>

<p>Henry Martín — 10 G+A</p>

<p>Gignac — 8 G+A</p>

<p>Fidalgo — 7 G+A</p>

</div>




<div class="card">

<h3>Tarjetas amarillas</h3>

<p>Jugador América — 5</p>

<p>Jugador Tigres — 4</p>

<p>Jugador Monterrey — 4</p>

</div>




<div class="card">

<h3>Tarjetas rojas</h3>

<p>Jugador América — 1</p>

<p>Jugador Chivas — 1</p>

</div>




<div class="card">

<h3>Porterías a cero</h3>

<p>Malagón — 4 partidos</p>

<p>Nahuel Guzmán — 3 partidos</p>

</div>


`;

}







function cargarPerfil(){

let contenido=document.getElementById("contenido");


contenido.innerHTML=`

<h2>Perfil</h2>



<div class="card perfil-header">

<h3>Usuario</h3>

<p>Isaac</p>

</div>





<div class="card">

<h3>Equipos seguidos</h3>


${equipos.map(e=>`

<div class="player-card">


<img src="${e.logo}" width="50">


<div>

<strong>${e.nombre}</strong>

<br>

<small>

${
equiposSeguidos.includes(e.nombre)

?
"Notificaciones activadas"

:

"Sin seguimiento"

}

</small>

</div>



<button onclick="seguirEquipo('${e.nombre}')">


${
equiposSeguidos.includes(e.nombre)

?

"Siguiendo"

:

"Seguir"

}


</button>


</div>


`).join("")}


</div>





<div class="card">

<h3>Notificaciones</h3>


<p>Próximos partidos</p>

<p>Alineaciones confirmadas</p>

<p>Resultados finales</p>

<p>Predicciones</p>

</div>


`;

}







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


if(seccion==="estadisticas"){

cargarEstadisticas();

}


if(seccion==="perfil"){

cargarPerfil();

}


}


cargarInicio();
