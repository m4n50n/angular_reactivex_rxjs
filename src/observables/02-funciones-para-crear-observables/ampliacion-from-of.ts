import { of, from } from "rxjs";

/**
 * https://rxjs.dev/api/index/function/from
 * Nombre: from
 * Descripción:
 *  - Crea un observable en base a un array, objeto, promesa, iterable, otro observable, etc...
 *
 * Documentación oficial:
 * --------------------------
 *  - Creates an Observable from an Array, an array-like object, a Promise, an iterable object, or an Observable-like object
 *  - from<T>(input: ObservableInput<T>, scheduler?: SchedulerLike): Observable<T>
 */

/** of -> Toma argumento y emite una secuencia de valores */

const observer = {
  next: (value) => console.log("[next]: ", value),
  error: (error) => console.warn("[error]: ", error),
  complete: () => console.info("[complete] Secuencia terminada"),
};

/* ------------------------------------ */
// EJERCICIO 1
const sourceFrom$ = from([1, 2, 3, 4, 5]); // Esto emite 5 valores (1, 2, 3, 4, 5)
const sourceOf$ = of([1, 2, 3, 4, 5]); // Esto emite solo un valor, que es un array con los 5 elementos

// Si quisiéramos que Of emitiera 5 valores correspondientes al array, tendríamos que usar el spread operator así
const sourceOfSpread$ = of(...[1, 2, 3, 4, 5]);

sourceFrom$.subscribe(observer);
sourceOf$.subscribe(observer);
sourceOfSpread$.subscribe(observer); // Aquí tendríamos el mismo efecto que en sourceFrom$.subscribe(observer);

/* ------------------------------------ */
// EJERCICIO 2
const source$ = from("Jose"); // Esto emitirá 4 valores: J, o, s, e
source$.subscribe(observer);

/* ------------------------------------ */
// EJERCICIO 3
const src$ = from(fetch("https://api.github.com/users/m4n50n")); // Enviamos promesa
// src$.subscribe(observer); // Obtenemos la respuesta HTTP del fetch

// Para obtener la respuesta primera forma
// src$.subscribe(respuesta => {
//     console.log(respuesta.json().then(respuesta => console.log("respuestaa", respuesta)));
// });

// Para obtener la respuesta segunda forma
src$.subscribe(async(respuesta) => {
    const dataResp = await respuesta.json();
    console.log("dataResp", dataResp);
});

/* ------------------------------------ */
// EJERCICIO 4: ITERABLES
// Un iterable es un objeto que me permite obtener valores secuencialmente
// https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Generator
// La siguiente función enviará el siguiente valor cada vez que se llame
const miGenerador = function*() { // El asterisco indica que es una función generadora
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
};

const miIterable = miGenerador();
for (let id of miIterable) {
    console.log(id);
}

// Con la función from sería:
from(miIterable).subscribe(observer); // Aquí tendríamos el mismo resultado y sabríamos cuando se completa, el siguiente valor, etc... La ventaja de que sea un observable me permite trabajar con operadores, transformar los datos, etc...
