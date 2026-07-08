function mostrarAnalisis(boton, equipo){

let anterior = boton.parentElement.querySelector(".analisis");

if(anterior){
    anterior.remove();
    return;
}


let tarjeta = document.createElement("div");

tarjeta.className = "analisis";


if(equipo === "america"){

tarjeta.innerHTML = `
<h2>🦅 América vs Toluca</h2>

<p><b>📊 Forma reciente</b></p>
<p>América: 🟢 G 🟢 G 🟡 E 🟢 G 🔴 P</p>
<p>Toluca: 🟢 G 🟡 E 🟢 G 🔴 P 🟢 G</p>

<p><b>⚽ Ataque</b></p>
<p>América: 1.8 goles por partido</p>

<p><b>🛡️ Defensa</b></p>
<p>América: 0.9 goles recibidos</p>

<p><b>🤖 Predicción MatchIQ</b></p>
<p>América gana o empate</p>

<p>📈 Confianza: 80%</p>
`;
}



if(equipo === "tigres"){

tarjeta.innerHTML = `
<h2>🐯 Tigres vs Chivas</h2>

<p><b>📊 Forma reciente</b></p>
<p>Tigres: 🟢 G 🟢 G 🟡 E 🟢 G 🟡 E</p>
<p>Chivas: 🟡 E 🔴 P 🟢 G 🟡 E 🔴 P</p>

<p><b>⚽ Ataque</b></p>
<p>Tigres: 1.6 goles por partido</p>

<p><b>🛡️ Defensa</b></p>
<p>Tigres tiene mayor equilibrio defensivo.</p>

<p><b>🤖 Predicción MatchIQ</b></p>
<p>Tigres gana o empate</p>

<p>📈 Confianza: 75%</p>
`;
}



if(equipo === "cruzazul"){

tarjeta.innerHTML = `
<h2>🔵 Cruz Azul vs Monterrey</h2>

<p><b>📊 Forma reciente</b></p>
<p>Cruz Azul: 🟢 G 🟡 E 🟢 G 🔴 P 🟢 G</p>
<p>Monterrey: 🟢 G 🟢 G 🟡 E 🟡 E 🔴 P</p>

<p><b>⚽ Ataque</b></p>
<p>Partido con ataque equilibrado.</p>

<p><b>🛡️ Defensa</b></p>
<p>Ambos equipos pueden cerrar espacios.</p>

<p><b>🤖 Predicción MatchIQ</b></p>
<p>Partido cerrado</p>

<p>📈 Confianza: 65%</p>
`;
}


boton.parentElement.appendChild(tarjeta);

}





function mostrarSeccion(seccion){

let contenido = document.getElementById("contenido");


if(seccion === "inicio"){

contenido.innerHTML = `
<h2>Liga MX - Jornada 1</h2>

<div class="card">
<h2>⚽ Partidos de hoy</h2>
<p>Revisa los encuentros y predicciones inteligentes.</p>
</div>
`;

}



if(seccion === "estadisticas"){

contenido.innerHTML = `
<h2>📊 Estadísticas</h2>

<div class="card">
<p>Próximamente:</p>
<p>• Goles por partido</p>
<p>• Rendimiento ofensivo</p>
<p>• Defensa</p>
</div>
`;

}



if(seccion === "predicciones"){

contenido.innerHTML = `
<h2>🤖 Predicciones</h2>

<div class="card">
<p>Modelo MatchIQ analizando partidos.</p>
<p>Predicciones inteligentes próximamente.</p>
</div>
`;

}



if(seccion === "perfil"){

contenido.innerHTML = `
<h2>⚙️ Perfil</h2>

<div class="card">
<p>Usuario MatchIQ MX</p>
<p>Configuración próximamente.</p>
</div>
`;

}


}
