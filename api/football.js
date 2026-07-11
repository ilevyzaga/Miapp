export default async function handler(req, res) {


const { type } = req.query;



let endpoint = "";



if(type === "teams"){

endpoint = "/teams?league=262&season=2024";

}


if(type === "standings"){

endpoint = "/standings?league=262&season=2024";

}



if(type === "players"){

endpoint = "/players?league=262&season=2024";

}




if(!endpoint){

return res.status(400).json({

error:"No API type provided"

});

}





const response = await fetch(

"https://v3.football.api-sports.io" + endpoint,

{

headers:{

"x-apisports-key":process.env.API_KEY

}

}

);



const data = await response.json();



res.status(200).json(data);


}
