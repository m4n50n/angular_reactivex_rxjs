import { asyncScheduler } from "rxjs";

/**
 * https://rxjs.dev/api/index/const/asyncScheduler
 * Nombre: asyncScheduler
 * Descripción:
 *  - asyncScheduler no crea un observable, crea una SUSCRIPCIÓN (es decir, devuelve una suscripción), que es el producto de un subscribe (es decir, el punto subscribe de un observable) 
 *
 * Documentación oficial:
 * --------------------------
 *  - Async Scheduler
 *  - const asyncScheduler: AsyncScheduler;
 */

// Realmente con el asyncScheduler vamos a hacer estas dos instrucciones, pero teniendo más control sobre lo que está sucediendo
setTimeout(() => {}, 3000);
setInterval(() => {}, 3000);

// ------------------------------
// -- Configurar setTimeout
const saludar = () => console.log("Hola Mundo");

asyncScheduler.schedule(saludar, 2000); // El primer argumento es la función que queremos ejecutar y el segundo argumento el delay
// No ponemos los paréntesis en la función porque si lo hiciéramos la ejecutaría en ese instante
// Esto hará que después de 2 segundos se ejecute la funcion

// En el siguiente ejemplo tenemos una función similar pero que recibe argumentos
const saludar2 = nombre => console.log("Hola " + nombre);
asyncScheduler.schedule(saludar2, 2000, "Fernando"); // Utilizamos el tercer argumento de la función schedule para enviar el parámetro a la función. Si hubiera que enviar más de un argumento enviaríamos un objeto con toda la información dentro del mismo

// ------------------------------
// -- Configurar setInterval (algo que se ejecuta periódicamente en lapsos de tiempo)
const scheduleSubscription = asyncScheduler.schedule(function(state) { // En este caso la función no puede ser una función flecha, sino una función normal
    console.log("state: ", state);    
    this.schedule(state + 1, 1000); // Para que todo esto funcione como un intervalo, tenemos que cambiar el valor del estado en esta función y hacer de nuevo la llamada. Entre paréntesis pongo el nuevo estado y además podemos modificar el flujo al tener la posibilidad
    // de indicar que lo haga después de segundo
}, 3000, 0); // El 0 será el estado inicial (o sea, el state que se envia)

setTimeout(() => {
 scheduleSubscription.unsubscribe(); // De esta forma cancelamos la suscripción y se termina el intervalo automáticamente. Lo hacemos directamente puesto que asyncSchedule devuelve una suscripción y por eso podemos guardarla en scheduleSubscription
}, 6000);

// Igualmente podríamos hacer otro schedule para cancelar la suscripción
asyncScheduler.schedule(() => scheduleSubscription.unsubscribe(), 6000);
