// =======================================
// MATCHIQ MX
// SCRIPT.JS SPORTSDB
// PARTE 1/4
// =======================================


// ===============================
// CONFIGURACIÓN
// ===============================

const API_URL = 'https://miapp-peach-six.vercel.app/api/sportsdb';

let temporada = 2026;
let torneoSeleccionado = 'liga_mx';
let jornadaSeleccionada = 1;


// ===============================
// VARIABLES GLOBALES
// ===============================

let partidos = [];
let partidosAPI = [];
let equiposAPI = [];
let tablaAPI = [];
let jugadoresAPI = [];
let lideresAPI = [];

let notificaciones =
JSON.parse(localStorage.getItem('notificaciones')) || [];


// ===============================
// LLAMAR API
// ===============================

async function llamarAPI(type, extra=''){

try{

const respuesta = await fetch(
`${API_URL}?type=${type}${extra}`
);

const datos = await respuesta.json();


// Teams
if(type === 'teams'){
return datos.teams || [];
}


// Fixtures y Past
if(type === 'fixtures' || type === 'past'){
return datos.events || [];
}


// Team
if(type === 'team'){
return datos.team || [];
}


return [];

}
catch(error){

console.log('Error API:', error);
return [];

}

}


// ===============================
// CARGAR EQUIPOS
// ===============================

async function cargarEquiposAPI(){

const datos = await llamarAPI('teams');

equiposAPI = datos.map(e => ({

id: e.idTeam,

nombre: e.strTeam,

logo: e.strTeamBadge

}));


console.log('Equipos cargados:', equiposAPI);

}


// ===============================
// BUSCAR EQUIPO
// ===============================

function buscarEquipo(id){

return equiposAPI.find(e => e.id == id) || {

id,

nombre:'Equipo',

logo:'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'

};

}


// ===============================
// CARGAR PARTIDOS
// ===============================

async function cargarPartidosAPI(){

const datos = await llamarAPI('fixtures');

if(!datos.length){

partidos = [];
return [];

}


// Filtrar por jornada si existe
let jornadaReal = datos.filter(p =>

String(p.intRound || '') === String(jornadaSeleccionada)

);


// Si no hay partidos de esa jornada, mostrar todos
if(!jornadaReal.length){
jornadaReal = datos;
}


partidosAPI = jornadaReal;


partidos = jornadaReal.map(p => ({

id: p.idEvent,

local: {

id: p.idHomeTeam,

nombre: p.strHomeTeam,

logo: p.strHomeTeamBadge

},

visitante: {

id: p.idAwayTeam,

nombre: p.strAwayTeam,

logo: p.strAwayTeamBadge

},

fecha: p.dateEvent,

hora: p.strTimeLocal || p.strTime || 'Por confirmar',

estadio: p.strVenue || 'Por confirmar',

resultado:

p.intHomeScore !== null && p.intAwayScore !== null

? `${p.intHomeScore}-${p.intAwayScore}`

: null,

prediccion:

'Analizando datos de forma, goles y rendimiento'

}));


return partidos;

}


// ===============================
// LOGOS
// ===============================

function mostrarLogo(url, tipo='small'){

let clase = 'logo-small';

if(tipo === 'medium') clase = 'logo-medium';
if(tipo === 'table') clase = 'table-logo';

return `

<img
class='${clase}'
src='${url}'
onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'">

`;

}
// =======================================
// MATCHIQ MX
// SCRIPT.JS SPORTSDB
// PARTE 2/4
// =======================================


// ===============================
// INICIO
// ===============================

async function cargarInicio(){

const contenido = document.getElementById('contenido');

contenido.innerHTML = `

<h2>Inicio</h2>

<div class='card'>
Cargando partidos...
</div>

`;

if(partidos.length === 0){
await cargarPartidosAPI();
}

if(!partidos.length){

contenido.innerHTML = `

<h2>Inicio</h2>

<div class='card'>
No hay partidos disponibles.
</div>

`;

return;

}

const p = partidos[0];

contenido.innerHTML = `

<h2>Inicio</h2>

<div class='card home-match'>

<h3>Partido destacado</h3>

<div class='match-header'>

<div>
${mostrarLogo(p.local.logo, 'medium')}
<strong>${p.local.nombre}</strong>
</div>

<h2>VS</h2>

<div>
${mostrarLogo(p.visitante.logo, 'medium')}
<strong>${p.visitante.nombre}</strong>
</div>

</div>

<p>🕒 ${p.hora}</p>
<p>🏟 ${p.estadio}</p>

<button onclick="mostrarAnalisis('${p.id}')">
Ver análisis
</button>

</div>

<div class='card prediction-card'>

<h3>Predicción MatchIQ</h3>

<p>${p.prediccion}</p>

</div>

`;

}


// ===============================
// PARTIDOS
// ===============================

async function cargarPartidos(){

const contenido = document.getElementById('contenido');

contenido.innerHTML = `

<h2>Partidos Liga MX</h2>

<div class='card'>

<h3>Jornada</h3>

<select id='jornadaLiga' onchange='cambiarJornada()'>

${crearOpcionesJornadas()}

</select>

</div>

<div id='listaPartidosLiga'>
Cargando...
</div>

`;

await cargarPartidosAPI();

mostrarListaPartidos();

}


// ===============================
// JORNADAS
// ===============================

function crearOpcionesJornadas(){

let html = '';

for(let i = 1; i <= 17; i++){

html += `
<option value='${i}' ${i===jornadaSeleccionada?'selected':''}>
Jornada ${i}
</option>
`;

}

return html;

}


// ===============================
// CAMBIAR JORNADA
// ===============================

async function cambiarJornada(){

jornadaSeleccionada = Number(
document.getElementById('jornadaLiga').value
);

await cargarPartidosAPI();

mostrarListaPartidos();

}


// ===============================
// MOSTRAR PARTIDOS
// ===============================

function mostrarListaPartidos(){

const lista = document.getElementById('listaPartidosLiga');

if(!lista) return;

if(!partidos.length){

lista.innerHTML = `

<div class='card'>
No hay partidos registrados.
</div>

`;

return;

}

lista.innerHTML = partidos.map(p => `

<div class='card'>

<div class='match-header'>

<div>
${mostrarLogo(p.local.logo, 'small')}
<strong>${p.local.nombre}</strong>
</div>

<h3>VS</h3>

<div>
${mostrarLogo(p.visitante.logo, 'small')}
<strong>${p.visitante.nombre}</strong>
</div>

</div>

<p>🕒 ${p.hora}</p>
<p>🏟 ${p.estadio}</p>

${p.resultado ? `<h3>Resultado ${p.resultado}</h3>` : ''}

<button onclick="mostrarAnalisis('${p.id}')">
Análisis
</button>

<button onclick="mostrarAlineaciones('${p.id}')">
Alineaciones
</button>

</div>

`).join('');

}
// =======================================
// MATCHIQ MX
// SCRIPT.JS SPORTSDB
// PARTE 3/4
// =======================================


// ===============================
// PREDICCIONES
// ===============================

async function cargarPredicciones(){

const contenido = document.getElementById('contenido');

if(partidos.length === 0){
await cargarPartidosAPI();
}

contenido.innerHTML = `

<h2>Predicciones MatchIQ</h2>

${!partidos.length ? `

<div class='card'>
No hay partidos disponibles.
</div>

` : partidos.map(p => `

<div class='card prediction-card'>

<h3>${p.local.nombre} vs ${p.visitante.nombre}</h3>

<p><strong>Predicción MatchIQ</strong></p>

<ul>
<li>Forma reciente</li>
<li>Goles anotados</li>
<li>Rendimiento defensivo</li>
<li>Contexto del partido</li>
</ul>

<p>${p.prediccion}</p>

<button onclick="mostrarAnalisis('${p.id}')">
Ver análisis
</button>

</div>

`).join('')}

`;

}


// ===============================
// ANALISIS
// ===============================

function mostrarAnalisis(id){

const p = partidos.find(x => x.id == id);

if(!p) return;

const contenido = document.getElementById('contenido');

contenido.innerHTML = `

<button onclick='cargarPartidos()'>
← Regresar
</button>

<div class='card analysis-section'>

<h2>${p.local.nombre} vs ${p.visitante.nombre}</h2>

<h3>Forma reciente</h3>
<p>
Se evalúa el rendimiento reciente de ambos equipos y la tendencia que llevan en sus últimos encuentros.
</p>

<h3>Ataque</h3>
<p>
Se considera la capacidad ofensiva, la generación de oportunidades y la cantidad de goles anotados.
</p>

<h3>Defensa</h3>
<p>
Se revisa el comportamiento defensivo y los goles recibidos en partidos recientes.
</p>

<h3>Predicción MatchIQ</h3>

<div class='score-box'>
<div>2-1</div>
<div>1-1</div>
<div>1-0</div>
</div>

<p>
Esta predicción es una estimación basada en información disponible y puede cambiar conforme avance la temporada.
</p>

</div>

`;

}


// ===============================
// ALINEACIONES
// ===============================

async function mostrarAlineaciones(id){

const partido = partidos.find(p => p.id == id);

if(!partido) return;

const contenido = document.getElementById('contenido');

contenido.innerHTML = `

<button onclick='cargarPartidos()'>
← Regresar
</button>

<div class='card'>

<h2>${partido.local.nombre} vs ${partido.visitante.nombre}</h2>

<h3>Alineaciones</h3>

<p>
Las alineaciones oficiales todavía no están conectadas a MatchIQ.
</p>

<p>
Más adelante agregaremos una API especializada para mostrar titulares, banca y estadísticas en tiempo real.
</p>

<div class='cancha-container'>

<div class='equipo-cancha local'>
<h3>${partido.local.nombre}</h3>
${mostrarLogo(partido.local.logo, 'medium')}
</div>

<div class='linea-cancha'>VS</div>

<div class='equipo-cancha visitante'>
<h3>${partido.visitante.nombre}</h3>
${mostrarLogo(partido.visitante.logo, 'medium')}
</div>

</div>

</div>

`;

}


// ===============================
// JUGADORES
// ===============================

async function cargarJugadoresEquipo(id){

// SportsDB gratis no proporciona fácilmente
// plantillas completas por partido.
// Dejamos la función preparada para el futuro.

return [];

}


// ===============================
// POPUP JUGADOR
// ===============================

function mostrarJugador(id){

const popup = document.getElementById('player-popup');

if(!popup) return;

popup.innerHTML = `

<div class='popup-background'
onclick='cerrarJugador()'></div>

<div class='player-modal'>

<h2>Jugador</h2>

<p>
La información individual de jugadores estará disponible cuando conectemos una API especializada.
</p>

<button onclick='cerrarJugador()'>
Cerrar
</button>

</div>

`;

popup.style.display = 'block';

}


function cerrarJugador(){

const popup = document.getElementById('player-popup');

if(popup){

popup.style.display = 'none';
popup.innerHTML = '';

}

}
// =======================================
// MATCHIQ MX
// SCRIPT.JS SPORTSDB
// PARTE 4/4
// =======================================


// ===============================
// ESTADÍSTICAS
// ===============================

async function cargarStats(){

const contenido = document.getElementById('contenido');

contenido.innerHTML = `

<h2>Estadísticas Liga MX</h2>

<div class='card'>
Cargando datos...
</div>

`;

if(equiposAPI.length === 0){
await cargarEquiposAPI();
}

contenido.innerHTML = `

<h2>Estadísticas Liga MX</h2>

<div class='card'>

<h3>Equipos registrados</h3>

<p>
Actualmente hay <strong>${equiposAPI.length}</strong> equipos cargados desde SportsDB.
</p>

</div>

<div class='card'>

<h3>Clubes disponibles</h3>

<div class='stats-grid'>

${equiposAPI.map(e => `

<div class='stats-player-card'>

${mostrarLogo(e.logo, 'small')}

<div>

<h3>${e.nombre}</h3>

<p>ID: ${e.id}</p>

</div>

</div>

`).join('')}

</div>

</div>

<div class='card'>

<h3>Líderes individuales</h3>

<p>
Las estadísticas avanzadas y goleadores se agregarán cuando conectemos una API especializada.
</p>

</div>

`;

}


// ===============================
// PERFIL
// ===============================

async function cargarPerfil(){

const contenido = document.getElementById('contenido');

if(equiposAPI.length === 0){
await cargarEquiposAPI();
}

contenido.innerHTML = `

<h2>Perfil</h2>

<div class='card perfil-card'>

<img
src='images/profile.svg'
class='section-icon'
onerror="this.style.display='none'">

<h3>Isaac</h3>

<p>Usuario de MatchIQ MX</p>

</div>

<div class='card'>

<h3>Equipos Liga MX</h3>

${equiposAPI.map(e => `

<div class='team-follow'>

${mostrarLogo(e.logo, 'small')}

<strong>${e.nombre}</strong>

<button onclick="cambiarNotificacion('${e.id}')">

${notificaciones.includes(String(e.id))
? 'Siguiendo'
: 'Seguir'}

</button>

</div>

`).join('')}

</div>

`;

}


// ===============================
// FAVORITOS
// ===============================

function cambiarNotificacion(id){

id = String(id);

if(notificaciones.includes(id)){

notificaciones = notificaciones.filter(x => x !== id);

}else{

notificaciones.push(id);

}

localStorage.setItem(
'notificaciones',
JSON.stringify(notificaciones)
);

cargarPerfil();

}


// ===============================
// NAVEGACIÓN
// ===============================

function mostrarSeccion(seccion){

switch(seccion){

case 'inicio':
cargarInicio();
break;

case 'partidos':
cargarPartidos();
break;

case 'predicciones':
cargarPredicciones();
break;

case 'stats':
cargarStats();
break;

case 'perfil':
cargarPerfil();
break;

default:
cargarInicio();

}

}


// ===============================
// INICIO APP
// ===============================

document.addEventListener('DOMContentLoaded', async () => {

console.log('MatchIQ MX iniciado');

await cargarEquiposAPI();

await cargarPartidosAPI();

await cargarInicio();

});
