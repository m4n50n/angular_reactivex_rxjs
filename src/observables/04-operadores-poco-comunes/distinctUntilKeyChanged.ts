import { from } from "rxjs";
import { distinctUntilKeyChanged } from "rxjs/operators";

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/distinctUntilKeyChanged
 * Nombre: distinctUntilKeyChanged
 * Descripción:
 *  - Es el mismo concepto que distinctUntilChanged pero pasándole directamente la key que queremos que compruebe y así no hay que pasar ningún predicado al método
 *
 * Documentación oficial:
 * --------------------------
 *  - Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item, using a property accessed by using the key provided to check if the two items are distinct
 *  - distinctUntilKeyChanged<T, K extends keyof T>(key: K, compare?: (x: T[K], y: T[K]) => boolean): MonoTypeOperatorFunction<T>
 */
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

// En este caso NO deberemos darle más información al distinctUntilKeyChanged para que sepa comparar estos objetos, sino que sólo le daremos la key que queremos que evalúe

from(personajes)  
  .pipe(distinctUntilKeyChanged("nombre")) 
  .subscribe(console.log);
