import { from, of, Subject } from "rxjs";
import { distinct } from "rxjs/operators";

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/distinct
 * Nombre: distinct
 * Descripción:
 *  - Únicamente deja pasar valores que no han sido previamente emitidos por el observable
 *
 * Documentación oficial:
 * --------------------------
 *  - Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous items
 *  - distinct<T, K>(keySelector?: (value: T) => K, flushes?: ObservableInput<any>): MonoTypeOperatorFunction<T>
 */
/** Ejercicio simple */
const numeros$ = of(1, 1, 2, 3, 4, 4, 5, 5, 5, 6, 7, 8);
numeros$.pipe(distinct()).subscribe(console.log); // Aquí se ve simple porque utiliza el parámetro de equidad ===, por lo que puede saber si un número es igual a otro número

/** Ejercicio con objetos */
interface Personaje {
  nombre: string;
}

const personajes: Personaje[] = [
  { nombre: "Megaman" }, // El problema es que este objeto no es igual
  { nombre: "Batman" },
  { nombre: "Megaman" }, // A este objeto aunque los dos sean visualmente iguales, por lo que el parámetro de equidad aquí no nos serviría
  { nombre: "Joker" },
  { nombre: "Megaman" },
  { nombre: "Batman" },
];

// En este caso deberemos darle más información al distinct para que sepa comparar estos objetos

from(personajes)
  .pipe(distinct((personaje) => personaje.nombre)) // Con este predicado decimos al distinct qué tiene que comparar
  .subscribe(console.log);
