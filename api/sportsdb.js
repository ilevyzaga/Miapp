export default async function handler(req, res) {
  try {
    const { type, team } = req.query;
    const LEAGUE_ID = '4350'; // Liga MX

    let url = '';

    // ===============================
    // EQUIPOS
    // ===============================
    if (type === 'teams') {
      url = `https://www.thesportsdb.com/api/v1/json/3/lookup_all_teams.php?id=${LEAGUE_ID}`;
    }

    // ===============================
    // PARTIDOS
    // ===============================
    else if (type === 'fixtures') {
      url = `https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=${LEAGUE_ID}`;
    }

    // ===============================
    // JUGADORES
    // ===============================
    else if (type === 'players') {
      url = `https://www.thesportsdb.com/api/v1/json/3/lookup_all_players.php?id=${team}`;
    }

    // ===============================
    // TABLA Y GOLEADORES
    // ===============================
    else if (type === 'standings' || type === 'topscorers') {
      return res.status(200).json({ response: [] });
    }

    else {
      return res.status(400).json({ error: 'Tipo inválido' });
    }

    const response = await fetch(url);
    const data = await response.json();

    let result = [];

    // ===============================
    // CONVERTIR EQUIPOS
    // ===============================
    if (type === 'teams') {
      result = (data.teams || []).map(t => ({
        team: {
          id: t.idTeam,
          name: t.strTeam,
          logo: t.strBadge
        }
      }));
    }

    // ===============================
    // CONVERTIR PARTIDOS
    // ===============================
    if (type === 'fixtures') {
      result = (data.events || []).map(e => ({
        fixture: {
          id: e.idEvent,
          date: `${e.dateEvent}T${e.strTime || '00:00:00'}`,
          venue: {
            name: e.strVenue
          }
        },
        league: {
          round: `Regular Season - ${e.intRound || 1}`
        },
        teams: {
          home: {
            id: e.idHomeTeam,
            name: e.strHomeTeam,
            logo: e.strHomeTeamBadge
          },
          away: {
            id: e.idAwayTeam,
            name: e.strAwayTeam,
            logo: e.strAwayTeamBadge
          }
        },
        goals: {
          home: e.intHomeScore,
          away: e.intAwayScore
        }
      }));
    }

    // ===============================
    // CONVERTIR JUGADORES
    // ===============================
    if (type === 'players') {
      result = (data.player || []).map(p => ({
        player: {
          id: p.idPlayer,
          name: p.strPlayer,
          photo: p.strCutout || p.strThumb || '',
          position: p.strPosition || 'Jugador'
        },
        statistics: [
          {
            team: {
              name: p.strTeam || ''
            }
          }
        ]
      }));
    }

    return res.status(200).json({ response: result });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
