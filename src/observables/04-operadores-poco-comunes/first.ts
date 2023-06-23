import { fromEvent } from "rxjs";
import { first, tap } from "rxjs/operators";

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/first
 * Nombre: first
 * Descripción:
 *  - Simplemente toma el primer valor y completa todo
 *  - Si pongo first() se emitiría el primer valor y luego la suscripción se completaría y ya el observable no emitiría más
 *  - Adicionalmente se le puede poner una condición para que se complete ÚNICAMENTE cuando se cumpla dicha condición:
 *    first(x => x >= 10)
 * 
 *  - SI HAY UNA CONDICIÓN SOLO SE EMITE EL PRIMER VALOR QUE CUMPLE LA CONDICIÓN Y LUEGO SE COMPLETA LA EMISIÓN
 *
 * Documentación oficial:
 * --------------------------
 *  - Emits only the first value (or the first value that meets some condition) emitted by the source Observable
 *  - first<T, D>(predicate?: (value: T, index: number, source: Observable<T>) => boolean, defaultValue?: D): OperatorFunction<T, T | D>
 */

// Con esto solo se emitiría el primer click
const click$ = fromEvent<MouseEvent>(document, "click").pipe(first());
click$.subscribe({
  next: (val) => console.log("valor", val),
  complete: () => "completado",
});

const click1$ = fromEvent<MouseEvent>(document, "click").pipe(
  tap(console.log),
  first((event) => event.clientY > 150)
);
click1$.subscribe({
  next: (val) => console.log("valor click1", val),
  complete: () => "completado click1",
});
