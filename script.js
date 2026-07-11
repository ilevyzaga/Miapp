const API_URL = 'https://www.thesportsdb.com/api/v1/json/3';
const LEAGUE_ID = '4350';

let partidos = [];
let equiposAPI = [];
let jugadoresAPI = [];
let notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];

async function obtenerJSON(url) {
  const r = await fetch(url);
  return await r.json();
}

async function cargarEquiposAPI() {
  try {
    const data = await obtenerJSON(`${API_URL}/lookup_all_teams.php?id=${LEAGUE_ID}`);
    equiposAPI = (data.teams || []).map(t => ({
      id: t.idTeam,
      nombre: t.strTeam,
      logo: t.strBadge
    }));
  } catch {
    equiposAPI = [];
  }
}

async function cargarPartidosAPI() {
  try {
    const data = await obtenerJSON(`${API_URL}/eventsnextleague.php?id=${LEAGUE_ID}`);
    partidos = (data.events || []).map(e => ({
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
      hora: new Date(`${e.dateEvent}T${e.strTime || '00:00:00'}`).toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      estadio: e.strVenue || 'Por confirmar',
      resultado: e.intHomeScore != null ? `${e.intHomeScore}-${e.intAwayScore}` : 'Pendiente'
    }));
  } catch {
    partidos = [];
  }
}

function logo(url, clase = 'logo-small') {
  return `<img class="${clase}" src="${url || 'images/default.png'}" onerror="this.src='images/default.png'">`;
}

async function cargarInicio() {
  const contenido = document.getElementById('contenido');

  if (!partidos.length) {
    await cargarPartidosAPI();
  }

  if (!partidos.length) {
    contenido.innerHTML = `
      <h2>Inicio</h2>
      <div class="card">No hay partidos disponibles.</div>
    `;
    return;
  }

  const p = partidos[0];

  contenido.innerHTML = `
    <h2>Inicio</h2>
    <div class="card">
      <h3>Partido destacado</h3>

      <div class="match-header">
        <div>
          ${logo(p.local.logo, 'logo-medium')}
          <strong>${p.local.nombre}</strong>
        </div>

        <h2>VS</h2>

        <div>
          ${logo(p.visitante.logo, 'logo-medium')}
          <strong>${p.visitante.nombre}</strong>
        </div>
      </div>

      <p>🕒 ${p.hora}</p>
      <p>🏟 ${p.estadio}</p>

      <button onclick="mostrarAnalisis('${p.id}')">Ver análisis</button>
    </div>
  `;
}

async function cargarPartidos() {
  const contenido = document.getElementById('contenido');

  if (!partidos.length) {
    await cargarPartidosAPI();
  }

  contenido.innerHTML = `
    <h2>Partidos Liga MX</h2>
    <div id="listaPartidosLiga"></div>
  `;

  mostrarListaPartidos();
}

function mostrarListaPartidos() {
  const lista = document.getElementById('listaPartidosLiga');

  if (!partidos.length) {
    lista.innerHTML = `<div class="card">No hay partidos disponibles.</div>`;
    return;
  }

  lista.innerHTML = partidos.map(p => `
    <div class="card">
      <div class="match-header">
        <div>
          ${logo(p.local.logo)}
          <strong>${p.local.nombre}</strong>
        </div>

        <h3>VS</h3>

        <div>
          ${logo(p.visitante.logo)}
          <strong>${p.visitante.nombre}</strong>
        </div>
      </div>

      <p>🕒 ${p.hora}</p>
      <p>${p.resultado}</p>

      <button onclick="mostrarAnalisis('${p.id}')">Análisis</button>
      <button onclick="mostrarAlineaciones('${p.id}')">Jugadores</button>
    </div>
  `).join('');
}

function mostrarAnalisis(id) {
  const p = partidos.find(x => x.id == id);
  if (!p) return;

  document.getElementById('contenido').innerHTML = `
    <button onclick="cargarPartidos()">← Regresar</button>

    <div class="card">
      <h2>${p.local.nombre} vs ${p.visitante.nombre}</h2>

      <h3>Predicción MatchIQ</h3>
      <p>Forma reciente, ataque, defensa y rendimiento.</p>

      <h3>Probabilidades</h3>
      <p>Local: 40%</p>
      <p>Empate: 30%</p>
      <p>Visitante: 30%</p>
    </div>
  `;
}

async function mostrarAlineaciones(id) {
  const p = partidos.find(x => x.id == id);
  if (!p) return;

  const dataLocal = await obtenerJSON(`${API_URL}/lookup_all_players.php?id=${p.local.id}`);
  const dataVisita = await obtenerJSON(`${API_URL}/lookup_all_players.php?id=${p.visitante.id}`);

  const local = (dataLocal.player || []).slice(0, 11);
  const visita = (dataVisita.player || []).slice(0, 11);

  jugadoresAPI = [...local, ...visita];

  document.getElementById('contenido').innerHTML = `
    <button onclick="cargarPartidos()">← Regresar</button>

    <div class="card">
      <h2>${p.local.nombre}</h2>
      <div class="stats-grid">
        ${local.map(j => jugadorCard(j)).join('')}
      </div>
    </div>

    <div class="card">
      <h2>${p.visitante.nombre}</h2>
      <div class="stats-grid">
        ${visita.map(j => jugadorCard(j)).join('')}
      </div>
    </div>
  `;
}

function jugadorCard(j) {
  return `
    <div class="stats-player-card" onclick="mostrarJugador('${j.idPlayer}')">
      <img src="${j.strCutout || j.strThumb || 'images/default.png'}" onerror="this.src='images/default.png'">
      <div>
        <h3>${j.strPlayer}</h3>
        <p>${j.strPosition || 'Jugador'}</p>
      </div>
    </div>
  `;
}

function mostrarJugador(id) {
  const j = jugadoresAPI.find(x => x.idPlayer == id);
  if (!j) return;

  const popup = document.getElementById('player-popup');

  popup.innerHTML = `
    <div class="popup-background" onclick="cerrarJugador()"></div>

    <div class="player-modal">
      <img class="player-photo" src="${j.strCutout || j.strThumb || 'images/default.png'}" onerror="this.src='images/default.png'">
      <h2>${j.strPlayer}</h2>
      <p>${j.strPosition || 'Jugador'}</p>
      <button onclick="cerrarJugador()">Cerrar</button>
    </div>
  `;

  popup.style.display = 'block';
}

function cerrarJugador() {
  const popup = document.getElementById('player-popup');
  popup.style.display = 'none';
  popup.innerHTML = '';
}

async function cargarStats() {
  document.getElementById('contenido').innerHTML = `
    <h2>Estadísticas</h2>
    <div class="card">Próximamente.</div>
  `;
}

async function cargarPerfil() {
  if (!equiposAPI.length) {
    await cargarEquiposAPI();
  }

  document.getElementById('contenido').innerHTML = `
    <h2>Perfil</h2>

    <div class="card">
      <h3>Equipos Liga MX</h3>

      ${equiposAPI.map(e => `
        <div class="team-follow">
          <img src="${e.logo}" class="logo-small" onerror="this.src='images/default.png'">
          <strong>${e.nombre}</strong>
          <button onclick="cambiarNotificacion('${e.id}')">
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

document.addEventListener('DOMContentLoaded', async () => {
  await cargarEquiposAPI();
  await cargarPartidosAPI();
  await cargarInicio();
});
