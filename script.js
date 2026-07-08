// ==========================================
// CONFIRMAR ASISTENCIA
// ==========================================

const formulario = document.getElementById("formulario");


formulario.addEventListener("submit", function(e){

    e.preventDefault();


    let nombre = document.getElementById("nombre").value;

    let telefono = document.getElementById("telefono").value;

    let asistencia = document.getElementById("asistencia").value;

    let personas = document.getElementById("personas").value;

    let mensaje = document.getElementById("mensaje").value;



    if(nombre.trim()=="" || asistencia==""){

        alert("Completa tu nombre y asistencia");

        return;

    }



    let datos = new FormData();


    datos.append("nombre", nombre);

    datos.append("telefono", telefono);

    datos.append("asistencia", asistencia);

    datos.append("personas", personas);

    datos.append("mensaje", mensaje);



    let boton = document.querySelector(".confirmar");


    boton.innerHTML="⏳ Enviando...";

    boton.disabled=true;



    fetch("confirmar.php",{

        method:"POST",

        body:datos

    })


    .then(respuesta=>respuesta.text())


    .then(resultado=>{


        console.log(resultado);



        if(resultado.trim()=="OK"){



            document.getElementById("respuesta").innerHTML=`

            🎉 <b>¡Gracias ${nombre}!</b><br>

            Tu asistencia fue confirmada ❤️

            `;



            lanzarConfeti();



            formulario.reset();



        }else{


            document.getElementById("respuesta").innerHTML=

            "❌ Error: "+resultado;


        }



    })


    .catch(error=>{


        console.log(error);


        alert("Error de conexión con PHP");


    })


    .finally(()=>{


        boton.innerHTML="❤️ Confirmar asistencia";

        boton.disabled=false;


    });


});



// ==========================================
// CONFETI
// ==========================================

function lanzarConfeti(){


    if(typeof confetti === "function"){


        confetti({

            particleCount:200,

            spread:120,

            origin:{
                y:0.6
            }

        });


    }else{


        console.log("Confeti no cargado");


    }


}
// ==========================================
// CONTADORES DEL EVENTO
// ==========================================

const inicioFiesta = new Date("2026-07-25T20:30:00").getTime();

const cumpleaños = new Date("2026-07-27T20:30:00").getTime();

const limiteConfirmacion = new Date("2026-07-25T23:59:59").getTime();



function formatoTiempo(tiempo){

    const dias = Math.floor(
        tiempo / (1000 * 60 * 60 * 24)
    );


    const horas = Math.floor(
        (tiempo % (1000 * 60 * 60 * 24))
        /
        (1000 * 60 * 60)
    );


    const minutos = Math.floor(
        (tiempo % (1000 * 60 * 60))
        /
        (1000 * 60)
    );


    const segundos = Math.floor(
        (tiempo % (1000 * 60))
        /
        1000
    );


    document.getElementById("dias").innerHTML = dias;
    document.getElementById("horas").innerHTML = horas;
    document.getElementById("minutos").innerHTML = minutos;
    document.getElementById("segundos").innerHTML = segundos;

}



function actualizarContador(){


    const ahora = new Date().getTime();



    // Antes del 25 de julio

    if(ahora < inicioFiesta){


        let diferencia = inicioFiesta - ahora;


        document.querySelector(".contador-titulo").innerHTML =
        "⏳ Falta para comenzar la celebración";


        formatoTiempo(diferencia);


    }



    // Del 25 al 27 de julio

    else if(
        ahora >= inicioFiesta &&
        ahora < cumpleaños
    ){


        let diferencia = cumpleaños - ahora;


        document.querySelector(".contador-titulo").innerHTML =
        "🎉 Falta para mi cumpleaños";


        formatoTiempo(diferencia);


    }



    // Después del cumpleaños

    else{


        document.querySelector(".contador-titulo").innerHTML =
        "🎂 ¡La celebración terminó!";


        formatoTiempo(0);


    }



    // Control de confirmaciones

    if(ahora > limiteConfirmacion){


        document.getElementById("formulario").innerHTML = `

        <h2 style="color:#d4af37">

        🔒 Confirmaciones cerradas

        </h2>

        <p>

        El plazo para confirmar asistencia finalizó.

        </p>

        `;


    }


}



setInterval(actualizarContador,1000);

actualizarContador();
const formulario = document.getElementById("formulario");
const respuesta = document.getElementById("respuesta");


formulario.addEventListener("submit", function(e){

    e.preventDefault();


    let nombre = document.getElementById("nombre").value;
    let asistencia = document.getElementById("asistencia").value;


    if(asistencia === "Sí"){

        respuesta.innerHTML =
        `
        <h3>🎉 Gracias ${nombre}</h3>
        <p>Tu asistencia fue confirmada.</p>
        `;


    }else{

        respuesta.innerHTML =
        `
        <h3>😢 Gracias por avisar ${nombre}</h3>
        <p>Esperamos verte en otra ocasión.</p>
        `;

    }


    formulario.reset();


});
