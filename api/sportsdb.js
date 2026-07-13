export default async function handler(req, res) {
  const API_KEY = '3';
  const BASE = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;
  const LEAGUE = '4350';

  const type = req.query.type || 'fixtures';

  try {

    // Próximos partidos
    if(type === 'fixtures'){

      const r = await fetch(`${BASE}/eventsnextleague.php?id=${LEAGUE}`);
      const d = await r.json();

      return res.status(200).json({
        events: d.events || []
      });

    }

    // Partidos recientes
    if(type === 'past'){

      const r = await fetch(`${BASE}/eventspastleague.php?id=${LEAGUE}`);
      const d = await r.json();

      return res.status(200).json({
        events: d.events || []
      });

    }

    // Equipos
    if(type === 'teams'){

      const r = await fetch(`${BASE}/lookup_all_teams.php?id=${LEAGUE}`);
      const d = await r.json();

      return res.status(200).json({
        teams: d.teams || []
      });

    }

    return res.status(400).json({
      error:'Tipo no válido'
    });

  } catch(error){

    return res.status(500).json({
      error:error.message
    });

  }
}
