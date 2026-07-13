export default async function handler(req, res) {

  const API_KEY = '3';
  const BASE = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;

  const type = req.query.type || 'fixtures';

  try {

    // Equipos Liga MX
    if(type === 'teams') {

      const r = await fetch(
        `${BASE}/search_all_teams.php?l=Mexican%20Primera%20League`
      );

      const d = await r.json();

      return res.status(200).json({
        teams: d.teams || []
      });

    }

    // Próximos partidos Liga MX
    if(type === 'fixtures') {

      const r = await fetch(
        `${BASE}/eventsnextleague.php?id=4350`
      );

      const d = await r.json();

      return res.status(200).json({
        events: d.events || []
      });

    }

    // Partidos recientes Liga MX
    if(type === 'past') {

      const r = await fetch(
        `${BASE}/eventspastleague.php?id=4350`
      );

      const d = await r.json();

      return res.status(200).json({
        events: d.events || []
      });

    }

    return res.status(400).json({
      error: 'Tipo no válido'
    });

  } catch(error) {

    return res.status(500).json({
      error: error.message
    });

  }

}
