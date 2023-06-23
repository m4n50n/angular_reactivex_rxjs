import { fromEvent } from "rxjs";
import { map, takeWhile } from "rxjs/operators";

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/takeWhile
 * Nombre: takeWhile
 * Descripción:
 *  - Permite emitir valores mientras la condición se cumpla 
 *
 * Documentación oficial:
 * --------------------------
 *  - Emits values emitted by the source Observable so long as each value satisfies the given predicate, and then completes as soon as this predicate is not satisfied
 *  - takeWhile<T>(predicate: (value: T, index: number) => boolean, inclusive: boolean = false): MonoTypeOperatorFunction<T>
 */
const click$ = fromEvent<MouseEvent>(document, "click").pipe(
  map(({ x, y }) => ({ x, y })),
  // takeWhile(({ y }) => y <= 150) // Cuando la condición se cumple emite el complete PERO no el elemento que "rompe" esa condición
  takeWhile(({ y }) => y <= 150, true) // Enviando true al parámetro "inclusive" hacemos que se devuelva ese elemento
);

click$.subscribe({
  next: (val) => console.log("next", val),
  complete: () => console.log("completado"),
});
