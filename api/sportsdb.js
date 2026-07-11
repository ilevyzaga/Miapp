export default async function handler(req, res) {

  const { type } = req.query;

  const API_KEY = "3";
  const BASE = "https://www.thesportsdb.com/api/v1/json";

  try {

    let url = "";

    if(type === "fixtures"){
      url = `${BASE}/${API_KEY}/eventsnextleague.php?id=4350`;
    }

    else if(type === "teams"){
      url = `${BASE}/${API_KEY}/lookup_all_teams.php?id=4350`;
    }

    else if(type === "standings"){
      url = `${BASE}/${API_KEY}/lookuptable.php?l=4350`;
    }

    else {
      return res.status(400).json({
        error:"Tipo no válido"
      });
    }


    const response = await fetch(url);

    const data = await response.json();


    res.status(200).json(data);


  } catch(error){

    res.status(500).json({
      error:error.message
    });

  }

}
