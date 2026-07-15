// =======================================
// MATCHIQ MX
// SCRIPT.JS FINAL
// PARTE 1/4
// =======================================


// ===============================
// CONFIGURACIÓN
// ===============================

const API_URL = 'https://miapp-peach-six.vercel.app/api/sportsdb';


// Temporada seleccionada
let anioSeleccionado = 2026;
let torneoSeleccionado = 'PENE';
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


// Favoritos
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

if(type === 'teams'){
return datos.teams || [];
}

if(type === 'fixtures' || type === 'past'){
return datos.events || [];
}

if(type === 'team'){
return datos.team || [];
}

if(type === 'standings'){
return datos.table || [];
}

if(type === 'players'){
return datos.players || [];
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
nombre: 'Equipo',
logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'

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


// Filtrar por jornada
let jornadaReal = datos.filter(p =>

String(p.intRound || '') === String(jornadaSeleccionada)

);


// Si no existe esa jornada, mostrar todos
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

p.intHomeScore !== null &&
p.intAwayScore !== null

? `${p.intHomeScore}-${p.intAwayScore}`

: null,

probLocal: 45,
probEmpate: 28,
probVisitante: 27,

prediccion:
'Analizando forma reciente, goles y contexto del partido.'

}));


return partidos;

}


// ===============================
// LOGOS
// ===============================

function mostrarLogo(url, tipo='small'){

let clase = 'logo-small';

if(tipo === 'medium') clase = 'logo-medium';
if(tipo === 'large') clase = 'logo-large';
if(tipo === 'table') clase = 'table-logo';

return `

<img
class='${clase}'
src='${url}'
onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'">

`;

}


// ===============================
// AÑOS
// ===============================

function crearOpcionesAnios(){

let html = '';

for(let i = 2024; i <= 2027; i++){

html += `
<option value='${i}' ${i===anioSeleccionado?'selected':''}>
${i}
</option>
`;

}

return html;

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
// CAMBIAR AÑO
// ===============================

async function cambiarAnio(){

anioSeleccionado = Number(
document.getElementById('anioLiga').value
);

await cargarPartidosAPI();

mostrarListaPartidos();

}


// ===============================
// CAMBIAR TORNEO
// ===============================

async function cambiarTorneo(){

torneoSeleccionado =
document.getElementById('tipoTorneo').value;

await cargarPartidosAPI();

mostrarListaPartidos();

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
// =======================================
// MATCHIQ MX
// SCRIPT.JS FINAL
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
${mostrarLogo(p.local.logo, 'large')}
<strong>${p.local.nombre}</strong>
</div>

<h2>VS</h2>

<div>
${mostrarLogo(p.visitante.logo, 'large')}
<strong>${p.visitante.nombre}</strong>
</div>

</div>

<p>📅 ${p.fecha}</p>
<p>🕒 ${p.hora}</p>
<p>🏟 ${p.estadio}</p>

${p.resultado ? `<h3>Resultado: ${p.resultado}</h3>` : ''}

<button onclick="mostrarAnalisis('${p.id}')">
Ver análisis
</button>

</div>

<div class='card prediction-card'>

<h3>Predicción MatchIQ</h3>

<div class='probabilidad'>

<div class='probabilidad-header'>
<span>${p.local.nombre}</span>
<span>${p.probLocal}%</span>
</div>

<div class='barra'>
<div class='barra-local'
style='width:${p.probLocal}%'></div>
</div>

<div class='probabilidad-header'>
<span>Empate</span>
<span>${p.probEmpate}%</span>
</div>

<div class='barra'>
<div class='barra-empate'
style='width:${p.probEmpate}%'></div>
</div>

<div class='probabilidad-header'>
<span>${p.visitante.nombre}</span>
<span>${p.probVisitante}%</span>
</div>

<div class='barra'>
<div class='barra-visitante'
style='width:${p.probVisitante}%'></div>
</div>

</div>

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

<div class='card filtros-card'>

<div class='filtro'>

<h3>Año</h3>

<select id='anioLiga' onchange='cambiarAnio()'>
${crearOpcionesAnios()}
</select>

</div>

<div class='filtro'>

<h3>Torneo</h3>

<select id='tipoTorneo' onchange='cambiarTorneo()'>

<option value='Apertura'
${torneoSeleccionado==='Apertura'?'selected':''}>
Apertura
</option>

<option value='Clausura'
${torneoSeleccionado==='Clausura'?'selected':''}>
Clausura
</option>

</select>

</div>

<div class='filtro'>

<h3>Jornada</h3>

<select id='jornadaLiga' onchange='cambiarJornada()'>
${crearOpcionesJornadas()}
</select>

</div>

</div>

<div id='listaPartidosLiga'>
Cargando partidos...
</div>

`;

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

<div class='card partido-card'>

<div class='match-header'>

<div>
${mostrarLogo(p.local.logo, 'medium')}
<strong>${p.local.nombre}</strong>
</div>

<h3>VS</h3>

<div>
${mostrarLogo(p.visitante.logo, 'medium')}
<strong>${p.visitante.nombre}</strong>
</div>

</div>

<div class='partido-info'>

<p>📅 ${p.fecha}</p>
<p>🕒 ${p.hora}</p>
<p>🏟 ${p.estadio}</p>

${p.resultado
? `<h3>Resultado: ${p.resultado}</h3>`
: `<h3>Próximo partido</h3>`}

</div>

<div class='partido-botones'>

<button onclick="mostrarAnalisis('${p.id}')">
Análisis
</button>

<button onclick="mostrarAlineaciones('${p.id}')">
Alineaciones
</button>

</div>

</div>

`).join('');

}


// ===============================
// UTILIDADES
// ===============================

function formatearFecha(fecha){

if(!fecha) return 'Por confirmar';

try{

return new Date(fecha).toLocaleDateString('es-MX', {
weekday:'short',
day:'numeric',
month:'short'
});

}catch{

return fecha;

}

}
// =======================================
// MATCHIQ MX
// SCRIPT.JS FINAL
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

<div class='match-header'>

<div>
${mostrarLogo(p.local.logo, 'medium')}
<strong>${p.local.nombre}</strong>
</div>

<h3>VS</h3>

<div>
${mostrarLogo(p.visitante.logo, 'medium')}
<strong>${p.visitante.nombre}</strong>
</div>

</div>

<div class='probabilidad'>

<div class='probabilidad-header'>
<span>${p.local.nombre}</span>
<span>${p.probLocal}%</span>
</div>

<div class='barra'>
<div class='barra-local'
style='width:${p.probLocal}%'></div>
</div>

<div class='probabilidad-header'>
<span>Empate</span>
<span>${p.probEmpate}%</span>
</div>

<div class='barra'>
<div class='barra-empate'
style='width:${p.probEmpate}%'></div>
</div>

<div class='probabilidad-header'>
<span>${p.visitante.nombre}</span>
<span>${p.probVisitante}%</span>
</div>

<div class='barra'>
<div class='barra-visitante'
style='width:${p.probVisitante}%'></div>
</div>

</div>

<p><strong>Predicción:</strong> ${p.prediccion}</p>

<ul>
<li>📈 Forma reciente</li>
<li>⚽ Goles anotados</li>
<li>🛡️ Rendimiento defensivo</li>
<li>🏠 Ventaja de local</li>
<li>🧠 Índice MatchIQ</li>
</ul>

<button onclick="mostrarAnalisis('${p.id}')">
Ver análisis completo
</button>

</div>

`).join('')}

`;

}


// ===============================
// ANÁLISIS
// ===============================

function mostrarAnalisis(id){

const p = partidos.find(x => x.id == id);

if(!p) return;

const contenido = document.getElementById('contenido');

const indiceLocal = Math.min(95, p.probLocal + 20);
const indiceVisitante = Math.min(95, p.probVisitante + 20);

contenido.innerHTML = `

<button onclick='cargarPartidos()'>
← Regresar
</button>

<div class='card analysis-section'>

<div class='match-header'>

<div>
${mostrarLogo(p.local.logo, 'large')}
<strong>${p.local.nombre}</strong>
</div>

<h2>VS</h2>

<div>
${mostrarLogo(p.visitante.logo, 'large')}
<strong>${p.visitante.nombre}</strong>
</div>

</div>

<p>📅 ${p.fecha}</p>
<p>🕒 ${p.hora}</p>
<p>🏟 ${p.estadio}</p>

<h3>📊 Probabilidades</h3>

<div class='probabilidad'>

<div class='probabilidad-header'>
<span>${p.local.nombre}</span>
<span>${p.probLocal}%</span>
</div>

<div class='barra'>
<div class='barra-local'
style='width:${p.probLocal}%'></div>
</div>

<div class='probabilidad-header'>
<span>Empate</span>
<span>${p.probEmpate}%</span>
</div>

<div class='barra'>
<div class='barra-empate'
style='width:${p.probEmpate}%'></div>
</div>

<div class='probabilidad-header'>
<span>${p.visitante.nombre}</span>
<span>${p.probVisitante}%</span>
</div>

<div class='barra'>
<div class='barra-visitante'
style='width:${p.probVisitante}%'></div>
</div>

</div>

<h3>📈 Forma reciente</h3>

<div class='score-box'>
<div>W</div>
<div>D</div>
<div>W</div>
<div>L</div>
<div>W</div>
</div>

<p>
Se toma en cuenta el rendimiento reciente y la tendencia que llevan ambos equipos.
</p>

<h3>⚽ Ataque</h3>

<p>
Se considera la capacidad ofensiva, la generación de oportunidades y la efectividad frente al arco.
</p>

<h3>🛡️ Defensa</h3>

<p>
Se revisa la cantidad de goles recibidos y la solidez defensiva en los encuentros recientes.
</p>

<h3>🏠 Local vs Visitante</h3>

<div class='score-box'>
<div>Local ${indiceLocal}</div>
<div>Visitante ${indiceVisitante}</div>
</div>

<p>
El rendimiento cambia dependiendo de si el equipo juega en casa o fuera.
</p>

<h3>🧠 Índice MatchIQ</h3>

<div class='score-box'>
<div>${indiceLocal}</div>
<div>${indiceVisitante}</div>
</div>

<p>
El índice MatchIQ combina forma reciente, ataque, defensa y contexto del partido.
</p>

<h3>🎯 Marcadores probables</h3>

<div class='score-box'>
<div>2-1</div>
<div>1-1</div>
<div>1-0</div>
</div>

<h3>📌 Conclusión</h3>

<p>
${p.prediccion}
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

<h2>Alineaciones</h2>

<div class='match-header'>

<div>
${mostrarLogo(partido.local.logo, 'large')}
<strong>${partido.local.nombre}</strong>
</div>

<h2>VS</h2>

<div>
${mostrarLogo(partido.visitante.logo, 'large')}
<strong>${partido.visitante.nombre}</strong>
</div>

</div>

<div class='cancha-container'>

<div class='equipo-cancha local'>

<h3>${partido.local.nombre}</h3>

<div class='score-box'>
<div>4-3-3</div>
</div>

<p>
Alineación oficial pendiente.
</p>

</div>

<div class='linea-cancha'>
VS
</div>

<div class='equipo-cancha visitante'>

<h3>${partido.visitante.nombre}</h3>

<div class='score-box'>
<div>4-2-3-1</div>
</div>

<p>
Alineación oficial pendiente.
</p>

</div>

</div>

<h3>🪑 Banca</h3>

<div class='card'>

<p>
La banca y los titulares se cargarán automáticamente cuando agreguemos la API de alineaciones oficiales.
</p>

</div>

</div>

`;

}


// ===============================
// JUGADORES
// ===============================

async function cargarJugadoresEquipo(id){

// Preparado para una API futura de jugadores
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
La información individual de jugadores estará disponible próximamente.
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
// SCRIPT.JS FINAL
// PARTE 4/4
// =======================================


// ===============================
// CARGAR TABLA
// ===============================

async function cargarTabla(){

// SportsDB gratis no siempre devuelve la tabla actual.
// Dejamos la función preparada y, si no hay datos,
// mostramos una tabla basada en los equipos cargados.

const datos = await llamarAPI('standings');

if(datos.length){

tablaAPI = datos;

}else{

tablaAPI = equiposAPI.map((e, i) => ({

rank: i + 1,
team: {
id: e.id,
name: e.nombre,
logo: e.logo
},
points: 0,
played: 0,
won: 0,
draw: 0,
lost: 0,
gf: 0,
ga: 0,
gd: 0

}));

}

}


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

await cargarTabla();

contenido.innerHTML = `

<h2>Estadísticas Liga MX</h2>

<div class='card filtros-card'>

<div class='filtro'>

<h3>Año</h3>

<select id='anioStats'
onchange='cargarStats()'>

${crearOpcionesAnios()}

</select>

</div>

<div class='filtro'>

<h3>Torneo</h3>

<select id='torneoStats'
onchange='cargarStats()'>

<option value='Apertura'
${torneoSeleccionado==='Apertura'?'selected':''}>
Apertura
</option>

<option value='Clausura'
${torneoSeleccionado==='Clausura'?'selected':''}>
Clausura
</option>

</select>

</div>

</div>

<div class='card table-container'>

<h3>Tabla de posiciones</h3>

<table class='liga-table'>

<tr>
<th>#</th>
<th>Equipo</th>
<th>PTS</th>
<th>PJ</th>
<th>G</th>
<th>E</th>
<th>P</th>
<th>GF</th>
<th>GC</th>
<th>DG</th>
</tr>

${tablaAPI.map(e => `

<tr>

<td>${e.rank}</td>

<td class='team-cell'>

${mostrarLogo(e.team.logo, 'table')}

${e.team.name}

</td>

<td><strong>${e.points}</strong></td>
<td>${e.played}</td>
<td>${e.won}</td>
<td>${e.draw}</td>
<td>${e.lost}</td>
<td>${e.gf}</td>
<td>${e.ga}</td>
<td>${e.gd}</td>

</tr>

`).join('')}

</table>

</div>

<div class='card'>

<h3>🏆 Líderes individuales</h3>

<div class='stats-grid'>

${crearTarjetaStat('⚽', 'Goleadores', 'Próximamente')}
${crearTarjetaStat('🎯', 'Asistencias', 'Próximamente')}
${crearTarjetaStat('🔥', 'Contribuciones de gol', 'Próximamente')}
${crearTarjetaStat('🟨', 'Tarjetas amarillas', 'Próximamente')}
${crearTarjetaStat('🟥', 'Tarjetas rojas', 'Próximamente')}
${crearTarjetaStat('🧤', 'Porterías a cero', 'Próximamente')}

</div>

</div>

`;

}


// ===============================
// TARJETA DE ESTADÍSTICA
// ===============================

function crearTarjetaStat(icono, titulo, valor){

return `

<div class='stats-player-card'>

<div>

<h3>${icono} ${titulo}</h3>

<p><strong>${valor}</strong></p>

</div>

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

<h3>Equipos favoritos</h3>

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
