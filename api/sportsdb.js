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

      const respuesta = await fetch(
        `${BASE}/search_all_teams.php?l=Mexican%20Primera%20League`
      );

      const datos = await respuesta.json();
      let equipos = datos.teams || [];

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

      for (const nombre of faltantes) {

        try {

          const r = await fetch(
            `${BASE}/searchteams.php?t=${encodeURIComponent(nombre)}`
          );

          const d = await r.json();

          if (d.teams && d.teams.length) {
            equipos.push(d.teams[0]);
          }

        } catch (e) {}

      }

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

      equipos = equipos.filter(e=>{

        const original=(e.strTeam||'').toLowerCase();

        if(original.includes('chivas usa')) return false;
        if(original.includes('mazatl')) return false;
        if(original.includes('atlante')) return false;

        const nombre=alias[original]||original;

        if(usados.has(nombre)) return false;

        usados.add(nombre);

        return true;

      });

      equipos=equipos.map(e=>({

        idTeam:e.idTeam,

        strTeam:e.strTeam,

        strTeamBadge:
          e.strTeamBadge ||
          e.strBadge ||
          e.strLogo ||
          'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'

      }));

      return res.status(200).json({

        teams:equipos

      });

    }

    // =======================================
    // TODA LA TEMPORADA
    // =======================================

    if(type === 'fixtures') {

      const season = req.query.season || '2026-2027';

      const respuesta = await fetch(
        `${BASE}/eventsseason.php?id=4350&s=${season}`
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

      const season = req.query.season || '2026-2027';

      const respuesta = await fetch(
        `${BASE}/eventsseason.php?id=4350&s=${season}`
      );

      const datos = await respuesta.json();

      return res.status(200).json({

        events: datos.events || []

      });

    }

    // =======================================
    // EQUIPO POR ID
    // =======================================

    if(type === 'team') {

      const id=req.query.id;

      if(!id){

        return res.status(400).json({
          error:'Falta el id'
        });

      }

      const respuesta=await fetch(
        `${BASE}/lookupteam.php?id=${id}`
      );

      const datos=await respuesta.json();

      return res.status(200).json({

        team:datos.teams||[]

      });

    }

    return res.status(400).json({

      error:'Tipo no válido'

    });

  }

  catch(error){

    return res.status(500).json({

      error:error.message

    });

  }

}
