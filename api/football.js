// =======================================
// MATCHIQ MX
// API FOOTBALL VERCEL
// FOOTBALL.JS FIX
// =======================================


export default async function handler(req,res){


try{


const API_KEY = process.env.API_KEY;


if(!API_KEY){

return res.status(500).json({

error:"API KEY no encontrada"

});

}



const type = req.query.type;


const league = 262;

const season = 2024;


let url = "";



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
// JUGADORES POR EQUIPO
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
// GOLEADORES
// ===============================

else if(type==="topscorers"){


url =
`https://v3.football.api-sports.io/players/topscorers?league=${league}&season=${season}`;


}




else{


return res.status(400).json({

error:"Tipo inválido"

});


}






const response = await fetch(url,{


headers:{


"x-apisports-key":API_KEY,

"Accept":"application/json"


}


});





const data = await response.json();





console.log(data);





return res.status(200).json(data);



}



catch(error){



return res.status(500).json({

error:error.message

});


}


}
