import { fromEvent, interval } from "rxjs";
import { sample } from "rxjs/operators";

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/sample
 * Nombre: sample

 * Descripción:
 *  - Se utiliza para obtener una muestra del último valor emitido por un observable en función de otro observable que actúa como "disparador"
 *
 * Documentación oficial:
 * --------------------------
 *  - Emits the most recently emitted value from the source Observable whenever another Observable, the notifier, emits
 *  - sample<T>(notifier: ObservableInput<any>): MonoTypeOperatorFunction<T>
 */
// Crea un observable que emite un valor cada 500 milisegundos
const observable = interval(500);

// Crea un observable que emite un evento 'click'
const triggerObservable = fromEvent(document, 'click');

// Aplica el operador sample para obtener una muestra del último valor emitido por 'observable' cuando ocurre un evento 'click'
const sampledObservable = observable.pipe(sample(triggerObservable));

// Suscríbete al sampledObservable para recibir las muestras
sampledObservable.subscribe(value => console.log(value));