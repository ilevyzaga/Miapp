// =======================================
// MATCHIQ MX
// API FOOTBALL VERCEL
// FOOTBALL.JS
// =======================================

export default async function handler(req,res){

try{


const API_KEY = process.env.API_KEY;


if(!API_KEY){

return res.status(500).json({
error:"API KEY no encontrada"
});

}


const {type}=req.query;


// Liga MX
const league = 262;


// temporada dinámica
const season = req.query.season || 2025;


let url="";



// ===============================
// EQUIPOS
// ===============================

if(type==="teams"){

url =
`https://v3.football.api-sports.io/teams?league=${league}&season=${season}`;

}



// ===============================
// PARTIDOS
// ===============================

else if(type==="fixtures"){

url =
`https://v3.football.api-sports.io/fixtures?league=${league}&season=${season}`;

}



// ===============================
// TABLA
// ===============================

else if(type==="standings"){

url =
`https://v3.football.api-sports.io/standings?league=${league}&season=${season}`;

}



// ===============================
// JUGADORES EQUIPO
// ===============================

else if(type==="players"){

const team=req.query.team;


if(!team){

return res.status(400).json({
error:"Falta team"
});

}


url =
`https://v3.football.api-sports.io/players?team=${team}&season=${season}`;

}



// ===============================
// JUGADOR INDIVIDUAL
// ===============================

else if(type==="player"){

const id=req.query.id;


url =
`https://v3.football.api-sports.io/players?id=${id}&season=${season}`;

}



// ===============================
// GOLEADORES
// ===============================

else if(type==="topscorers"){

url =
`https://v3.football.api-sports.io/players/topscorers?league=${league}&season=${season}`;

}



// ===============================
// ERROR
// ===============================

else{

return res.status(400).json({
error:"Consulta no válida"
});

}




const response = await fetch(url,{

headers:{
"x-apisports-key":API_KEY
}

});



const data = await response.json();



// mostrar errores reales
if(data.errors && Object.keys(data.errors).length){

return res.status(500).json({

error:data.errors

});

}



return res.status(200).json(data);



}


catch(error){


return res.status(500).json({

error:error.message

});


}


}
