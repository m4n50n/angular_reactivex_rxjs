import { interval } from "rxjs";
import { reduce, take, tap } from "rxjs/operators";

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/reduce
 * Nombre: reduce
 * Descripción:
 *  - Hace lo mismo que el método reduce de JavaScript
 *  - Lo que hace es aplicar una función acumuladora a las emisiones producidas por el observable
 *
 * Documentación oficial:
 * --------------------------
 *  - Applies an accumulator function over the source Observable, and returns the accumulated result when the source completes, given an optional seed value
 *  - reduce<V, A>(accumulator: (acc: V | A, value: V, index: number) => A, seed?: any): OperatorFunction<V, V | A>
 */

/*
Ejemplo:
reduce((acc, curr) => acc + curr, 0) 

acc -> valor acumulado
curr -> valor actual
Retornará el valor acumulado + el valor actual y cero indica cual es el valor inicial que tiene el acumulador

- Simulando que un input emite el valor 1, no habrá ninguna salida
- Luego emite el valor 3 y no tenemos ninguna salida
- Luego se emite el valor 5 pero no tenemos ninguna salida, etc...

HASTA QUE EL OBSERVABLE NO SE COMPLETA NO SE EMITE NINGÚN VALOR
*/

/** EJEMPLO REDUCE EN JAVASCRIPT */
const numbers = [1, 2, 3, 4, 5];
const totalReducer = (acumulador: number, valorActual: number) => {
  console.log("acumulador", acumulador);
  console.log("valorActual", valorActual);

  return acumulador + valorActual;
};

// const total = numbers.reduce(totalReducer, 0); // El valor inicial es 0
// console.log("total array", total); // El valor se emite cuando se procesa todo dentro del reduce

/** EJERCICIO RXJS */
interval(1000) // El primer valor que emite interval es 0
  .pipe(
    take(4), // Take COMPLETARÁ el observable después de la cantidad de veces que yo especifique dentro de el
    tap(console.log), // Debugeamos lo que fluye a través del observable en este instante
    reduce(totalReducer, 0) // No envio los paréntesis para no ejecutar la función en ese momento. El valor inicial será 0 (por defecto también)
  )
  .subscribe({
    next: (val) => console.log("next", val),
    complete: () => console.log("complete")
  });
