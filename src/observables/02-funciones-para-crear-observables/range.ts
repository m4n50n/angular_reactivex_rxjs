import { asyncScheduler, range } from "rxjs";

/**
 * https://rxjs.dev/api/index/function/range
 * Nombre: range
 * Descripción:
 *  - Función que permite crear observables que emiten una secuencia de números en base a un rango específico
 *  - Son síncronos pero pueden convertirse en asíncronos usando async scheduler
 *  - El número inicial es 0 por defecto
 *
 * Documentación oficial:
 * --------------------------
 *  - Creates an Observable that emits a sequence of numbers within a specified range
 *  - range(start: number, count?: number, scheduler?: SchedulerLike): Observable<number>
 */

// ------------------------
// EJEMPLO NORMAL
const observable$ = range(1, 5); // (*) Mientras no exista un suscripción este observable no emitirá valores
// OJO! no significa que me muestre del 1 al 5, significa que el número inicial es 1 y se mostrarán las 4 posiciones siguientes

// Por ejemplo:
const src$ = range(-5, 10); // La salida de esto será "-5, -4, -3, -2, -1, 0, 1, 2, 3, 4"
// Es decir, recorre un rango de 10 elementos empezando desde el -5!!!

const observer = {
  next: (value) => console.log("[next]: ", value),
  error: (error) => console.warn("[error]: ", error),
  complete: () => console.info("[complete] Secuencia terminada"),
};

observable$.subscribe(console.log);
console.log("------------------------");
src$.subscribe(console.log);

// ------------------------
// EJEMPLO ASÍNCRONO
const srcasync$ = range(1, 5, asyncScheduler); // Si ejecutamos el código, veremos que será asíncrono ya que se ejecutan primero los console logs y luego el código

console.log("Inicio srcasync$");
srcasync$.subscribe(console.log);
console.log("Fin srcasync");
