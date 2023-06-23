import { from, of } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/distinctUntilChanged
 * Nombre: distinctUntilChanged
 * Descripción:
 *  - Similar a distinct() con la diferencia de que emite todos los valores siempre que la emisión ANTERIOR no sea la misma
 *
 * Documentación oficial:
 * --------------------------
 *  - Returns a result Observable that emits all values pushed by the source observable if they are distinct in comparison to the last value the result observable emitted
 *  - distinctUntilChanged<T, K>(comparator?: (previous: K, current: K) => boolean, keySelector: (value: T) => K = identity as (value: T) => K): MonoTypeOperatorFunction<T>
 */
/** Ejercicio simple */
const numeros$ = of(1, 2, "2", 1, 2, 3, 4, 4, 5, 4, 5, 5, 6, 7, 8);
numeros$.pipe(distinctUntilChanged()).subscribe(console.log); // Aquí se ve simple porque utiliza el parámetro de equidad ===, por lo que puede saber si un número es igual a otro número

/** Ejercicio con objetos */
interface Personaje {
  nombre: string;
}

const personajes: Personaje[] = [
  { nombre: "Megaman" }, // El problema es que este objeto no es igual
  { nombre: "Megaman" }, // A este objeto aunque los dos sean visualmente iguales, por lo que el parámetro de equidad aquí no nos serviría
  { nombre: "Batman" },  
  { nombre: "Joker" },
  { nombre: "Megaman" },
  { nombre: "Batman" },
];

// En este caso deberemos darle más información al distinctUntilChanged para que sepa comparar estos objetos

from(personajes)
  // Con este predicado decimos al distinctUntilChanged qué tiene que comparar
  // La condición es que el predicado debe retornar un booleano, por lo que si es true lo que retorna, se considerarán iguales y por lo tanto el valor no se emitirá
  .pipe(distinctUntilChanged((anterior, actual) => anterior.nombre === actual.nombre)) 
  .subscribe(console.log);
