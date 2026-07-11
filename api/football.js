// =======================================
// MATCHIQ MX
// API FOOTBALL VERCEL
// FOOTBALL.JS COMPLETO
// PARTE 1/2
// =======================================


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



let url="";





// =======================================
// EQUIPOS
// =======================================


if(type==="teams"){


url =
`https://v3.football.api-sports.io/teams?league=${league}&season=${season}`;


}







// =======================================
// PARTIDOS
// =======================================


if(type==="fixtures"){


const round=req.query.round;



if(round){


url =
`https://v3.football.api-sports.io/fixtures?league=${league}&season=${season}&round=${encodeURIComponent(round)}`;


}

else{


url =
`https://v3.football.api-sports.io/fixtures?league=${league}&season=${season}`;


}



}







// =======================================
// TABLA POSICIONES
// =======================================


if(type==="standings"){



url =
`https://v3.football.api-sports.io/standings?league=${league}&season=${season}`;



}








// =======================================
// JUGADORES
// =======================================


if(type==="players"){



const team=req.query.team;



url =
`https://v3.football.api-sports.io/players?team=${team}&season=${season}`;



}








// =======================================
// GOLEADORES
// =======================================


if(type==="topscorers"){



url =
`https://v3.football.api-sports.io/players/topscorers?league=${league}&season=${season}`;



}








// =======================================
// ESTADISTICAS EQUIPO
// =======================================


if(type==="teamstats"){



const team=req.query.team;



url =
`https://v3.football.api-sports.io/teams/statistics?league=${league}&season=${season}&team=${team}`;



}








if(!url){


return res.status(400).json({

error:"Consulta no válida"

});


}







const response = await fetch(

url,

{


headers:{


"x-apisports-key":API_KEY


}



}

);






const data = await response.json();






return res.status(200).json(data);



}



catch(error){



return res.status(500).json({

error:error.message

});


}



}
// =======================================
// MATCHIQ MX
// API FOOTBALL VERCEL
// FOOTBALL.JS COMPLETO
// PARTE 2/2
// =======================================


// Esta parte mantiene compatibilidad
// con futuras consultas de MatchIQ MX



// =======================================
// FORMATO DE RESPUESTA API
// =======================================


function respuestaAPI(res,data){


return res.status(200).json({

success:true,

data:data

});


}





// =======================================
// DATOS DE TORNEOS
// =======================================


const torneos = {


clausura:{

nombre:"Clausura 2024",

roundPrefix:"Regular Season"

},


apertura:{

nombre:"Apertura 2024",

roundPrefix:"Regular Season"

}


};






// =======================================
// NOTA:
//
// API-FOOTBALL MANEJA AMBOS TORNEOS
// CON EL MISMO LEAGUE ID.
// EL FILTRO REAL SE HACE POR:
// - TEMPORADA
// - ROUND
// - FECHAS DE FIXTURE
//
// EL FRONTEND DE MATCHIQ MX
// USA ESTOS DATOS PARA SEPARARLOS.
//
// =======================================
