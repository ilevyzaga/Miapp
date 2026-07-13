// =======================================
// MATCHIQ MX
// API SPORTDB CORREGIDA
// api/sportsdb.js
// =======================================


export default async function handler(req, res) {


const API_KEY = "3";

const BASE =
`https://www.thesportsdb.com/api/v1/json/${API_KEY}`;



const type = req.query.type || "fixtures";



try {



//
// ===============================
// EQUIPOS LIGA MX
// ===============================
//


if(type === "teams"){



const respuesta = await fetch(

`${BASE}/search_all_teams.php?l=Mexican%20Primera%20League`

);



const datos = await respuesta.json();



let equipos = datos.teams || [];




// Equipos base por si SportsDB no trae todos


const equiposBase = [


{
idTeam:"2287",
strTeam:"Club América",
strTeamBadge:"images/america.png"
},


{
idTeam:"2278",
strTeam:"Chivas",
strTeamBadge:"images/chivas.png"
},


{
idTeam:"2279",
strTeam:"Tigres UANL",
strTeamBadge:"images/tigres.png"
},


{
idTeam:"2282",
strTeam:"Monterrey",
strTeamBadge:"images/monterrey.png"
},


{
idTeam:"2295",
strTeam:"Cruz Azul",
strTeamBadge:"images/cruzazul.png"
},


{
idTeam:"2286",
strTeam:"Pumas UNAM",
strTeamBadge:"images/pumas.png"
},


{
idTeam:"2281",
strTeam:"Toluca",
strTeamBadge:"images/toluca.png"
},


{
idTeam:"2292",
strTeam:"Pachuca",
strTeamBadge:"images/pachuca.png"
},


{
idTeam:"2283",
strTeam:"Atlas",
strTeamBadge:"images/atlas.png"
},


{
idTeam:"2285",
strTeam:"Santos Laguna",
strTeamBadge:"images/santos.png"
},


{
idTeam:"2289",
strTeam:"León",
strTeamBadge:"images/leon.png"
},


{
idTeam:"2290",
strTeam:"Querétaro",
strTeamBadge:"images/queretaro.png"
},


{
idTeam:"2291",
strTeam:"Puebla",
strTeamBadge:"images/puebla.png"
},


{
idTeam:"2298",
strTeam:"FC Juárez",
strTeamBadge:"images/juarez.png"
},


{
idTeam:"14002",
strTeam:"Mazatlán",
strTeamBadge:"images/mazatlan.png"
},


{
idTeam:"2314",
strTeam:"Atlético San Luis",
strTeamBadge:"images/atleticosanluis.png"
}



];





// Combinar sin repetir


const todos = [

...equipos,

...equiposBase

];



const final = [];



todos.forEach(e=>{


if(!final.find(x=>x.strTeam === e.strTeam)){


final.push({

idTeam:e.idTeam,

strTeam:e.strTeam,

strTeamBadge:
e.strTeamBadge ||
"images/default.png"


});


}


});





return res.status(200).json({

teams: final

});



}






//
// ===============================
// PRÓXIMOS PARTIDOS
// ===============================
//


if(type === "fixtures"){



const respuesta = await fetch(

`${BASE}/eventsnextleague.php?id=4350`

);



const datos = await respuesta.json();



return res.status(200).json({

events: datos.events || []

});



}







//
// ===============================
// PARTIDOS PASADOS
// ===============================
//


if(type === "past"){



const respuesta = await fetch(

`${BASE}/eventspastleague.php?id=4350`

);



const datos = await respuesta.json();



return res.status(200).json({

events: datos.events || []

});



}







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
