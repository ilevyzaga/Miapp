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
let torneoSeleccionado = 'Apertura';
let jornadaSeleccionada = 1;


// ===============================
// VARIABLES GLOBALES
// ===============================

let partidos = [];
let partidosAPI = [];
let partidosEnVivo = [];
let equiposAPI = [];
let tablaAPI = [];
let jugadoresAPI = [];
let lideresAPI = [];


// Sección visible actualmente (para resaltar el menú inferior)
let seccionActual = 'inicio';

// Jugadores de la alineación que está viendo el usuario ahora
// (id de jugador -> datos), para que el popup muestre info real
let jugadoresLineupActual = {};


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

if(type === 'fixtures' || type === 'past' || type === 'season' || type === 'live'){
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

if(type === 'lineup'){
return datos.lineup || [];
}

if(type === 'timeline'){
return datos.timeline || [];
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

// Traemos la temporada completa (todas las jornadas reales
// del Apertura o Clausura elegido), no solo los próximos 15
// partidos que da la API por default.
const datos = await llamarAPI(
'season',
`&torneo=${torneoSeleccionado}&anio=${anioSeleccionado}`
);

if(!datos.length){

partidos = [];
partidosAPI = [];
return [];

}


// Guardamos la temporada completa aparte (la usa Inicio
// para encontrar el próximo partido real, sin importar
// qué jornada esté seleccionada en el filtro)
partidosAPI = datos;


// Filtrar por jornada
let jornadaReal = datos.filter(p =>

String(p.intRound || '') === String(jornadaSeleccionada)

);


// Si la jornada seleccionada todavía no tiene partidos
// confirmados por la fuente de datos, lo dejamos claro
// en vez de mostrar partidos de otra jornada.
if(!jornadaReal.length){

partidos = [{

id: `pendiente-${torneoSeleccionado}-${anioSeleccionado}-${jornadaSeleccionada}`,
pendiente: true,
jornada: jornadaSeleccionada

}];

return partidos;

}


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
// PRÓXIMO PARTIDO (PARA INICIO)
// ===============================

// Busca en toda la temporada cargada (no solo en la jornada
// filtrada) el próximo partido real que todavía no se juega.
// Si ya no queda ninguno pendiente, regresa el último jugado.
function obtenerProximoPartido(){

const hoy = new Date().toISOString().slice(0, 10);

const sinJugar = partidosAPI.filter(p =>

p.dateEvent &&
p.dateEvent >= hoy &&
(p.intHomeScore === null || p.intHomeScore === undefined)

);

let elegido = null;

if(sinJugar.length){

elegido = sinJugar[0];

}else if(partidosAPI.length){

elegido = partidosAPI[partidosAPI.length - 1];

}

if(!elegido) return null;

return {

id: elegido.idEvent,

local: {
id: elegido.idHomeTeam,
nombre: elegido.strHomeTeam,
logo: elegido.strHomeTeamBadge
},

visitante: {
id: elegido.idAwayTeam,
nombre: elegido.strAwayTeam,
logo: elegido.strAwayTeamBadge
},

fecha: elegido.dateEvent,
hora: elegido.strTimeLocal || elegido.strTime || 'Por confirmar',
estadio: elegido.strVenue || 'Por confirmar',

resultado:
elegido.intHomeScore !== null &&
elegido.intHomeScore !== undefined &&
elegido.intAwayScore !== null &&
elegido.intAwayScore !== undefined
? `${elegido.intHomeScore}-${elegido.intAwayScore}`
: null,

probLocal: 45,
probEmpate: 28,
probVisitante: 27,

prediccion:
'Analizando forma reciente, goles y contexto del partido.'

};

}


// ===============================
// PARTIDOS EN VIVO (HOY)
// ===============================

async function cargarPartidosEnVivo(){

const datos = await llamarAPI('live');

if(!datos.length){

partidosEnVivo = [];
return [];

}

const ahora = new Date();

partidosEnVivo = datos.map(p => {

const inicio = p.strTimestamp
? new Date(p.strTimestamp)
: new Date(`${p.dateEvent}T${p.strTime || '00:00:00'}Z`);

const fin = new Date(inicio.getTime() + 130 * 60000);

const tieneResultado =
p.intHomeScore !== null &&
p.intHomeScore !== undefined &&
p.intAwayScore !== null &&
p.intAwayScore !== undefined;

let estado = 'por_comenzar';

if(ahora >= inicio && ahora <= fin){
estado = 'en_vivo';
}else if(ahora > fin){
estado = 'finalizado';
}

return {

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

resultado: tieneResultado
? `${p.intHomeScore}-${p.intAwayScore}`
: null,

estado

};

});

return partidosEnVivo;

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

<div class='card skeleton-loading'>
Cargando partidos...
</div>

`;

if(partidosAPI.length === 0){
await cargarPartidosAPI();
}

await cargarPartidosEnVivo();

const p = obtenerProximoPartido();

if(!p){

contenido.innerHTML = `

<h2>Inicio</h2>

<div class='card empty-state'>
No hay partidos disponibles.
</div>

`;

return;

}

const bloqueEnVivo = partidosEnVivo.length ? `

<div class='card card-vivo'>

<h3><span class='badge badge-vivo'>● En vivo hoy</span></h3>

${partidosEnVivo.map(pv => `

<div class='partido-vivo-item'>

<div class='match-header'>

<div>
${mostrarLogo(pv.local.logo, 'small')}
<strong>${pv.local.nombre}</strong>
</div>

<h3>${pv.resultado || 'VS'}</h3>

<div>
${mostrarLogo(pv.visitante.logo, 'small')}
<strong>${pv.visitante.nombre}</strong>
</div>

</div>

${pv.estado === 'en_vivo' ? `<span class='badge badge-vivo'>● Jugándose ahora</span>` : ''}
${pv.estado === 'por_comenzar' ? `<span class='badge badge-proximo'>Hoy · ${pv.hora}</span>` : ''}
${pv.estado === 'finalizado' ? `<span class='badge badge-finalizado'>Finalizado</span>` : ''}

</div>

`).join('')}

</div>

` : '';

contenido.innerHTML = `

<h2>Inicio</h2>

${bloqueEnVivo}

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

<div class='filtro'>

<h3>Hoy</h3>

<button onclick='verPartidosEnVivo()'>
🔴 En vivo hoy
</button>

</div>

</div>

<div id='listaPartidosLiga' class='skeleton-loading'>
Cargando partidos...
</div>

`;

await cargarPartidosAPI();

mostrarListaPartidos();

}


// ===============================
// VER PARTIDOS EN VIVO (BOTÓN)
// ===============================

async function verPartidosEnVivo(){

const lista = document.getElementById('listaPartidosLiga');

if(lista){
lista.className = 'skeleton-loading';
lista.innerHTML = 'Cargando partidos de hoy...';
}

await cargarPartidosEnVivo();

mostrarPartidosEnVivo();

}


// ===============================
// MOSTRAR PARTIDOS EN VIVO
// ===============================

function mostrarPartidosEnVivo(){

const lista = document.getElementById('listaPartidosLiga');

if(!lista) return;

lista.className = '';

if(!partidosEnVivo.length){

lista.innerHTML = `

<div class='card empty-state'>
No hay partidos programados para hoy.
</div>

<button onclick='mostrarListaPartidos()'>
← Ver jornada seleccionada
</button>

`;

return;

}

lista.innerHTML = `

<button onclick='mostrarListaPartidos()'>
← Ver jornada seleccionada
</button>

` + partidosEnVivo.map(p => `

<div class='card partido-card ${p.estado === "en_vivo" ? "card-vivo" : ""}'>

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

<p>📅 ${formatearFecha(p.fecha)}</p>
<p>🕒 ${p.hora}</p>
<p>🏟 ${p.estadio}</p>

${p.estado === 'en_vivo' ? `<span class='badge badge-vivo'>● En vivo ${p.resultado ? '· ' + p.resultado : ''}</span>` : ''}
${p.estado === 'por_comenzar' ? `<span class='badge badge-proximo'>Por comenzar</span>` : ''}
${p.estado === 'finalizado' ? `<span class='badge badge-finalizado'>Finalizado ${p.resultado ? '· ' + p.resultado : ''}</span>` : ''}

</div>

</div>

`).join('');

}


// ===============================
// MOSTRAR PARTIDOS
// ===============================

function mostrarListaPartidos(){

const lista = document.getElementById('listaPartidosLiga');

if(!lista) return;

lista.className = '';

if(!partidos.length){

lista.innerHTML = `

<div class='card empty-state'>
No hay partidos registrados.
</div>

`;

return;

}

// Jornada todavía sin partidos confirmados por la fuente de datos
if(partidos.length === 1 && partidos[0].pendiente){

lista.innerHTML = `

<div class='card empty-state'>
<h3>Jornada ${partidos[0].jornada}</h3>
<p>Por confirmar. Todavía no hay partidos publicados para esta jornada.</p>
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

<p>📅 ${formatearFecha(p.fecha)}</p>
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

const sinDatos =
!partidos.length ||
(partidos.length === 1 && partidos[0].pendiente);

contenido.innerHTML = `

<h2>Predicciones MatchIQ</h2>

${sinDatos ? `

<div class='card empty-state'>
No hay partidos disponibles todavía para esta jornada.
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

<div class='card skeleton-loading'>
Cargando alineación...
</div>

`;

let lineup = [];

// Solo tiene sentido buscar alineación real en partidos que
// ya se jugaron (antes del pitazo inicial no existe todavía).
if(partido.resultado){

lineup = await llamarAPI('lineup', `&id=${partido.id}`);

}

if(lineup.length){

mostrarAlineacionReal(partido, lineup);

}else{

mostrarAlineacionSimulada(partido);

}

}


// ===============================
// ALINEACIÓN SIMULADA (RESPALDO)
// ===============================

// Se usa cuando el partido todavía no se juega o cuando
// TheSportsDB no tiene capturada la alineación de ese partido.
function mostrarAlineacionSimulada(partido){

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
La banca y los titulares se cargarán automáticamente cuando la fuente de datos tenga capturada la alineación oficial de este partido.
</p>

</div>

</div>

`;

}


// ===============================
// CATEGORIZAR POSICIÓN
// ===============================

// TheSportsDB da la posición como texto libre
// ("Right Wing", "Attacking Midfielder", etc.)
// la agrupamos en 4 líneas para dibujar la cancha.
function categorizarPosicion(strPosition){

const p = (strPosition || '').toLowerCase();

if(p.includes('goalkeeper') || p.includes('keeper')) return 'portero';

if(p.includes('back') || p.includes('defender')) return 'defensa';

if(p.includes('wing') || p.includes('forward') || p.includes('striker')) return 'delantero';

return 'medio';

}


// ===============================
// FILA DE JUGADORES EN LA CANCHA
// ===============================

function filaJugadores(jugadores){

if(!jugadores.length) return '';

return `

<div class='fila-cancha'>

${jugadores.map(j => `

<div class='jugador-cancha' onclick="mostrarJugador('${j.idPlayer}')">

<img
src='${j.strCutout || j.strThumb || "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"}'
onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'">

<strong>${j.strPlayer}</strong>
<span>${j.intSquadNumber ? '#' + j.intSquadNumber : ''}</span>

</div>

`).join('')}

</div>

`;

}


// ===============================
// ALINEACIÓN REAL (CON FOTOS)
// ===============================

function mostrarAlineacionReal(partido, lineup){

const contenido = document.getElementById('contenido');

// Guardamos todos los jugadores de este partido para
// que el popup (mostrarJugador) pueda mostrar su info real.
jugadoresLineupActual = {};

lineup.forEach(j => {
jugadoresLineupActual[j.idPlayer] = j;
});

const localJugadores = lineup.filter(j => j.strHome === 'Yes');
const visitanteJugadores = lineup.filter(j => j.strHome === 'No');

const construirLineas = (jugadores) => {

const titulares = jugadores.filter(j => j.strSubstitute !== 'Yes');

const porLinea = {
portero: [],
defensa: [],
medio: [],
delantero: []
};

titulares.forEach(j => {
porLinea[categorizarPosicion(j.strPosition)].push(j);
});

return `

${filaJugadores(porLinea.portero)}
${filaJugadores(porLinea.defensa)}
${filaJugadores(porLinea.medio)}
${filaJugadores(porLinea.delantero)}

`;

};

const bancaHTML = (jugadores) => {

const banca = jugadores.filter(j => j.strSubstitute === 'Yes');

if(!banca.length){

return `<p>Sin datos de banca para este partido.</p>`;

}

return banca.map(j => `

<div class='banca-jugador' onclick="mostrarJugador('${j.idPlayer}')">

<img
src='${j.strCutout || j.strThumb || "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"}'
onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'">

<span>${j.strPlayer}</span>

</div>

`).join('');

};

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

<h2>${partido.resultado || 'VS'}</h2>

<div>
${mostrarLogo(partido.visitante.logo, 'large')}
<strong>${partido.visitante.nombre}</strong>
</div>

</div>

<div class='cancha'>

<div class='equipo-cancha visitante'>
${construirLineas(visitanteJugadores)}
</div>

<div class='linea-cancha'>VS</div>

<div class='equipo-cancha local'>
${construirLineas(localJugadores)}
</div>

</div>

<div class='bancas'>

<div>
<h3>🪑 Banca — ${partido.local.nombre}</h3>
${bancaHTML(localJugadores)}
</div>

<div>
<h3>🪑 Banca — ${partido.visitante.nombre}</h3>
${bancaHTML(visitanteJugadores)}
</div>

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

const jugador = jugadoresLineupActual[id];

// Si tenemos datos reales de este jugador (vinieron de la
// alineación que se cargó), mostramos su info real.
if(jugador){

popup.innerHTML = `

<div class='popup-background'
onclick='cerrarJugador()'></div>

<div class='player-modal'>

<img
class='player-photo'
src='${jugador.strRender || jugador.strCutout || jugador.strThumb || "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"}'
onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'">

<h2>${jugador.strPlayer}</h2>

<p><strong>Equipo:</strong> ${jugador.strTeam}</p>
<p><strong>Posición:</strong> ${jugador.strPosition || 'Sin dato'}</p>
${jugador.intSquadNumber ? `<p><strong>Número:</strong> ${jugador.intSquadNumber}</p>` : ''}
<p><strong>Titular o suplente:</strong> ${jugador.strSubstitute === 'Yes' ? 'Suplente' : 'Titular'}</p>

<button onclick='cerrarJugador()'>
Cerrar
</button>

</div>

`;

popup.style.display = 'block';

return;

}

// Sin datos reales: mensaje de siempre
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

// Ya no dependemos de un endpoint "standings" (nunca existió
// en el backend). Calculamos la tabla nosotros mismos a partir
// de los resultados reales que ya trae la temporada cargada.

if(partidosAPI.length === 0){
await cargarPartidosAPI();
}

const stats = {};

// Arrancamos con todos los equipos conocidos en 0,
// así aparecen aunque todavía no hayan jugado
equiposAPI.forEach(e => {

stats[e.id] = {
id: e.id,
nombre: e.nombre,
logo: e.logo,
pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0
};

});

partidosAPI.forEach(ev => {

const tieneResultado =
ev.intHomeScore !== null &&
ev.intHomeScore !== undefined &&
ev.intAwayScore !== null &&
ev.intAwayScore !== undefined &&
ev.intHomeScore !== '' &&
ev.intAwayScore !== '';

if(!tieneResultado) return;

const gLocal = Number(ev.intHomeScore);
const gVisita = Number(ev.intAwayScore);

const idLocal = ev.idHomeTeam;
const idVisita = ev.idAwayTeam;

if(!stats[idLocal]){
stats[idLocal] = {
id: idLocal, nombre: ev.strHomeTeam, logo: ev.strHomeTeamBadge,
pj:0, g:0, e:0, p:0, gf:0, gc:0
};
}

if(!stats[idVisita]){
stats[idVisita] = {
id: idVisita, nombre: ev.strAwayTeam, logo: ev.strAwayTeamBadge,
pj:0, g:0, e:0, p:0, gf:0, gc:0
};
}

stats[idLocal].pj++;
stats[idVisita].pj++;

stats[idLocal].gf += gLocal;
stats[idLocal].gc += gVisita;

stats[idVisita].gf += gVisita;
stats[idVisita].gc += gLocal;

if(gLocal > gVisita){

stats[idLocal].g++;
stats[idVisita].p++;

}else if(gLocal < gVisita){

stats[idVisita].g++;
stats[idLocal].p++;

}else{

stats[idLocal].e++;
stats[idVisita].e++;

}

});

let tabla = Object.values(stats).map(t => ({

team: {
id: t.id,
name: t.nombre,
logo: t.logo
},

played: t.pj,
won: t.g,
draw: t.e,
lost: t.p,
gf: t.gf,
ga: t.gc,
gd: t.gf - t.gc,
points: (t.g * 3) + t.e

}));

// Orden real de tabla: puntos, luego diferencia de gol, luego goles a favor
tabla.sort((a, b) =>
b.points - a.points ||
b.gd - a.gd ||
b.gf - a.gf
);

tabla = tabla.map((t, i) => ({ ...t, rank: i + 1 }));

tablaAPI = tabla;

}


// ===============================
// LÍDERES INDIVIDUALES
// ===============================

// Porterías a cero se saca directo de los marcadores (ya los
// tenemos). Goleadores / asistencias / tarjetas necesitan el
// timeline de cada partido jugado, así que se piden en paralelo.
async function cargarLideres(){

if(partidosAPI.length === 0){
await cargarPartidosAPI();
}

const jugados = partidosAPI.filter(ev =>
ev.intHomeScore !== null && ev.intHomeScore !== undefined && ev.intHomeScore !== '' &&
ev.intAwayScore !== null && ev.intAwayScore !== undefined && ev.intAwayScore !== ''
);

// Porterías a cero (por equipo)
const porterias = {};

jugados.forEach(ev => {

if(!porterias[ev.idHomeTeam]){
porterias[ev.idHomeTeam] = { nombre: ev.strHomeTeam, logo: ev.strHomeTeamBadge, cantidad: 0 };
}

if(!porterias[ev.idAwayTeam]){
porterias[ev.idAwayTeam] = { nombre: ev.strAwayTeam, logo: ev.strAwayTeamBadge, cantidad: 0 };
}

if(Number(ev.intAwayScore) === 0){
porterias[ev.idHomeTeam].cantidad++;
}

if(Number(ev.intHomeScore) === 0){
porterias[ev.idAwayTeam].cantidad++;
}

});

lideresAPI = {

porterias: Object.values(porterias)
.filter(t => t.cantidad > 0)
.sort((a, b) => b.cantidad - a.cantidad)
.slice(0, 5),

goleadores: [],
asistencias: [],
contribuciones: [],
amarillas: [],
rojas: []

};

if(!jugados.length) return;

const resultados = await Promise.allSettled(
jugados.map(ev => llamarAPI('timeline', `&id=${ev.idEvent}`))
);

const goles = {};
const asistencias = {};
const amarillas = {};
const rojas = {};

const sumar = (mapa, nombre, equipo) => {

if(!nombre) return;

if(!mapa[nombre]){
mapa[nombre] = { nombre, equipo, cantidad: 0 };
}

mapa[nombre].cantidad++;

};

resultados.forEach(r => {

if(r.status !== 'fulfilled') return;

r.value.forEach(t => {

const tipo = (t.strTimeline || '').toLowerCase();

if(tipo === 'goal'){

sumar(goles, t.strPlayer, t.strTeam);

if(t.strAssist){
sumar(asistencias, t.strAssist, t.strTeam);
}

}

if(tipo === 'card'){

const detalle = (t.strTimelineDetail || '').toLowerCase();

if(detalle.includes('yellow')){
sumar(amarillas, t.strPlayer, t.strTeam);
}

if(detalle.includes('red')){
sumar(rojas, t.strPlayer, t.strTeam);
}

}

});

});

const aTop5 = (mapa) =>
Object.values(mapa)
.sort((a, b) => b.cantidad - a.cantidad)
.slice(0, 5);

lideresAPI.goleadores = aTop5(goles);
lideresAPI.asistencias = aTop5(asistencias);
lideresAPI.amarillas = aTop5(amarillas);
lideresAPI.rojas = aTop5(rojas);

const contribuciones = {};

Object.values(goles).forEach(g => {
contribuciones[g.nombre] = { nombre: g.nombre, equipo: g.equipo, cantidad: g.cantidad };
});

Object.values(asistencias).forEach(a => {

if(!contribuciones[a.nombre]){
contribuciones[a.nombre] = { nombre: a.nombre, equipo: a.equipo, cantidad: 0 };
}

contribuciones[a.nombre].cantidad += a.cantidad;

});

lideresAPI.contribuciones = aTop5(contribuciones);

}


// ===============================
// CAMBIAR FILTROS DE STATS
// ===============================

async function cambiarAnioStats(){

anioSeleccionado = Number(
document.getElementById('anioStats').value
);

await cargarPartidosAPI();
await cargarStats();

}


async function cambiarTorneoStats(){

torneoSeleccionado =
document.getElementById('torneoStats').value;

await cargarPartidosAPI();
await cargarStats();

}


// ===============================
// ESTADÍSTICAS
// ===============================

async function cargarStats(){

const contenido = document.getElementById('contenido');

contenido.innerHTML = `

<h2>Estadísticas Liga MX</h2>

<div class='card skeleton-loading'>
Cargando datos...
</div>

`;

if(equiposAPI.length === 0){
await cargarEquiposAPI();
}

if(partidosAPI.length === 0){
await cargarPartidosAPI();
}

await cargarTabla();

await cargarLideres();

contenido.innerHTML = `

<h2>Estadísticas Liga MX</h2>

<div class='card filtros-card'>

<div class='filtro'>

<h3>Año</h3>

<select id='anioStats'
onchange='cambiarAnioStats()'>

${crearOpcionesAnios()}

</select>

</div>

<div class='filtro'>

<h3>Torneo</h3>

<select id='torneoStats'
onchange='cambiarTorneoStats()'>

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

${bloqueLideres('⚽', 'Goleadores', lideresAPI.goleadores)}
${bloqueLideres('🎯', 'Asistencias', lideresAPI.asistencias)}
${bloqueLideres('🔥', 'Contribuciones de gol', lideresAPI.contribuciones)}
${bloqueLideres('🟨', 'Tarjetas amarillas', lideresAPI.amarillas)}
${bloqueLideres('🟥', 'Tarjetas rojas', lideresAPI.rojas)}
${bloquePorterias(lideresAPI.porterias)}

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
// TARJETA DE LÍDER (JUGADOR)
// ===============================

function bloqueLideres(icono, titulo, lista){

if(!lista || !lista.length){
return crearTarjetaStat(icono, titulo, 'Próximamente');
}

return `

<div class='stats-card'>

<h3>${icono} ${titulo}</h3>

${lista.map((j, i) => `

<div class='leader-card'>

<div>
<strong>${i + 1}. ${j.nombre}</strong>
<p>${j.equipo || ''} · ${j.cantidad}</p>
</div>

</div>

`).join('')}

</div>

`;

}


// ===============================
// TARJETA DE PORTERÍAS A CERO (EQUIPO)
// ===============================

function bloquePorterias(lista){

if(!lista || !lista.length){
return crearTarjetaStat('🧤', 'Porterías a cero', 'Próximamente');
}

return `

<div class='stats-card'>

<h3>🧤 Porterías a cero (equipo)</h3>

${lista.map((t, i) => `

<div class='leader-card'>

${mostrarLogo(t.logo, 'small')}

<div>
<strong>${i + 1}. ${t.nombre}</strong>
<p>${t.cantidad}</p>
</div>

</div>

`).join('')}

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

seccionActual = seccion;

marcarMenuActivo(seccion);

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
// MENÚ ACTIVO
// ===============================

function marcarMenuActivo(seccion){

const botones = document.querySelectorAll(
'.bottom-menu button[data-seccion]'
);

botones.forEach(btn => {

if(btn.dataset.seccion === seccion){
btn.classList.add('active');
}else{
btn.classList.remove('active');
}

});

}


// ===============================
// INICIO APP
// ===============================

document.addEventListener('DOMContentLoaded', async () => {

console.log('MatchIQ MX iniciado');

await cargarEquiposAPI();

await cargarPartidosAPI();

await cargarInicio();

marcarMenuActivo('inicio');

});
