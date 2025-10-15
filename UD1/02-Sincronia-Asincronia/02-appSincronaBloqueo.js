"use strict"

const funcionDeLargaDuracion = ()=>{
    const inicio=Date.now();
    while (Date.now()-inicio < 5000){
        //bloqueo durante 5 segundos
    }
    return 'Hola';
}

//main principal

console.log('Iniciando...');
//función de bloqueo
const resultado=funcionDeLargaDuracion();
console.log(resultado);
console.log('...Finalizado');