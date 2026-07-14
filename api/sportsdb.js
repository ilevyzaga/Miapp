// =======================================
// MATCHIQ MX
// API SPORTSDB FINAL
// api/sportsdb.js
// =======================================

export default async function handler(req, res) {

  const API_KEY = '3';
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

      // Buscar automáticamente los faltantes
      for(const nombre of faltantes) {

        try {

          const r = await fetch(
            `${BASE}/searchteams.php?t=${encodeURIComponent(nombre)}`
          );

          const d = await r.json();

          if(d.teams && d.teams.length) {
            equipos.push(d.teams[0]);
          }

        } catch(e) {

          console.log('No encontrado:', nombre);

        }

      }

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
