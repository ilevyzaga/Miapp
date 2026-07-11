// api/sportsdb.js

export default async function handler(req, res) {
  try {
    const { type, team } = req.query;
    const LEAGUE_ID = '4350';

    let url = '';

    if (type === 'fixtures') {
      url = `https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=${LEAGUE_ID}`;
    } else if (type === 'teams') {
      url = `https://www.thesportsdb.com/api/v1/json/3/lookup_all_teams.php?id=${LEAGUE_ID}`;
    } else if (type === 'players') {
      url = `https://www.thesportsdb.com/api/v1/json/3/lookup_all_players.php?id=${team}`;
    } else if (type === 'standings') {
      return res.status(200).json({ response: [] });
    } else if (type === 'topscorers') {
      return res.status(200).json({ response: [] });
    } else {
      return res.status(400).json({ error: 'Tipo inválido' });
    }

    const response = await fetch(url);
    const data = await response.json();

    return res.status(200).json({
      response: data.events || data.teams || data.player || []
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
