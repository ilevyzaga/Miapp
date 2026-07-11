let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];


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





function guardarFavoritos(){

localStorage.setItem(
"favoritos",
JSON.stringify(favoritos)
);

}




function cambiarFavorito(id){

if(favoritos.includes(id)){

favoritos=favoritos.filter(
x=>x!==id
);

}else{

favoritos.push(id);

}


guardarFavoritos();

mostrarSeccion("perfil");

}







function cargarInicio(){


let contenido=document.getElementById("contenido");


let destacado=partidos[0];


contenido.innerHTML=`

<h2>Inicio</h2>



<div class="card partido">


<h3>Partido destacado</h3>


<div class="teams">


<div class="team">

<img src="${destacado.logoLocal}">

<span>${destacado.local}</span>

</div>


<div class="vs">

VS

</div>


<div class="team">

<img src="${destacado.logoVisitante}">

<span>${destacado.visitante}</span>

</div>


</div>



<p>${destacado.hora}</p>

<p>${destacado.estadio}</p>



<button onclick="mostrarAnalisis('${destacado.id}')">

Ver análisis

</button>


</div>





<div class="card">


<h3>Próximos partidos</h3>


${partidos.slice(1).map(p=>`

<p>

${p.hora}

&nbsp;

${p.local} vs ${p.visitante}

</p>


`).join("")}


</div>





<div class="card">


<h3>Tabla rápida</h3>


<p>1. América — 15 pts</p>

<p>2. Tigres — 13 pts</p>

<p>3. Monterrey — 12 pts</p>

<p>4. Chivas — 10 pts</p>


</div>





<div class="card">


<h3>Jugador destacado</h3>


<p>Henry Martín</p>

<p>7 goles en la temporada</p>


</div>


`;

}







function cargarPartidos(){


let contenido=document.getElementById("contenido");


contenido.innerHTML=`

<h2>Partidos Liga MX</h2>


<div class="card">


<h3>Jornada 1</h3>


${partidos.map(p=>`

<div class="player-card">


<div>

<strong>${p.local}</strong>

<br>

vs

<br>

<strong>${p.visitante}</strong>

</div>


<div>

${p.hora}

</div>


</div>


<button onclick="mostrarAnalisis('${p.id}')">

Ver análisis

</button>


`).join("")}


</div>


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


<h4>Resultados favoritos</h4>


${p.marcadores.map(m=>`

<p>${m}</p>

`).join("")}


</div>


`).join("")}


`;

}







function cargarEstadisticas(){


let contenido=document.getElementById("contenido");


contenido.innerHTML=`

<h2>Estadísticas</h2>


<div class="card">

<h3>Tabla Liga MX</h3>


<p>1. América — 15 pts</p>

<p>2. Tigres — 13 pts</p>

<p>3. Monterrey — 12 pts</p>


</div>



<div class="card">

<h3>Goleadores</h3>


<p>Henry Martín — 7 goles</p>

<p>Gignac — 6 goles</p>


</div>



<div class="card">

<h3>Asistidores</h3>


<p>Fidalgo — 5 asistencias</p>


</div>



<div class="card">

<h3>Porterías a cero</h3>


<p>Malagón — 4 partidos</p>


</div>


`;

}







function cargarPerfil(){


let contenido=document.getElementById("contenido");


contenido.innerHTML=`

<h2>Perfil</h2>



<div class="card">


<h3>Usuario</h3>


<p>Isaac</p>


</div>





<div class="card">


<h3>Equipo favorito</h3>


<img src="images/america.png" width="70">


<p>América</p>


</div>





<div class="card">


<h3>Mis partidos favoritos</h3>



${
favoritos.length

?

favoritos.map(id=>{

let p=partidos.find(
x=>x.id===id
);

return`

<p>

${p.local} vs ${p.visitante}

</p>

`;

}).join("")


:

"<p>No tienes favoritos todavía</p>"

}


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
