// =======================================
// MATCHIQ MX
// API FOOTBALL
// FOOTBALL.JS NUEVO
// =======================================


export default async function handler(req, res) {


try{


const { type } = req.query;



const API_KEY = process.env.API_KEY;



if(!API_KEY){

return res.status(500).json({

error:"API KEY no encontrada"

});

}




let url="";




// ===============================
// EQUIPOS LIGA MX
// ===============================


if(type==="teams"){


url =
"https://v3.football.api-sports.io/teams?league=262&season=2024";


}







// ===============================
// PARTIDOS LIGA MX
// ===============================


if(type==="fixtures"){


url =
"https://v3.football.api-sports.io/fixtures?league=262&season=2024";


}







// ===============================
// TABLA POSICIONES
// ===============================


if(type==="standings"){


url =
"https://v3.football.api-sports.io/standings?league=262&season=2024";


}








// ===============================
// JUGADORES
// ===============================


if(type==="players"){


const team=req.query.team;



url =
`https://v3.football.api-sports.io/players?team=${team}&season=2024`;



}







if(!url){


return res.status(400).json({

error:"Tipo de consulta no válido"

});


}







const response = await fetch(url,{


headers:{


"x-apisports-key":API_KEY


}


});







const data = await response.json();






return res.status(200).json(data);





}

catch(error){



return res.status(500).json({


error:error.message


});



}



}
