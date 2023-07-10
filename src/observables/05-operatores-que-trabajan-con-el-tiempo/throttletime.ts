import { fromEvent } from "rxjs";
import { throttleTime, distinctUntilChanged } from "rxjs/operators";

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/throttleTime
 * Nombre: throttleTime

 * Descripción:
 *  - Permite limitar la frecuencia de emisión de valores de un observable y asegurar que solo se emita el último valor dentro de un intervalo de tiempo determinado
 *  - Al emitirse el primer valor, empieza a contar los milisegundos definidos, y tras terminar, volverá a emitir el siguiente
 *  - Si se emiten valores durante ese "conteo", los valores no serán emitidos
 *
 * Documentación oficial:
 * --------------------------
 *  - Emits a value from the source Observable, then ignores subsequent source values for duration milliseconds, then repeats this process
 *  - throttleTime<T>(duration: number, scheduler: SchedulerLike = asyncScheduler, config?: ThrottleConfig): MonoTypeOperatorFunction<T>
 */
const click$ = fromEvent<MouseEvent>(document, "click");

click$.pipe(
    // Si hago un click se emitirá y empezará el conteo de 3 segundos
    // Durante el conteo no se emitirá ningún valor y el siguiente valor se emitirá tras el conteo
    throttleTime(3000) 
).subscribe(console.log);
