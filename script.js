// =======================================
// MATCHIQ MX
// SCRIPT.JS SPORTSDB
// PARTE 1/4
// =======================================

const API_URL = 'https://miapp-peach-six.vercel.app/api/sportsdb';

let partidos = [];
let equiposAPI = [];
let jugadoresAPI = [];

let notificaciones =
JSON.parse(localStorage.getItem('notificaciones')) || [];

// ===============================
// API
// ===============================

async function llamarAPI(type){

  try{

    const respuesta = await fetch(`${API_URL}?type=${type}`);

    const data = await respuesta.json();

    if(type === 'teams'){
      return data.teams || [];
    }

    return data.events || [];

  }

  catch(error){

    console.log(error);

    return [];

  }

}

// ===============================
// EQUIPOS
// ===============================

async function cargarEquiposAPI(){

  let datos = await llamarAPI('teams');

  equiposAPI = datos.map(e=>({

    id:e.idTeam,

    nombre:e.strTeam,

    logo:e.strTeamBadge || 'images/default.png'

  }));

}

// ===============================
// PARTIDOS
// ===============================

async function cargarPartidosAPI(){

  let proximos = await llamarAPI('fixtures');

  let recientes = await llamarAPI('past');

  let todos = [...proximos, ...recientes];

  if(!todos.length){

    partidos = [];

    return [];

  }

  const mapa = new Map();

  todos.forEach(p=>mapa.set(p.idEvent,p));

  todos = Array.from(mapa.values());

  todos.sort((a,b)=>
    new Date(a.strTimestamp) - new Date(b.strTimestamp)
  );

  partidos = todos.map(p=>({

    id:p.idEvent,

    local:{
      id:p.idHomeTeam,
      nombre:p.strHomeTeam,
      logo:p.strHomeTeamBadge || 'images/default.png'
    },

    visitante:{
      id:p.idAwayTeam,
      nombre:p.strAwayTeam,
      logo:p.strAwayTeamBadge || 'images/default.png'
    },

    fecha:p.dateEvent,

    hora:p.strTime
      ? p.strTime.substring(0,5)
      : 'Por confirmar',

    estadio:p.strVenue || 'Por confirmar',

    resultado:
      p.intHomeScore !== null && p.intAwayScore !== null
      ? `${p.intHomeScore}-${p.intAwayScore}`
      : 'Pendiente'

  }));

  return partidos;

}

function mostrarLogo(url,t='small'){

  let c='logo-small';

  if(t==='medium') c='logo-medium';

  if(t==='large') c='logo-large';

  return `<img class="${c}" src="${url}" onerror="this.src='images/default.png'">`;

}
// =======================================
// MATCHIQ MX
// PARTE 2/4
// =======================================

async function cargarInicio(){

  const contenido = document.getElementById('contenido');

  contenido.innerHTML = '<h2>Inicio</h2><div class="card">Cargando...</div>';

  if(!partidos.length){
    await cargarPartidosAPI();
  }

  if(!partidos.length){

    contenido.innerHTML =
    '<h2>Inicio</h2><div class="card">No hay partidos disponibles.</div>';

    return;

  }

  let p = partidos[0];

  contenido.innerHTML = `

    <h2>Inicio</h2>

    <div class="card">

      <h3>Partido destacado</h3>

      <div class="match-header">

        <div>
          ${mostrarLogo(p.local.logo,'medium')}
          <strong>${p.local.nombre}</strong>
        </div>

        <h2>VS</h2>

        <div>
          ${mostrarLogo(p.visitante.logo,'medium')}
          <strong>${p.visitante.nombre}</strong>
        </div>

      </div>

      <p>🕒 ${p.hora}</p>

      <p>🏟 ${p.estadio}</p>

      <button onclick="mostrarAnalisis('${p.id}')">
        Ver análisis
      </button>

    </div>

  `;

}

async function cargarPartidos(){

  const contenido = document.getElementById('contenido');

  contenido.innerHTML = `

    <h2>Partidos Liga MX</h2>

    <div id="listaPartidosLiga">Cargando...</div>

  `;

  await cargarPartidosAPI();

  mostrarListaPartidos();

}

function mostrarListaPartidos(){

  const lista = document.getElementById('listaPartidosLiga');

  if(!lista) return;

  if(!partidos.length){

    lista.innerHTML =
    '<div class="card">No hay partidos disponibles.</div>';

    return;

  }

  lista.innerHTML = partidos.map(p=>`

    <div class="card">

      <div class="match-header">

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

      <p>🏟 ${p.estadio}</p>

      <p>Resultado: ${p.resultado}</p>

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
// PARTE 3/4
// =======================================

function mostrarAnalisis(id){

  let p = partidos.find(x=>x.id==id);

  if(!p) return;

  document.getElementById('contenido').innerHTML = `

    <button onclick="cargarPartidos()">← Regresar</button>

    <div class="card analysis-section">

      <h2>${p.local.nombre} VS ${p.visitante.nombre}</h2>

      <h3>Predicción MatchIQ</h3>

      <p>
        Análisis basado en resultados y rendimiento reciente.
      </p>

      <h3>Probabilidades</h3>

      <p>${p.local.nombre}: 40%</p>

      <p>Empate: 30%</p>

      <p>${p.visitante.nombre}: 30%</p>

      <h3>Marcadores probables</h3>

      <p>1-0 / 1-1 / 2-1</p>

    </div>

  `;

}

async function mostrarAlineaciones(id){

  let p = partidos.find(x=>x.id==id);

  if(!p) return;

  document.getElementById('contenido').innerHTML = `

    <button onclick="cargarPartidos()">← Regresar</button>

    <div class="card">

      <h2>${p.local.nombre} VS ${p.visitante.nombre}</h2>

      <h3>Alineaciones</h3>

      <p>
        Las alineaciones oficiales estarán disponibles próximamente.
      </p>

    </div>

  `;

}

async function cargarPredicciones(){

  document.getElementById('contenido').innerHTML = `

    <h2>Predicciones MatchIQ</h2>

    <div class="card">

      Selecciona un partido para ver la predicción.

    </div>

  `;

}
// =======================================
// MATCHIQ MX
// PARTE 4/4
// =======================================

async function cargarStats(){

  document.getElementById('contenido').innerHTML = `

    <h2>Estadísticas Liga MX</h2>

    <div class="card">

      Las estadísticas avanzadas estarán disponibles próximamente.

    </div>

  `;

}

async function cargarPerfil(){

  if(!equiposAPI.length){
    await cargarEquiposAPI();
  }

  document.getElementById('contenido').innerHTML = `

    <h2>Perfil</h2>

    <div class="card">

      <h3>Equipos Liga MX</h3>

      ${equiposAPI.map(e=>`

        <div class="team-follow">

          <img src="${e.logo}" class="logo-small"
               onerror="this.src='images/default.png'">

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

function cambiarNotificacion(id){

  id = String(id);

  if(notificaciones.includes(id)){

    notificaciones =
    notificaciones.filter(x=>x!==id);

  }

  else{

    notificaciones.push(id);

  }

  localStorage.setItem(
    'notificaciones',
    JSON.stringify(notificaciones)
  );

  cargarPerfil();

}

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

  }

}

document.addEventListener('DOMContentLoaded', async()=>{

  console.log('MatchIQ iniciado');

  await cargarEquiposAPI();

  await cargarInicio();

});
