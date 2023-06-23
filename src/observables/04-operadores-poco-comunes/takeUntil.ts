import { fromEvent, interval } from "rxjs";
import { takeUntil } from "rxjs/operators";

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/takeUntil
 * Nombre: takeUntil
 * Descripción:
 *  - Es un operador que recibe como argumento otro Observable
 *  - Se traduce a "emite valores hasta que el segundo Observable (el que se pasa como parámetro) emita su primer valor"
 *
 * Documentación oficial:
 * --------------------------
 *  - Emits the values emitted by the source Observable until a notifier Observable emits a value
 *  - takeUntil<T>(notifier: ObservableInput<any>): MonoTypeOperatorFunction<T>
 */
// Creamos un botón para que emita un valor y podamos colocarle un valor
const boton = document.createElement("button");
boton.innerHTML = "Detener timer";
document.querySelector("body").append(boton);

const counter$ = interval(1000);
const clickBtn$ = fromEvent<MouseEvent>(boton, "click");

counter$.pipe(
  takeUntil(clickBtn$)
)
.subscribe({
  next: val => console.log("next", val),
  complete: () => console.log("Completado!!!") // El observable counter$ dejaría de emitir valores y se completaría en cuando se haga click en el botón y por lo tanto se emita su primer valor desdes el fromEvent
});



