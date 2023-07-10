import { interval } from "rxjs";
import { auditTime } from "rxjs/operators";

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/auditTime
 * Nombre: auditTime

 * Descripción:
 *  - Se utiliza para obtener una muestra del último valor emitido por un observable después de un intervalo de tiempo específico
 *
 * Documentación oficial:
 * --------------------------
 *  - Ignores source values for duration milliseconds, then emits the most recent value from the source Observable, then repeats this process
 *  - auditTime<T>(duration: number, scheduler: SchedulerLike = asyncScheduler): MonoTypeOperatorFunction<T>
 */
// Crea un observable que emite un valor cada 500 milisegundos
const observable = interval(500);

// Aplica el operador auditTime para obtener una muestra cada 2 segundos
const auditedObservable = observable.pipe(auditTime(2000));

// Suscríbete al auditedObservable para recibir las muestras
auditedObservable.subscribe(value => console.log(value));