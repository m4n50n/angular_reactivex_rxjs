import { fromEvent, interval } from "rxjs";
import { skip, takeUntil } from "rxjs/operators";

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/skip
 * Nombre: skip
 * Descripción:
 *  - Sirve para saltar / omitir X cantidad de emisiones INICIALES
 *  - Si tenemos skip(3) el observable emitirá sólo a partir del cuarto valor (incluido)
 *
 * Documentación oficial:
 * --------------------------
 *  - Returns an Observable that skips the first count items emitted by the source Observable
 *  - skip<T>(count: number): MonoTypeOperatorFunction<T>
 */
// Creamos un botón para que emita un valor y podamos colocarle un valor
const boton = document.createElement("button");
boton.innerHTML = "Detener timer";
document.querySelector("body").append(boton);

const counter$ = interval(1000);
const clickBtn$ = fromEvent<MouseEvent>(boton, "click").pipe(
  skip(2) // Esto saltaría el primer y segundo click y por lo tanto emitiría a partir del segundo click que es donde se completaría el takeUntil del observable counter$
)

counter$.pipe(
  takeUntil(clickBtn$)
)
.subscribe({
  next: val => console.log("next", val),
  complete: () => console.log("Completado!!!") // El observable counter$ dejaría de emitir valores y se completaría en cuando se haga click en el botón y por lo tanto se emita su primer valor desdes el fromEvent
});



