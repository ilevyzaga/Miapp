let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];


const partidos = [

{
id:"america",
local:"América",
visitante:"Toluca",
logoLocal:"images/america.png",
logoVisitante:"images/toluca.png",
estadio:"Estadio Ciudad de los Deportes",
hora:"20:00",
localidad:"América",
prob:{
local:58,
empate:22,
visitante:20
}
},

{
id:"tigres",
local:"Tigres",
visitante:"Chivas",
logoLocal:"images/tigres.png",
logoVisitante:"images/chivas.png",
estadio:"Estadio Universitario",
hora:"21:00",
localidad:"Tigres",
prob:{
local:51,
empate:26,
visitante:23
}
},

{
id:"cruzazul",
local:"Cruz Azul",
visitante:"Monterrey",
logoLocal:"images/cruzazul.png",
logoVisitante:"images/monterrey.png",
estadio:"Estadio Ciudad de los Deportes",
hora:"19:00",
localidad:"Equilibrado",
prob:{
local:35,
empate:30,
visitante:35
}
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

favoritos =
favoritos.filter(
f=>f!==id
);

}else{

favoritos.push(id);

}

guardarFavoritos();

mostrarSeccion("inicio");

}





function cargarInicio(){

let contenido =
document.getElementById("contenido");


contenido.innerHTML=`

<h2>Jornada 1</h2>


${partidos.map(p=>`

<div class="card partido">


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



<span class="status">

Próximo partido

</span>


<p>${p.estadio}</p>

<p>${p.hora}</p>




<div class="bar">

<div class="${p.id}" style="width:${p.prob.local}%"></div>

</div>



<p>

${p.local} ${p.prob.local}% |

Empate ${p.prob.empate}% |

${p.visitante} ${p.prob.visitante}%

</p>



<button onclick="mostrarAnalisis(this,'${p.id}')">

Ver análisis

</button>



<button onclick="cambiarFavorito('${p.id}')">

${favoritos.includes(p.id)
?"Quitar favorito"
:"Agregar favorito"}

</button>


</div>


`).join("")}

`;

}






function mostrarAnalisis(boton,id){


let existe =
boton.parentElement.querySelector(".analisis");


if(existe){

existe.remove();

return;

}



let datos={


america:{

prediccion:"América gana o empate",
confianza:"80%",
resultados:[
"América 2 - 1 Toluca 32%",
"América 1 - 0 Toluca 24%",
"América 1 - 1 Toluca 18%"
],

ataqueLocal:"★★★★★",
ataqueVisita:"★★★★",
defensaLocal:"★★★",
defensaVisita:"★★★★"

},



tigres:{

prediccion:"Tigres gana o empate",
confianza:"75%",
resultados:[
"Tigres 2 - 0 Chivas 30%",
"Tigres 2 - 1 Chivas 25%",
"Tigres 1 - 1 Chivas 20%"
],

ataqueLocal:"★★★★★",
ataqueVisita:"★★★",
defensaLocal:"★★★★",
defensaVisita:"★★★"

},



cruzazul:{

prediccion:"Partido equilibrado",
confianza:"65%",
resultados:[
"Cruz Azul 1 - 1 Monterrey 30%",
"Cruz Azul 1 - 0 Monterrey 22%",
"Cruz Azul 0 - 1 Monterrey 20%"
],

ataqueLocal:"★★★★",
ataqueVisita:"★★★★",
defensaLocal:"★★★★",
defensaVisita:"★★★★"

}

};



let d=datos[id];



let div=document.createElement("div");

div.className="analisis";


div.innerHTML=`

<h3>MatchIQ</h3>


<p>Forma reciente</p>

<p>Últimos partidos: G G E G</p>



<h3>Predicción</h3>

<p>${d.prediccion}</p>


<p>Confianza ${d.confianza}</p>



<h3>Resultados probables</h3>


${d.resultados.map(r=>`

<p>${r}</p>

`).join("")}



<h3>Comparación</h3>


<p>Ataque</p>

<p>${d.ataqueLocal} | ${d.ataqueVisita}</p>


<p>Defensa</p>

<p>${d.defensaLocal} | ${d.defensaVisita}</p>


`;



boton.parentElement.appendChild(div);


}






function mostrarSeccion(seccion){


let contenido =
document.getElementById("contenido");



if(seccion==="inicio"){

cargarInicio();

}





if(seccion==="estadisticas"){


contenido.innerHTML=`

<h2>Estadísticas</h2>


<div class="card">

<h3>Tabla Liga MX</h3>

<table>

<tr>
<th>Equipo</th>
<th>Puntos</th>
</tr>


<tr>
<td>América</td>
<td>15</td>
</tr>


<tr>
<td>Tigres</td>
<td>13</td>
</tr>


<tr>
<td>Monterrey</td>
<td>12</td>
</tr>


<tr>
<td>Chivas</td>
<td>10</td>
</tr>


</table>

</div>




<div class="card">

<h3>Goleadores</h3>

<div class="player-card">
Henry Martín
7 goles
</div>

<div class="player-card">
Gignac
6 goles
</div>

</div>


<div class="card">

<h3>Asistidores</h3>

<div class="player-card">
Fidalgo
5 asistencias
</div>

<div class="player-card">
Canales
3 asistencias
</div>

</div>



<div class="card">

<h3>Porterías a cero</h3>

<div class="player-card">
Malagón
4 partidos
</div>

</div>

`;

}





if(seccion==="predicciones"){


contenido.innerHTML=`

<h2>MatchIQ</h2>


<div class="card">

<h3>Predicción de la jornada</h3>

<p>América vs Toluca</p>

<p>América gana o empate</p>

<p>Confianza 80%</p>

</div>


<div class="card">

<p>Tigres vs Chivas</p>

<p>Tigres gana o empate</p>

<p>Confianza 75%</p>

</div>


<div class="card">

<p>Cruz Azul vs Monterrey</p>

<p>Partido equilibrado</p>

<p>Confianza 65%</p>

</div>


`;

}





if(seccion==="perfil"){


contenido.innerHTML=`

<h2>Perfil</h2>


<div class="card">

<h3>Usuario</h3>

<p>Isaac</p>

</div>


<div class="card">

<h3>Partidos favoritos</h3>


${
favoritos.length

?

favoritos.map(id=>{

let p=partidos.find(x=>x.id===id);

return `<p>${p.local} vs ${p.visitante}</p>`

}).join("")

:

"<p>No tienes favoritos</p>"

}


</div>


`;

}


}
