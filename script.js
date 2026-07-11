const partidos = [
{
id:"america",
local:"América",
visitante:"Toluca",
logoLocal:"/images/america.png",
logoVisitante:"/images/toluca.png",
estadio:"Estadio Ciudad de los Deportes",
hora:"20:00",
estado:"🕒 Próximo",
prob:[58,22,20],
confianza:"80%",
prediccion:"América gana o empate",
formaLocal:"🟢 G 🟢 G 🟡 E 🟢 G",
formaVisitante:"🟢 G 🟡 E 🟢 G",
resultados:[
"🥇 América 2 - 1 Toluca → 32%",
"🥈 América 1 - 0 Toluca → 24%",
"🥉 América 1 - 1 Toluca → 18%"
],
factores:[
"⚔️ Ataque: 🦅 ⭐⭐⭐⭐⭐ | 🔴 ⭐⭐⭐⭐",
"🛡️ Defensa: 🦅 ⭐⭐⭐ | 🔴 ⭐⭐⭐⭐",
"🏟️ Localía: 🦅 ⭐⭐⭐⭐⭐"
]
},
{
id:"tigres",
local:"Tigres",
visitante:"Chivas",
logoLocal:"/images/tigres.png",
logoVisitante:"/images/chivas.png",
estadio:"Estadio Universitario",
hora:"21:00",
estado:"🕒 Próximo",
prob:[51,26,23],
confianza:"75%",
prediccion:"Tigres gana o empate",
formaLocal:"🟢 G 🟢 G 🟡 E",
formaVisitante:"🟢 G 🔴 P 🟡 E",
resultados:[
"🥇 Tigres 2 - 0 Chivas → 30%",
"🥈 Tigres 2 - 1 Chivas → 25%",
"🥉 Tigres 1 - 1 Chivas → 20%"
],
factores:[
"⚔️ Ataque: 🐯 ⭐⭐⭐⭐⭐ | 🐐 ⭐⭐⭐",
"🛡️ Defensa: 🐯 ⭐⭐⭐⭐ | 🐐 ⭐⭐⭐",
"🏟️ Localía: 🐯 ⭐⭐⭐⭐⭐"
]
},
{
id:"cruzazul",
local:"Cruz Azul",
visitante:"Monterrey",
logoLocal:"/images/cruzazul.png",
logoVisitante:"/images/monterrey.png",
estadio:"Estadio Ciudad de los Deportes",
hora:"19:00",
estado:"🕒 Próximo",
prob:[35,30,35],
confianza:"65%",
prediccion:"Partido equilibrado",
formaLocal:"🟢 G 🟡 E 🟢 G",
formaVisitante:"🟢 G 🟢 G 🟡 E",
resultados:[
"🥇 Cruz Azul 1 - 1 Monterrey → 30%",
"🥈 Cruz Azul 1 - 0 Monterrey → 22%",
"🥉 Cruz Azul 2 - 1 Monterrey → 18%"
],
factores:[
"⚔️ Ataque: 🔵 ⭐⭐⭐⭐ | 🔵 ⭐⭐⭐⭐⭐",
"🛡️ Defensa: 🔵 ⭐⭐⭐⭐ | 🔵 ⭐⭐⭐⭐",
"🏟️ Localía: 🔵 ⭐⭐⭐⭐"
]
}
];

function obtenerFavoritos(){
return JSON.parse(localStorage.getItem("favoritosMatchIQ") || "[]");
}

function guardarFavoritos(f){
localStorage.setItem("favoritosMatchIQ", JSON.stringify(f));
}

function esFavorito(id){
return obtenerFavoritos().includes(id);
}

function toggleFavorito(id){
let f=obtenerFavoritos();
f=f.includes(id)?f.filter(x=>x!==id):[...f,id];
guardarFavoritos(f);
cargarInicio();
}

function tarjetaPartido(p){
return `
<div class="card partido">
<div class="teams">
<div class="team"><img src="${p.logoLocal}"><span>${p.local}</span></div>
<span class="vs">VS</span>
<div class="team"><img src="${p.logoVisitante}"><span>${p.visitante}</span></div>
</div>

<p><strong>${p.estado}</strong></p>
<p>📍 ${p.estadio}</p>
<p>🕗 ${p.hora}</p>

<div class="prediction">Probabilidad de victoria</div>
<div class="bar"><div class="${p.id}"></div></div>

<p>${p.local} ${p.prob[0]}% - Empate ${p.prob[1]}% - ${p.visitante} ${p.prob[2]}%</p>

<button onclick="mostrarAnalisis(this,'${p.id}')">Ver análisis</button>
<button onclick="toggleFavorito('${p.id}')">${esFavorito(p.id)?'⭐ Quitar favorito':'☆ Agregar favorito'}</button>
</div>`;
}

function cargarInicio(){
document.getElementById('contenido').innerHTML =
`<h2>Liga MX - Jornada 1</h2>` + partidos.map(tarjetaPartido).join('');
}

function mostrarAnalisis(boton,id){
let existe=boton.parentElement.querySelector('.analisis');
if(existe){existe.remove();return;}

let p=partidos.find(x=>x.id===id);

let div=document.createElement('div');
div.className='analisis';
div.innerHTML=`
<div class="teams">
<div class="team"><img src="${p.logoLocal}"><span>${p.local}</span></div>
<span class="vs">VS</span>
<div class="team"><img src="${p.logoVisitante}"><span>${p.visitante}</span></div>
</div>

<h3>📊 Análisis MatchIQ</h3>
<p><strong>Forma reciente</strong></p>
<p>${p.local}: ${p.formaLocal}</p>
<p>${p.visitante}: ${p.formaVisitante}</p>

<p><strong>🤖 Predicción:</strong> ${p.prediccion}</p>
<p><strong>📈 Confianza:</strong> ${p.confianza}</p>

<h3>🎯 Resultados más probables</h3>
${p.resultados.map(r=>`<p>${r}</p>`).join('')}

<h3>🔍 Factores clave</h3>
${p.factores.map(f=>`<p>${f}</p>`).join('')}
`;

boton.parentElement.appendChild(div);
}

function mostrarSeccion(seccion){
let c=document.getElementById('contenido');

if(seccion==='inicio') cargarInicio();

if(seccion==='estadisticas'){
c.innerHTML=`<h2>📊 Estadísticas Liga MX</h2><div class="card"><h3>🏆 Tabla de posiciones</h3><p>🦅 América - 15 pts</p><p>🐯 Tigres - 13 pts</p><p>🔵 Monterrey - 12 pts</p><p>🐐 Chivas - 10 pts</p></div><div class="card"><h3>🥇 Goleadores</h3><p>Henry Martín - 7</p><p>Gignac - 6</p><p>Berterame - 5</p></div><div class="card"><h3>🎯 Asistidores</h3><p>Fidalgo - 5</p><p>Brunetta - 4</p><p>Romo - 4</p></div><div class="card"><h3>⚡ Contribuciones de gol</h3><p>Henry Martín - 10</p><p>Fidalgo - 8</p><p>Gignac - 8</p></div><div class="card"><h3>🟨 Amarillas</h3><p>Jesús Angulo - 4</p><p>Víctor Guzmán - 3</p></div><div class="card"><h3>🟥 Rojas</h3><p>Jugador A - 1</p><p>Jugador B - 1</p></div><div class="card"><h3>🧤 Porterías a cero</h3><p>Malagón - 4</p><p>Nahuel - 3</p><p>Andrada - 3</p></div>`;
}

if(seccion==='predicciones'){
c.innerHTML=`<h2>🤖 Predicciones MatchIQ</h2>` + partidos.map(p=>`
<div class="card">
<div class="teams">
<div class="team"><img src="${p.logoLocal}"><span>${p.local}</span></div>
<span class="vs">VS</span>
<div class="team"><img src="${p.logoVisitante}"><span>${p.visitante}</span></div>
</div>
<p><strong>${p.estado}</strong></p>
<p>Victoria ${p.local}: ${p.prob[0]}%</p>
<p>Empate: ${p.prob[1]}%</p>
<p>Victoria ${p.visitante}: ${p.prob[2]}%</p>
<p><strong>🤖 Recomendación:</strong> ${p.prediccion}</p>
<p><strong>📈 Confianza:</strong> ${p.confianza}</p>
<h3>🎯 Resultados más probables</h3>
${p.resultados.map(r=>`<p>${r}</p>`).join('')}
<h3>🔍 Factores clave</h3>
${p.factores.map(f=>`<p>${f}</p>`).join('')}
</div>`).join('');
}

if(seccion==='perfil'){
const fav=partidos.filter(p=>obtenerFavoritos().includes(p.id));
c.innerHTML=`<h2>⚙️ Perfil</h2><div class="card"><h3>👤 Usuario</h3><p>Isaac</p></div><div class="card"><h3>⚽ Equipo favorito</h3><div class="team"><img src="/images/america.png"><p>América</p></div></div><div class="card"><h3>⭐ Mis partidos favoritos</h3>${fav.length?fav.map(p=>`<div class="teams"><div class="team"><img src="${p.logoLocal}"><span>${p.local}</span></div><span class="vs">VS</span><div class="team"><img src="${p.logoVisitante}"><span>${p.visitante}</span></div></div>`).join(''):'<p>Aún no has agregado favoritos.</p>'}</div>`;
}
}
