// =======================================
// MATCHIQ MX
// API SPORTSDB FINAL
// api/sportsdb.js
// =======================================

// =======================================
// HELPERS DE TEMPORADA
// =======================================

// Liga MX no tiene "temporada" en TheSportsDB dividida en
// Apertura/Clausura como campos separados: usa un string tipo
// "2026-2027" que agrupa ambos torneos. Por eso calculamos
// el string de temporada a partir del torneo + año que eligió
// el usuario, y luego separamos Apertura de Clausura por fecha.

function calcularSeason(torneo, anio) {

  if(torneo === 'Clausura') {
    return `${anio - 1}-${anio}`;
  }

  // Apertura (default)
  return `${anio}-${anio + 1}`;

}


// Apertura: julio-diciembre / Clausura: enero-junio
function torneoDeFecha(fechaEvento) {

  if(!fechaEvento) return null;

  const mes = Number(fechaEvento.split('-')[1]);

  if(mes >= 7 && mes <= 12) return 'Apertura';

  return 'Clausura';

}


// Fecha de hoy en zona horaria de México (YYYY-MM-DD)
function fechaHoyMX() {

  return new Date().toLocaleDateString('en-CA', {
    timeZone: 'America/Mexico_City'
  });

}


export default async function handler(req, res) {

  const API_KEY = '123';
  const BASE = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;
  const type = req.query.type || 'fixtures';

  try {

    // =======================================
    // EQUIPOS LIGA MX
    // =======================================

    if(type === 'teams') {

      // Equipos que devuelve la liga
      const respuesta = await fetch(
        `${BASE}/search_all_teams.php?l=Mexican%20Primera%20League`
      );

      const datos = await respuesta.json();
      let equipos = datos.teams || [];

      // Equipos que normalmente faltan
      const faltantes = [
        'Club América',
        'Chivas',
        'Tigres UANL',
        'Pumas UNAM',
        'Toluca',
        'Pachuca',
        'Santos Laguna',
        'Querétaro',
        'Puebla',
        'Club Tijuana'
      ];

      // Buscar los faltantes EN PARALELO (antes era una por una,
      // 10 llamadas seguidas podían tardar tanto que Vercel
      // cortaba la función por tiempo y todo el endpoint fallaba,
      // incluyendo type=teams que ni siquiera se había tocado).
      const resultadosFaltantes = await Promise.allSettled(
        faltantes.map(nombre =>
          fetch(`${BASE}/searchteams.php?t=${encodeURIComponent(nombre)}`)
            .then(r => r.json())
        )
      );

      resultadosFaltantes.forEach((resultado, i) => {

        if(
          resultado.status === 'fulfilled' &&
          resultado.value.teams &&
          resultado.value.teams.length
        ) {
          equipos.push(resultado.value.teams[0]);
        } else {
          console.log('No encontrado:', faltantes[i]);
        }

      });

      // Alias para eliminar duplicados
      const alias = {

        'club américa':'américa',
        'américa':'américa',

        'chivas':'cd guadalajara',
        'cd guadalajara':'cd guadalajara',

        'fc juárez':'juárez',
        'juárez':'juárez',

        'club tijuana':'club tijuana',
        'tijuana':'club tijuana',

        'atlético san luis':'atlético de san luis',
        'atlético de san luis':'atlético de san luis'

      };

      const usados = new Set();

      equipos = equipos.filter(e => {

        const original = (e.strTeam || '').toLowerCase();

        // Eliminar equipos que no queremos
        if(original.includes('chivas usa')) return false;
        if(original.includes('mazatl')) return false;

        const nombre = alias[original] || original;

        if(usados.has(nombre)) return false;

        usados.add(nombre);

        return true;

      });

      // Normalizar respuesta
      equipos = equipos.map(e => ({

        idTeam: e.idTeam,

        strTeam: e.strTeam,

        strTeamBadge:
          e.strTeamBadge ||
          e.strBadge ||
          e.strLogo ||
          'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'

      }));

      return res.status(200).json({
        teams: equipos
      });

    }

    // =======================================
    // PRÓXIMOS PARTIDOS
    // =======================================

    if(type === 'fixtures') {

      const respuesta = await fetch(
        `${BASE}/eventsnextleague.php?id=4350`
      );

      const datos = await respuesta.json();

      return res.status(200).json({
        events: datos.events || []
      });

    }

    // =======================================
    // PARTIDOS PASADOS
    // =======================================

    if(type === 'past') {

      const respuesta = await fetch(
        `${BASE}/eventspastleague.php?id=4350`
      );

      const datos = await respuesta.json();

      return res.status(200).json({
        events: datos.events || []
      });

    }

    // =======================================
    // TEMPORADA COMPLETA (TODAS LAS JORNADAS)
    // =======================================

    if(type === 'season') {

      const torneo = req.query.torneo || 'Apertura';
      const anio = Number(req.query.anio) || new Date().getFullYear();

      const temporada = calcularSeason(torneo, anio);

      const respuesta = await fetch(
        `${BASE}/eventsseason.php?id=4350&s=${temporada}`
      );

      const datos = await respuesta.json();
      let eventos = datos.events || [];

      // TheSportsDB agrupa Apertura + Clausura bajo la misma
      // temporada, así que nos quedamos solo con los partidos
      // que caen dentro del rango de fechas del torneo pedido.
      // Si un partido todavía no tiene fecha confirmada (jornada
      // futura recién calendarizada) no lo descartamos, porque
      // eso es justo lo que queremos mostrar como "Por confirmar".
      eventos = eventos.filter(e =>
        !e.dateEvent || torneoDeFecha(e.dateEvent) === torneo
      );

      // Normalizamos el número de jornada para que la Jornada 1
      // siempre sea la primera del torneo elegido (por si la API
      // trae los números de ronda corridos 1-34 en vez de 1-17).
      const rondas = eventos
        .map(e => Number(e.intRound))
        .filter(r => !isNaN(r));

      const rondaMinima = rondas.length ? Math.min(...rondas) : 1;

      eventos = eventos.map(e => ({

        ...e,

        intRound:
          isNaN(Number(e.intRound))
            ? e.intRound
            : (Number(e.intRound) - rondaMinima + 1)

      }));

      // Orden cronológico, útil para "próximo partido"
      eventos.sort((a, b) =>
        (a.dateEvent || '').localeCompare(b.dateEvent || '')
      );

      return res.status(200).json({
        events: eventos,
        season: temporada,
        torneo,
        anio
      });

    }

    // =======================================
    // PARTIDOS EN VIVO / DE HOY
    // =======================================

    if(type === 'live') {

      // El plan gratuito de TheSportsDB no incluye livescore
      // real (eso es exclusivo de la API v2 premium), así que
      // aproximamos "en vivo" mostrando los partidos programados
      // para el día de hoy en México y calculando el estado por
      // hora de inicio en el front.

      const hoy = fechaHoyMX();
      const torneoHoy = torneoDeFecha(hoy);
      const anioHoy = Number(hoy.split('-')[0]);

      const temporada = calcularSeason(torneoHoy, anioHoy);

      const respuesta = await fetch(
        `${BASE}/eventsseason.php?id=4350&s=${temporada}`
      );

      const datos = await respuesta.json();
      const eventos = (datos.events || []).filter(e =>
        e.dateEvent === hoy
      );

      return res.status(200).json({
        events: eventos,
        fecha: hoy
      });

    }

    // =======================================
    // ALINEACIÓN DE UN PARTIDO
    // =======================================

    if(type === 'lineup') {

      const id = req.query.id;

      if(!id) {

        return res.status(400).json({
          error: 'Falta el id del partido'
        });

      }

      const respuesta = await fetch(
        `${BASE}/lookuplineup.php?id=${id}`
      );

      const datos = await respuesta.json();

      return res.status(200).json({
        lineup: datos.lineup || []
      });

    }

    // =======================================
    // BUSCAR EQUIPO POR ID
    // =======================================

    if(type === 'team') {

      const id = req.query.id;

      if(!id) {

        return res.status(400).json({
          error:'Falta el id del equipo'
        });

      }

      const respuesta = await fetch(
        `${BASE}/lookupteam.php?id=${id}`
      );

      const datos = await respuesta.json();

      return res.status(200).json({
        team: datos.teams || []
      });

    }

    // =======================================
    // ERROR
    // =======================================

    return res.status(400).json({
      error:'Tipo no válido'
    });

  } catch(error) {

    console.error(error);

    return res.status(500).json({
      error:error.message
    });

  }

} 
