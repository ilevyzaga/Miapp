// =======================================
// MATCHIQ MX
// API SPORTSDB
// api/sportsdb.js
// VERSION CORREGIDA
// =======================================


export default async function handler(req, res) {


const API_KEY = "3";

const BASE =
`https://www.thesportsdb.com/api/v1/json/${API_KEY}`;


const type = req.query.type || "fixtures";



try {



// =======================================
// EQUIPOS LIGA MX
// =======================================


if(type === "teams"){



const respuesta = await fetch(

`${BASE}/search_all_teams.php?l=Mexican%20Primera%20League`

);



const datos = await respuesta.json();



let equipos = datos.teams || [];





equipos = equipos.map(e=>({


idTeam:e.idTeam,


strTeam:e.strTeam,


strTeamBadge:

e.strTeamBadge ||

"images/default.png"



}));






return res.status(200).json({


teams:equipos


});



}







// =======================================
// PRÓXIMOS PARTIDOS
// =======================================


if(type === "fixtures"){



const respuesta = await fetch(

`${BASE}/eventsnextleague.php?id=4350`

);



const datos = await respuesta.json();



return res.status(200).json({


events:

datos.events || []

});



}









// =======================================
// PARTIDOS PASADOS
// =======================================


if(type === "past"){



const respuesta = await fetch(

`${BASE}/eventspastleague.php?id=4350`

);



const datos = await respuesta.json();



return res.status(200).json({


events:

datos.events || []

});



}









// =======================================
// EQUIPO ESPECÍFICO
// =======================================


if(type === "team"){



const id = req.query.id;



const respuesta = await fetch(

`${BASE}/lookupteam.php?id=${id}`

);



const datos = await respuesta.json();



return res.status(200).json({


team:

datos.teams || []

});



}









// =======================================
// ERROR
// =======================================


return res.status(400).json({


error:"Tipo no válido"


});







}

catch(error){



return res.status(500).json({


error:error.message


});



}



}
