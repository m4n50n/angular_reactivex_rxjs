import { interval } from "rxjs";
import { sampleTime } from "rxjs/operators";

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/sampleTime
 * Nombre: sampleTime

 * Descripción:
 *  - Se utiliza para obtener una muestra periódica de los valores emitidos por un observable a intervalos regulares de tiempo. Básicamente, te permite capturar el último valor emitido dentro de un intervalo de tiempo predefinido
 *
 * Documentación oficial:
 * --------------------------
 *  - Emits the most recently emitted value from the source Observable within periodic time intervals
 *  - sampleTime<T>(period: number, scheduler: SchedulerLike = asyncScheduler): MonoTypeOperatorFunction<T>
 */
// Crea un observable que emite un valor cada 500 milisegundos
const observable = interval(500);

// Aplica sampleTime para obtener una muestra cada 2 segundos
const sampledObservable = observable.pipe(sampleTime(2000));

// Suscríbete al sampledObservable para recibir las muestras
sampledObservable.subscribe(value => console.log(value));
