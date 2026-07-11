// =======================================
// MATCHIQ MX
// SCRIPT.JS COMPLETO - THESPORTSDB
// =======================================

const API_URL = 'https://www.thesportsdb.com/api/v1/json/3';
const LEAGUE_ID = '4350';

let partidos = [];
let equiposAPI = [];
let jugadoresAPI = [];
let notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];

// ===============================
// API
// ===============================
async function llamarAPI(type, extra = '') {
  try {
    let url = '';

    if (type === 'teams') {
      url = `${API_URL}/lookup_all_teams.php?id=${LEAGUE_ID}`;
    }

    else if (type === 'fixtures') {
      url = `${API_URL}/eventsnextleague.php?id=${LEAGUE_ID}`;
    }

    else if (type === 'players') {
      url = `${API_URL}/lookup_all_players.php?id=${extra}`;
    }

    else {
      return [];
    }

    const response = await fetch(url);
    const data = await response.json();

    // EQUIPOS
    if (type === 'teams') {
      return (data.teams || []).map(t => ({
        id: t.idTeam,
        nombre: t.strTeam,
        logo: t.strBadge
      }));
    }

    // PARTIDOS
    if (type === 'fixtures') {
      return (data.events || []).map(e => ({
        id: e.idEvent,
        local: {
          id: e.idHomeTeam,
          nombre: e.strHomeTeam,
          logo: e.strHomeTeamBadge
        },
        visitante: {
          id: e.idAwayTeam,
          nombre: e.strAwayTeam,
          logo: e.strAwayTeamBadge
        },
        hora: new Date(`${e.dateEvent}T${e.strTime || '00:00:00'}`).toLocaleTimeString(
          'es-MX',
          { hour: '2-digit', minute: '2-digit' }
        ),
        estadio: e.strVenue || 'Por confirmar',
        resultado: e.intHomeScore != null
          ? `${e.intHomeScore}-${e.intAwayScore}`
          : 'Pendiente'
      }));
    }

    // JUGADORES
    if (type === 'players') {
      return (data.player || []).map(p => ({
        id: p.idPlayer,
        nombre: p.strPlayer,
        foto: p.strCutout || p.strThumb || 'images/default.png',
        posicion: p.strPosition || 'Jugador'
      }));
    }

    return [];

  } catch (error) {
    console.log(error);
    return [];
  }
}

// ===============================
// LOGOS
// ===============================
function mostrarLogo(url, tamaño = 'small') {
  let clase = 'logo-small';

  if (tamaño === 'medium') clase = 'logo-medium';
  if (tamaño === 'large') clase = 'logo-large';

  return `
    <img
      class='${clase}'
      src='${url || 'images/default.png'}'
      onerror="this.src='images/default.png'"
    >
  `;
}

// ===============================
// CARGAR DATOS
// ===============================
async function cargarEquiposAPI() {
  equiposAPI = await llamarAPI('teams');
}

async function cargarPartidosAPI() {
  partidos = await llamarAPI('fixtures');
}

// ===============================
// INICIO
// ===============================
async function cargarInicio() {
  const contenido = document.getElementById('contenido');

  contenido.innerHTML = `
    <h2>Inicio</h2>
    <div class='card'>Cargando partidos...</div>
  `;

  if (!partidos.length) {
    await cargarPartidosAPI();
  }

  if (!partidos.length) {
    contenido.innerHTML = `
      <h2>Inicio</h2>
      <div class='card'>No hay partidos disponibles.</div>
    `;
    return;
  }

  const p = partidos[0];

  contenido.innerHTML = `
    <h2>Inicio</h2>

    <div class='card'>
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

      <button onclick='mostrarAnalisis(${p.id})'>Ver análisis</button>
    </div>
  `;
}

// ===============================
// PARTIDOS
// ===============================
async function cargarPartidos() {
  const contenido = document.getElementById('contenido');

  contenido.innerHTML = `
    <h2>Partidos Liga MX</h2>
    <div id='listaPartidosLiga'>Cargando...</div>
  `;

  if (!partidos.length) {
    await cargarPartidosAPI();
  }

  mostrarListaPartidos();
}

function mostrarListaPartidos() {
  const lista = document.getElementById('listaPartidosLiga');

  if (!lista) return;

  if (!partidos.length) {
    lista.innerHTML = `
      <div class='card'>No hay partidos disponibles.</div>
    `;
    return;
  }

  lista.innerHTML = partidos.map(p => `
    <div class='card'>
      <div class='match-header'>
        <div>
          ${mostrarLogo(p.local.logo)}
          <strong>${p.local.nombre}</strong>
        </div>

        <h3>VS</h3>

        <div>
          ${mostrarLogo(p.visitante.logo)}
          <strong>${p.visitante.nombre}</strong>
        </div>
      </div>

      <p>🕒 ${p.hora}</p>
      <p>${p.resultado}</p>

      <button onclick='mostrarAnalisis(${p.id})'>Análisis</button>
      <button onclick='mostrarAlineaciones(${p.id})'>Jugadores</button>
    </div>
  `).join('');
}

// ===============================
// ANALISIS
// ===============================
function mostrarAnalisis(id) {
  const p = partidos.find(x => x.id == id);

  if (!p) return;

  document.getElementById('contenido').innerHTML = `
    <button onclick='cargarPartidos()'>← Regresar</button>

    <div class='card'>
      <h2>${p.local.nombre} vs ${p.visitante.nombre}</h2>

      <h3>Predicción MatchIQ</h3>
      <p>Forma reciente, ataque, defensa y rendimiento.</p>

      <h3>Probabilidades</h3>
      <p>Local: 40%</p>
      <p>Empate: 30%</p>
      <p>Visitante: 30%</p>

      <h3>Marcadores probables</h3>
      <p>2-1 / 1-1 / 1-0</p>
    </div>
  `;
}

// ===============================
// JUGADORES
// ===============================
async function mostrarAlineaciones(id) {
  const partido = partidos.find(p => p.id == id);

  if (!partido) return;

  const local = await llamarAPI('players', partido.local.id);
  const visitante = await llamarAPI('players', partido.visitante.id);

  jugadoresAPI = [...local, ...visitante];

  document.getElementById('contenido').innerHTML = `
    <button onclick='cargarPartidos()'>← Regresar</button>

    <div class='card'>
      <h2>${partido.local.nombre}</h2>
      <div class='stats-grid'>
        ${crearJugadores(local)}
      </div>
    </div>

    <div class='card'>
      <h2>${partido.visitante.nombre}</h2>
      <div class='stats-grid'>
        ${crearJugadores(visitante)}
      </div>
    </div>
  `;
}

function crearJugadores(jugadores) {
  if (!jugadores.length) {
    return '<p>Sin información.</p>';
  }

  return jugadores.slice(0, 20).map(j => `
    <div class='stats-player-card' onclick='mostrarJugador(${j.id})'>
      <img src='${j.foto}' onerror="this.src='images/default.png'">
      <div>
        <h3>${j.nombre}</h3>
        <p>${j.posicion}</p>
      </div>
    </div>
  `).join('');
}

function mostrarJugador(id) {
  const j = jugadoresAPI.find(x => x.id == id);

  if (!j) return;

  const popup = document.getElementById('player-popup');

  popup.innerHTML = `
    <div class='popup-background' onclick='cerrarJugador()'></div>

    <div class='player-modal'>
      <img class='player-photo' src='${j.foto}' onerror="this.src='images/default.png'">
      <h2>${j.nombre}</h2>
      <p>${j.posicion}</p>
      <button onclick='cerrarJugador()'>Cerrar</button>
    </div>
  `;

  popup.style.display = 'block';
}

function cerrarJugador() {
  const popup = document.getElementById('player-popup');
  popup.style.display = 'none';
  popup.innerHTML = '';
}

// ===============================
// STATS
// ===============================
async function cargarStats() {
  const contenido = document.getElementById('contenido');

  contenido.innerHTML = `
    <h2>Estadísticas</h2>
    <div class='card'>Próximamente.</div>
  `;
}

// ===============================
// PERFIL
// ===============================
async function cargarPerfil() {
  const contenido = document.getElementById('contenido');

  if (!equiposAPI.length) {
    await cargarEquiposAPI();
  }

  contenido.innerHTML = `
    <h2>Perfil</h2>

    <div class='card'>
      <h3>Equipos Liga MX</h3>

      ${equiposAPI.map(e => `
        <div class='team-follow'>
          <img src='${e.logo}' class='logo-small' onerror="this.src='images/default.png'">
          <strong>${e.nombre}</strong>
          <button onclick='cambiarNotificacion(${e.id})'>
            ${notificaciones.includes(e.id) ? 'Siguiendo' : 'Seguir'}
          </button>
        </div>
      `).join('')}
    </div>
  `;
}

function cambiarNotificacion(id) {
  if (notificaciones.includes(id)) {
    notificaciones = notificaciones.filter(x => x !== id);
  } else {
    notificaciones.push(id);
  }

  localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
  cargarPerfil();
}

// ===============================
// NAVEGACIÓN
// ===============================
function mostrarSeccion(seccion) {
  switch (seccion) {
    case 'inicio':
      cargarInicio();
      break;

    case 'partidos':
      cargarPartidos();
      break;

    case 'predicciones':
      cargarPartidos();
      break;

    case 'stats':
      cargarStats();
      break;

    case 'perfil':
      cargarPerfil();
      break;
  }
}

// ===============================
// INICIO APP
// ===============================
document.addEventListener('DOMContentLoaded', async () => {
  await cargarEquiposAPI();
  await cargarPartidosAPI();
  await cargarInicio();
});
