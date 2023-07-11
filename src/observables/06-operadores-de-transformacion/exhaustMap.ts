import { fromEvent, interval } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/exhaustMap
 * Nombre: exhaustMap

 * Descripción:
 *  - Se utiliza para transformar los valores emitidos por un observable en otro observable, pero solo suscribe al observable interno si no hay otras suscripciones activas en ese momento. Esto significa que se ignorarán los nuevos valores emitidos mientras haya una suscripción activa
 *
 * Documentación oficial:
 * --------------------------
 *  - Projects each source value to an Observable which is merged in the output Observable only if the previous projected Observable has completed
 *  - exhaustMap<T, R, O extends ObservableInput<any>>(project: (value: T, index: number) => O, resultSelector?: (outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R): OperatorFunction<T, ObservedValueOf<O> | R>
 */
// Obtén el botón de inicio del temporizador
const startButton = document.createElement("button");
document.querySelector("body").append(startButton);

// Crea un observable desde el evento de clic en el botón
const click$ = fromEvent(startButton, 'click');

// Utiliza exhaustMap para iniciar un temporizador solo si no hay una suscripción activa
click$
  .pipe(
    exhaustMap(() =>
      interval(1000).pipe(
        take(5) // Limita el temporizador a 5 emisiones
      )
    )
  )
  .subscribe((value) => {
    console.log(value);
    // Realiza acciones con los valores emitidos por el temporizador
  });