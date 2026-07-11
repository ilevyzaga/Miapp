// =======================================
// MATCHIQ MX
// API FOOTBALL VERCEL
// =======================================

export default async function handler(req,res){

try{

const API_KEY = process.env.API_KEY;

if(!API_KEY){

return res.status(500).json({
error:"API KEY no encontrada"
});

}


const type=req.query.type;

const season=req.query.season || 2024;

const league=262;


let url="";



// EQUIPOS

if(type==="teams"){

url=`https://v3.football.api-sports.io/teams?league=${league}&season=${season}`;

}



// PARTIDOS

if(type==="fixtures"){

url=`https://v3.football.api-sports.io/fixtures?league=${league}&season=${season}`;

}



// TABLA

if(type==="standings"){

url=`https://v3.football.api-sports.io/standings?league=${league}&season=${season}`;

}



// ALINEACIONES REALES

if(type==="lineups"){

const fixture=req.query.fixture;

url=
`https://v3.football.api-sports.io/fixtures/lineups?fixture=${fixture}`;

}



// GOLEADORES

if(type==="topscorers"){

url=
`https://v3.football.api-sports.io/players/topscorers?league=${league}&season=${season}`;

}



// ESTADISTICAS JUGADORES

if(type==="playerstats"){

url=
`https://v3.football.api-sports.io/players/topassists?league=${league}&season=${season}`;

}



// PORTERIAS A CERO

if(type==="cleansheets"){

url=
`https://v3.football.api-sports.io/players/topclean?league=${league}&season=${season}`;

}




if(!url){

return res.status(400).json({
error:"Consulta no válida"
});

}



const response=await fetch(

url,

{

headers:{
"x-apisports-key":API_KEY
}

}

);



const data=await response.json();



// DEBUG

console.log(data);



return res.status(200).json({

success:true,

response:data.response || [],

errors:data.errors || null

});


}



catch(error){

return res.status(500).json({

error:error.message

});

}


}
