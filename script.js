let equiposSeguidos = JSON.parse(localStorage.getItem("equiposSeguidos")) || [];

let paginaAnterior = "inicio";


const partidos = [

{
id:"america",
local:"América",
visitante:"Toluca",
logoLocal:"images/america.png",
logoVisitante:"images/toluca.png",
hora:"20:00",
estado:"Próximo",
estadio:"Estadio Ciudad de los Deportes",
prediccion:"América gana o empate",
confianza:"80%",
formaLocal:"G G G E G",
formaVisitante:"G E G G",
ataqueLocal:5,
ataqueVisitante:4,
defensaLocal:3,
defensaVisitante:4,
marcadores:[
"América 2 - 1 Toluca 32%",
"América 1 - 0 Toluca 24%",
"América 1 - 1 Toluca 18%"
]
},

{
id:"tigres",
local:"Tigres",
visitante:"Chivas",
logoLocal:"images/tigres.png",
logoVisitante:"images/chivas.png",
hora:"21:00",
estado:"Próximo",
estadio:"Estadio Universitario",
prediccion:"Tigres gana o empate",
confianza:"75%",
formaLocal:"G G E G",
formaVisitante:"E G G E",
ataqueLocal:5,
ataqueVisitante:3,
defensaLocal:4,
defensaVisitante:3,
marcadores:[
"Tigres 2 - 0 Chivas 30%",
"Tigres 2 - 1 Chivas 25%",
"Tigres 1 - 1 Chivas 20%"
]
},

{
id:"cruzazul",
local:"Cruz Azul",
visitante:"Monterrey",
logoLocal:"images/cruzazul.png",
logoVisitante:"images/monterrey.png",
hora:"19:00",
estado:"Próximo",
estadio:"Ciudad de los Deportes",
prediccion:"Partido equilibrado",
confianza:"65%",
formaLocal:"G G E E",
formaVisitante:"G E G G",
ataqueLocal:4,
ataqueVisitante:4,
defensaLocal:4,
defensaVisitante:4,
marcadores:[
"Cruz Azul 1 - 1 Monterrey 30%",
"Cruz Azul 1 - 0 Monterrey 22%",
"Cruz Azul 0 - 1 Monterrey 20%"
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
x=>x!==nombre
);

}else{

equiposSeguidos.push(nombre);

}

guardarEquipos();

mostrarSeccion("perfil");

}





function botonRegresar(){

return `

<button class="back-button" onclick="mostrarSeccion('${paginaAnterior}')">

← Regresar

</button>

`;

}







function cargarInicio(){

paginaAnterior="inicio";

let contenido=document.getElementById("contenido");

let p=partidos[0];


contenido.innerHTML=`

<h2>Inicio</h2>


<div class="card hero-card">

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


<p>${p.hora} | ${p.estado}</p>

<p>${p.estadio}</p>


<button onclick="mostrarAnalisis('${p.id}')">

Ver análisis

</button>


</div>




<div class="card">

<h3>Resumen de jornada</h3>

<p>3 partidos programados</p>

<p>Predicciones actualizadas</p>

<p>Estadísticas disponibles</p>

</div>





<div class="card">

<h3>Próximos partidos</h3>


<p>⚽ Tigres vs Chivas — 21:00</p>

<p>⚽ Cruz Azul vs Monterrey — 19:00</p>


</div>





<div class="card">

<h3>Tabla rápida</h3>

<p>1. América — 15 pts</p>

<p>2. Tigres — 13 pts</p>

<p>3. Monterrey — 12 pts</p>


</div>




<div class="card">

<h3>Jugador destacado</h3>

<p>Henry Martín</p>

<p>7 goles esta temporada</p>

</div>

`;

}








function cargarPartidos(){

paginaAnterior="inicio";

let contenido=document.getElementById("contenido");


contenido.innerHTML=`

<h2>Partidos</h2>


<div class="filters">

<button>Todos</button>

<button>Hoy</button>

<button>Finalizados</button>

</div>


${partidos.map(p=>`


<div class="card">


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

<p>${p.estado}</p>


<button onclick="mostrarAnalisis('${p.id}')">

Ver análisis

</button>


</div>


`).join("")}


`;

}







function mostrarAnalisis(id){

paginaAnterior="partidos";


let p=partidos.find(
x=>x.id===id
);


let contenido=document.getElementById("contenido");


contenido.innerHTML=`


${botonRegresar()}


<div class="card analysis-card">


<h2>${p.local} vs ${p.visitante}</h2>


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





<h3>Predicción</h3>

<p>${p.prediccion}</p>

<p>Confianza: ${p.confianza}</p>




<h3>Forma reciente</h3>


<p>${p.local}: ${p.formaLocal}</p>

<p>${p.visitante}: ${p.formaVisitante}</p>





<h3>Ataque</h3>

<p class="stars">

${"★".repeat(p.ataqueLocal)}

&nbsp;

${"★".repeat(p.ataqueVisitante)}

</p>




<h3>Defensa</h3>

<p class="stars">

${"★".repeat(p.defensaLocal)}

&nbsp;

${"★".repeat(p.defensaVisitante)}

</p>




<h3>Resultados probables</h3>


${p.marcadores.map(x=>`

<p>${x}</p>

`).join("")}



</div>

`;

}








function cargarPredicciones(){

paginaAnterior="inicio";

let contenido=document.getElementById("contenido");


contenido.innerHTML=`

<h2>Predicciones</h2>


${partidos.map(p=>`

<div class="card">


<h3>${p.local} vs ${p.visitante}</h3>

<p>${p.prediccion}</p>

<p>Confianza ${p.confianza}</p>


</div>


`).join("")}

`;

}








function cargarPerfil(){

paginaAnterior="inicio";

let contenido=document.getElementById("contenido");


contenido.innerHTML=`

<h2>Perfil</h2>


<div class="card">

<h3>Usuario</h3>

<p>Isaac</p>

</div>




<div class="card">

<h3>Equipos seguidos</h3>


${equipos.map(e=>`

<div class="player-card">


<img src="${e.logo}">


<div>

<strong>${e.nombre}</strong>

<br>

<small>

${
equiposSeguidos.includes(e.nombre)

?

"Notificaciones activadas"

:

"Activar notificaciones"

}

</small>


</div>


<button onclick="seguirEquipo('${e.nombre}')">


${
equiposSeguidos.includes(e.nombre)

?

"Siguiendo"

:

"Activar"

}


</button>


</div>


`).join("")}


</div>


`;

}








function cargarEstadisticas(){

paginaAnterior="inicio";


let contenido=document.getElementById("contenido");


contenido.innerHTML=`

<h2>Estadísticas</h2>


${botonRegresar()}


<div class="card">

<h3>Goleadores</h3>

<p>Henry Martín — 7 goles</p>

<p>Gignac — 6 goles</p>

</div>


<div class="card">

<h3>Asistidores</h3>

<p>Álvaro Fidalgo — 5 asistencias</p>

</div>


<div class="card">

<h3>Tarjetas amarillas</h3>

<p>Álvaro Fidalgo — 5</p>

<p>Erick Sánchez — 4</p>

</div>


<div class="card">

<h3>Tarjetas rojas</h3>

<p>Igor Lichnovsky — 1</p>

</div>


<div class="card">

<h3>Porterías a cero</h3>

<p>Luis Malagón — 4</p>

</div>


`;

}








function mostrarSeccion(seccion){

if(seccion==="inicio")
cargarInicio();

if(seccion==="partidos")
cargarPartidos();

if(seccion==="predicciones")
cargarPredicciones();

if(seccion==="estadisticas")
cargarEstadisticas();

if(seccion==="perfil")
cargarPerfil();

}



cargarInicio();
