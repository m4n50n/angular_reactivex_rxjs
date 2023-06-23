import { of } from "rxjs";
import { take, tap } from "rxjs/operators";

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/take
 * Nombre: take
 * Descripción:
 *  - Sirve para limitar la cantidad de emisiones que un observable puede tener
 *  - Si tengo take(2) se emitirá el primer valor, luego el segundo y justo después se completará la suscripción
 *
 * Documentación oficial:
 * --------------------------
 *  - Emits only the first count values emitted by the source Observable
 *  - take<T>(count: number): MonoTypeOperatorFunction<T>
 */
const numeros$ = of(1, 2, 3, 4, 5);
numeros$.pipe(
  tap(t => console.log(t)), // Con esto comprobamos que sólo emite 3 valores (correspondientes al take(3)) y que luego no sigue emitiendo los siguientes valores de la secuencia
  take(3)
)
.subscribe({
  next: (val) => console.log("next", val),
  complete: () => console.log("Completado"),
});
