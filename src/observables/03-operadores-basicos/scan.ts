import { from } from "rxjs";
import { reduce, scan } from "rxjs/operators";

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/scan
 * Nombre: scan
 * Descripción:
 *  - Es exactamente igual al operador reduce pero con una diferencia, y es que cuando los valores son emitidos por el observable, inmediatamente van saliendo
 *  conforme van ingresando pero regresa su valor acumulado
 *
 * Documentación oficial:
 * --------------------------
 *  - Useful for encapsulating and managing state. Applies an accumulator (or "reducer function") to each value from the source after an initial state is established -- either via a seed value (second argument), or from the first value from the source
 *  - scan<V, A, S>(accumulator: (acc: V | A | S, value: V, index: number) => A, seed?: S): OperatorFunction<V, V | A>
 */

/*
Ejemplo:
scan((acc, curr) => acc + curr, 0) 

acc -> valor acumulado
curr -> valor actual
Retornará el valor acumulado + el valor actual y cero indica cual es el valor inicial que tiene el acumulador

- Simulando que un input emite el valor 1, inmediatamente la salida del scan será 1
- Luego emite el valor 3 y la salida inmediatamente sería 4
- Luego se emite el valor 5 la salida será 9, etc...

CUANDO EL OBSERVABLE SE COMPLETA, NO PASARÁ NADA PORQUE YA ABREMOS EMITIDO EL ÚLTIMO VALOR
*/

const numbers = [1, 2, 3, 4, 5];
const totalReducer = (acumulador: number, valorActual: number) =>
  acumulador + valorActual;

// Reduce: tenemos una única emisión con el valor final
from(numbers)
  .pipe(reduce(totalReducer, 0))
  .subscribe((val) => console.log("Reduce val:", val));

// Scan: emite cada valor
from(numbers)
  .pipe(scan(totalReducer, 0))
  .subscribe((val) => console.log("Scan val:", val));
