export default async function handler(req, res){

const API_KEY = "3";

const type = req.query.type || "events";

let url = "";


// Liga MX
const league = "4350";

if(type === "teams"){

url = `https://www.thesportsdb.com/api/v1/json/${API_KEY}/lookup_all_teams.php?id=${league}`;

}


else if(type === "fixtures"){

url = `https://www.thesportsdb.com/api/v1/json/${API_KEY}/eventsnextleague.php?id=${league}`;

}


else if(type === "past"){

url = `https://www.thesportsdb.com/api/v1/json/${API_KEY}/eventspastleague.php?id=${league}`;

}


else{

url = `https://www.thesportsdb.com/api/v1/json/${API_KEY}/eventsnextleague.php?id=${league}`;

}



try{


const respuesta = await fetch(url);

const datos = await respuesta.json();


res.status(200).json(datos);


}

catch(error){


res.status(500).json({

error:error.message

});


}


}
