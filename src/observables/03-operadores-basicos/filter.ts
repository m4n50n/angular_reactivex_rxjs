import { range, of, from, fromEvent } from "rxjs";
import { filter, map } from "rxjs/operators";

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/filter
 * Nombre: filter
 * Descripción:
 *  - El operador filter sirve para filtrar las emisiones de los valores que emite el observable
 *
 * Documentación oficial:
 * --------------------------
 *  - Filter items emitted by the source Observable by only emitting those that satisfy a specified predicate
 *  - filter<T>(predicate: (value: T, index: number) => boolean, thisArg?: any): MonoTypeOperatorFunction<T>
 */

/*
Por ejemplo, si el filter tiene algo así:
filter(value => value % 2 === 1);

- Al pasar un 0 no emitirá nada, por lo que los suscriptores no recibirán nada
- Sin embargo, al emitir 1 uno sí pasará el filtro y los suscriptores recibirán el 1
- El 2 tampoco pasaría el filtro y por lo tanto no se emite, el 3 sí, etc...
*/

/** EJERCICIO 1 */
range(1, 10)
  .pipe(
    filter((value, index) => {
      console.log("El index es: ", index); // Aquí comprobamos que el index entra pero no es emitido
      return value % 2 === 1;
    })
  )
  .subscribe((val) => console.log("Valor recibido!!: ", val));

/** EJERCICIO 2 */
interface Personaje {
  tipo: string;
  nombre: string;
}

const personajes: Personaje[] = [
  { tipo: "Heroe", nombre: "Batman" },
  { tipo: "Heroe", nombre: "Robin" },
  { tipo: "Villano", nombre: "Joker" },
];

// Con of
const ob$ = of<Personaje[]>(...personajes)
  .pipe(filter((personaje) => personaje.tipo === "Heroe"))
  .subscribe((value) => console.log("Desde of heroe", value));

// Con from
const ob1$ = from<Personaje[]>(personajes)
  .pipe(filter(({ tipo, nombre }) => tipo === "Villano"))
  .subscribe((value) => console.log("Desde from villano", value));

/** EJERCICIO 3: Cadenas de operadores */
const keyUp$ = fromEvent<KeyboardEvent>(document, "keyup").pipe(
  map((event) => event.code),
  filter((code) => code === "Enter") // Esto trabajará con lo que venga del map
);

keyUp$.subscribe(console.log);
