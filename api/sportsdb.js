// =======================================
// MATCHIQ MX
// API SPORTSDb CORREGIDA
// api/sportsdb.js
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



const equiposLigaMX = [

"América",
"Atlas",
"Atlético de San Luis",
"Cruz Azul",
"CD Guadalajara",
"Juárez",
"León",
"Monterrey",
"Necaxa",
"Pachuca",
"Puebla",
"Pumas UNAM",
"Querétaro",
"Santos Laguna",
"Tigres UANL",
"Toluca",
"Mazatlán",
"FC Juárez"

];




const respuesta = await fetch(

`${BASE}/search_all_teams.php?l=Mexican%20Primera%20League`

);



const datos = await respuesta.json();



let equiposAPI = datos.teams || [];





let equiposFinal = [];





equiposLigaMX.forEach(nombre=>{



let encontrado = equiposAPI.find(e=>


e.strTeam
.toLowerCase()
.includes(
nombre.toLowerCase()
)

||
nombre
.toLowerCase()
.includes(
e.strTeam.toLowerCase()
)



);






if(encontrado){


equiposFinal.push({


idTeam:
encontrado.idTeam,


strTeam:
nombre,


strTeamBadge:
encontrado.strTeamBadge || 
"images/default.png"



});



}



});






return res.status(200).json({

teams:equiposFinal


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
// PARTIDOS ANTERIORES
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
