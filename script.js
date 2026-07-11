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
probabilidades:{
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
probabilidades:{
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
probabilidades:{
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

favoritos = favoritos.filter(
x=>x!==id
);

}

else{

favoritos.push(id);

}


guardarFavoritos();

mostrarSeccion("inicio");

}




function cargarInicio(){


let contenido=document.getElementById("contenido");


contenido.innerHTML=`

<h2>Partidos destacados</h2>


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

<div style="width:${p.probabilidades.local}%"></div>

</div>



<p>

${p.local} ${p.probabilidades.local}% 

|

 Empate ${p.probabilidades.empate}% 

|

 ${p.visitante} ${p.probabilidades.visitante}%

</p>



<button onclick="mostrarAnalisis('${p.id}')">

Ver análisis

</button>



<button onclick="cambiarFavorito('${p.id}')">

${
favoritos.includes(p.id)
?
"Quitar favorito"
:
"Agregar favorito"
}

</button>



</div>


`).join("")}

`;

}




function mostrarAnalisis(id){


let contenido=document.getElementById("contenido");



let datos={


america:{

prediccion:"América gana o empate",

confianza:"80%",

marcadores:[
"América 2 - 1 Toluca",
"América 1 - 0 Toluca",
"América 1 - 1 Toluca"
],

ataque:"★★★★★",

defensa:"★★★"

},


tigres:{

prediccion:"Tigres gana o empate",

confianza:"75%",

marcadores:[
"Tigres 2 - 0 Chivas",
"Tigres 2 - 1 Chivas",
"Tigres 1 - 1 Chivas"
],

ataque:"★★★★★",

defensa:"★★★★"

},


cruzazul:{

prediccion:"Partido equilibrado",

confianza:"65%",

marcadores:[
"Cruz Azul 1 - 1 Monterrey",
"Cruz Azul 1 - 0 Monterrey",
"Cruz Azul 0 - 1 Monterrey"
],

ataque:"★★★★",

defensa:"★★★★"

}


};



let partido=partidos.find(
p=>p.id===id
);


let d=datos[id];



contenido.innerHTML=`

<div class="card">


<h2>

${partido.local} vs ${partido.visitante}

</h2>


<div class="analisis">


<h3>Predicción</h3>


<p>${d.prediccion}</p>


<p>Confianza ${d.confianza}</p>



<h3>Resultados probables</h3>


${d.marcadores.map(x=>`

<p>${x}</p>

`).join("")}



<h3>Comparación</h3>


<p>Ataque</p>

<p class="stars">${d.ataque}</p>


<p>Defensa</p>

<p class="stars">${d.defensa}</p>



</div>


</div>


`;

}





function mostrarSeccion(seccion){


let contenido=document.getElementById("contenido");



if(seccion==="inicio"){

cargarInicio();

}



if(seccion==="predicciones"){


contenido.innerHTML=`

<h2>Predicciones</h2>


<div class="card">

<h3>América vs Toluca</h3>

<p>Predicción: América gana o empate</p>

<p>Confianza: 80%</p>

</div>



<div class="card">

<h3>Tigres vs Chivas</h3>

<p>Predicción: Tigres gana o empate</p>

<p>Confianza: 75%</p>

</div>



<div class="card">

<h3>Cruz Azul vs Monterrey</h3>

<p>Predicción: Partido equilibrado</p>

<p>Confianza: 65%</p>

</div>

`;

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



if(seccion==="perfil"){


contenido.innerHTML=`

<h2>Perfil</h2>


<div class="card">

<h3>Favoritos</h3>


${
favoritos.length

?

favoritos.map(id=>{

let p=partidos.find(x=>x.id===id);

return `<p>${p.local} vs ${p.visitante}</p>`

}).join("")

:

"<p>No tienes partidos favoritos</p>"

}


</div>


`;

}


}


cargarInicio();
