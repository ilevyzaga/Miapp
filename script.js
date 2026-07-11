const API_URL = 'https://www.thesportsdb.com/api/v1/json/3';
const LEAGUE_ID = '4350';

async function cargarInicio() {
  const contenido = document.getElementById('contenido');
  contenido.innerHTML = '<h2>Inicio</h2><div class="card">Cargando...</div>';

  try {
    const r = await fetch(`${API_URL}/eventsnextleague.php?id=${LEAGUE_ID}`);
    const data = await r.json();
    const eventos = data.events || [];

    if (!eventos.length) {
      contenido.innerHTML = '<h2>Inicio</h2><div class="card">No hay partidos.</div>';
      return;
    }

    const p = eventos[0];

    contenido.innerHTML = `
      <h2>Inicio</h2>
      <div class="card">
        <h3>${p.strHomeTeam} vs ${p.strAwayTeam}</h3>
        <p>🕒 ${p.strTime || ''}</p>
        <p>🏟 ${p.strVenue || 'Por confirmar'}</p>
      </div>
    `;
  } catch (e) {
    contenido.innerHTML = '<h2>Inicio</h2><div class="card">Error cargando datos.</div>';
  }
}

document.addEventListener('DOMContentLoaded', cargarInicio);
