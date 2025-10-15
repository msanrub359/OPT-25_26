"use strict";
console.log('¡Hola desde Node.js!');
const nombre = 'Estudiante';
console.log(`Bienvenido, ${nombre}`);
const suma = (a, b) => a + b;
console.log(`2 + 3 = ${suma(2, 3)}`);
const aNombre= ['a', 'b', 'c'];
//trabajar con arrays
aNombre.forEach(caracter=>{
    console.log(caracter);
})