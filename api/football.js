// =======================================
// MATCHIQ MX
// FOOTBALL.JS VERCEL
// API FOOTBALL + CACHE
// =======================================


let cache = {
    teams: null,
    fixtures: null,
    standings: null,
    topscorers: null,
    players: {}
};



export default async function handler(req,res){


try{


const API_KEY = process.env.API_KEY;


if(!API_KEY){

return res.status(500).json({

error:"API KEY no encontrada"

});

}



const {type} = req.query;



const season = req.query.season || 2024;

const league = 262;



// ===============================
// FUNCIÓN API
// ===============================


async function consultarAPI(url){


const response = await fetch(url,{

headers:{

"x-apisports-key":API_KEY

}

});



const data = await response.json();



if(data.errors && Object.keys(data.errors).length){


return {

error:data.errors

};


}



return data;


}





// ===============================
// EQUIPOS
// ===============================


if(type==="teams"){


if(cache.teams){


return res.status(200).json({

response:cache.teams

});


}




const url =

`https://v3.football.api-sports.io/teams?league=${league}&season=${season}`;



const data = await consultarAPI(url);



if(data.error){


return res.status(429).json(data);


}



cache.teams=data.response;



return res.status(200).json(data);



}





// ===============================
// PARTIDOS
// ===============================


if(type==="fixtures"){



if(cache.fixtures){


return res.status(200).json({

response:cache.fixtures

});


}



const round=req.query.round;



let url;



if(round){


url=

`https://v3.football.api-sports.io/fixtures?league=${league}&season=${season}&round=${encodeURIComponent(round)}`;


}

else{


url=

`https://v3.football.api-sports.io/fixtures?league=${league}&season=${season}`;


}




const data = await consultarAPI(url);



if(data.error){


return res.status(429).json(data);


}



cache.fixtures=data.response;



return res.status(200).json(data);



}
  // ===============================
// TABLA DE POSICIONES
// ===============================


if(type==="standings"){



if(cache.standings){


return res.status(200).json({

response:cache.standings

});


}





const url =

`https://v3.football.api-sports.io/standings?league=${league}&season=${season}`;



const data = await consultarAPI(url);



if(data.error){


return res.status(429).json(data);


}





let tabla=[];



if(data.response && data.response.length){


tabla = 

data.response[0].league.standings[0];


}



cache.standings=tabla;



return res.status(200).json({

response:tabla

});



}







// ===============================
// JUGADORES POR EQUIPO
// ===============================


if(type==="players"){



const team=req.query.team;



if(!team){


return res.status(400).json({

error:"Falta team"

});


}




if(cache.players[team]){


return res.status(200).json({

response:cache.players[team]

});


}






const url =

`https://v3.football.api-sports.io/players?team=${team}&season=${season}`;



const data = await consultarAPI(url);



if(data.error){


return res.status(429).json(data);


}



cache.players[team]=data.response;



return res.status(200).json(data);



}







// ===============================
// GOLEADORES
// ===============================


if(type==="topscorers"){



if(cache.topscorers){


return res.status(200).json({

response:cache.topscorers

});


}




const url =

`https://v3.football.api-sports.io/players/topscorers?league=${league}&season=${season}`;



const data = await consultarAPI(url);



if(data.error){


return res.status(429).json(data);


}




cache.topscorers=data.response;



return res.status(200).json(data);



}







// ===============================
// ESTADÍSTICAS EQUIPO
// ===============================


if(type==="teamstats"){



const team=req.query.team;



if(!team){


return res.status(400).json({

error:"Falta team"

});


}





const url =

`https://v3.football.api-sports.io/teams/statistics?league=${league}&season=${season}&team=${team}`;




const data = await consultarAPI(url);



if(data.error){


return res.status(429).json(data);


}




return res.status(200).json(data);



}
 // ===============================
// CONSULTA NO ENCONTRADA
// ===============================


return res.status(400).json({

error:"Tipo de consulta no válido"

});





}

catch(error){


console.log(error);



return res.status(500).json({

error:error.message

});


}


} 
