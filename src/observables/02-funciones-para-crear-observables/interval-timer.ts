import { interval, timer } from "rxjs";

/**
 * https://rxjs.dev/api/index/function/interval
 * Nombre: interval
 * Descripción:
 *  - Función que permite crear observables que se emiten en base al intervalo definido (si ponemos 2000, las emisiones se harían cada 2 segundos)
 *  - Es un observable asíncrono por naturaleza
 *  - Importante: Aunque cancelemos la suscripción, el intervalo seguirá corriendo
 *  - El primer valor que emite interval es 0
 *
 * Documentación oficial:
 * --------------------------
 *  - Creates an Observable that emits sequential numbers every specified interval of time, on a specified SchedulerLike
 *  - interval(period: number = 0, scheduler: SchedulerLike = asyncScheduler): Observable<number>
 */

const observer = {
  next: (value) => console.log("[next]: ", value),
  error: (error) => console.warn("[error]: ", error),
  complete: () => console.info("[complete] Secuencia terminada"),
};

const interval$ = interval(1000); // (*) Mientras no exista un suscripción este observable no emitirá valores
// El intervalo empezará en 0 por defecto

console.log("Inicio comprobar asincronía interval");
interval$.subscribe(observer); // Aquí nunca se emitirá el complete porque nunca se completa ya que no llamamos al unsubscribe
console.log("Fin comprobar asincronía interval");

/**
 * https://rxjs.dev/api/index/function/timer
 * Nombre: timer
 * Descripción:
 *  - Función similar al interval
 *  - Es un observable asíncrono por naturaleza
 *  - Si establecemos timer(2000), diremos que después de 2 segundos emitirá el primer valor y se completará el observable y ya no se emitirán más valores
 *
 * Documentación oficial:
 * --------------------------
 *  - Creates an Observable that starts emitting after an dueTime and emits ever increasing numbers after each period of time thereafter
 *  - El timer crea un observable que empieza a emitir valores después de una fecha específica, y luego de ese valor empieza a emitir los valores siguientes en un periodo de tiempo indicado
 *  - Crea un observable que comienza un intervalo después de un retraso específico, emitiendo números incrementales, comenzando en0-- en cada intervalo después de las palabras.
 *  - timer(dueTime: number | Date = 0, intervalOrScheduler?: number | SchedulerLike, scheduler: SchedulerLike = asyncScheduler): Observable<number>
 */
const timer$ = timer(2000);

console.log("Inicio comprobar asincronía timer");
timer$.subscribe(observer); // Aquí se emitirá el complete porque este observable lo emite al acabar!
console.log("Fin comprobar asincronía timer");

/** Configuraciones especiales del timer */
const timerEsp$ = timer(2000, 1000); // Aquí lo que hacemos en realidad es crear un interval pero que se inicia cuando pasan 2 segundos

const hoyen5 = new Date();
hoyen5.setSeconds(hoyen5.getSeconds() + 5);
const timerEsp1$ = timer(hoyen5); // De esta manera podemos programar el momento en que se emitirá el valor en base al timer
