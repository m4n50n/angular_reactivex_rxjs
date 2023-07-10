import { fromEvent } from "rxjs";
import { debounce, debounceTime, distinctUntilChanged } from "rxjs/operators";

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/debounceTime
 * Nombre: debounceTime
 * Descripción:
 *  - Trabaja en base a intervalos de tiempo
 *  - Ayuda a contar las milésimas de segundo que han pasado desde la última emisión
 *  - Si esa milésima de segundo sobrepasa el parámetro que tenemos en los paréntesis entonces emitirá dicho valor
 *
 * Documentación oficial:
 * --------------------------
 *  - Emits a notification from the source Observable only after a particular time span has passed without another source emission
 *  - debounceTime<T>(dueTime: number, scheduler: SchedulerLike = asyncScheduler): MonoTypeOperatorFunction<T>
 */
const click$ = fromEvent<MouseEvent>(document, "click");

click$.pipe(
    // Si empiezo a hacer clicks se emitirá un valor 3 segundos después de haber hecho el último click, antes no
    // Si tuviera una búsqueda onkeyup, se emitirá el valor si transcurren 3 segundos sin que se haga ningún keyup
    // Por lo tanto, después de los 3 segundos se hará solamente UNA emisión
    debounceTime(3000) 
).subscribe(console.log);

// Ejemplo 2
const input = document.createElement("input");
document.querySelector("body").append(input);

const input$ = fromEvent(input, "keyup");
input$.pipe(
    debounceTime(1000),
    distinctUntilChanged() // Con esto controlamos además que la emisión se haga siempre que el valor no sea el mismo que el valor de la emisión anterior
).subscribe(console.log);