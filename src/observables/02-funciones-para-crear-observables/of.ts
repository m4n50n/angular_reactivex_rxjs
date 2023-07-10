import { of } from "rxjs";

/**
 * https://rxjs.dev/api/index/function/of
 * Nombre: of
 * Descripción:
 *  - Función que permite crear observables en base a un listado de elementos (números o cualquier tipo de objeto)
 *  - Lo importante es que of emitirá los valores en secuencia uno por uno de manera síncrona, y cuandoo termine, se completa el observable
 *
 * Documentación oficial:
 * --------------------------
 *  - Converts the arguments to an observable sequence (Convierte el argumento en una secuencia de valores que van a ser emitidos por el observable)
 *  - of<T>(...args: (SchedulerLike | T)[]): Observable<T>
 */

// ---------------------------------------------------------------------------------------------------------------------
// EJEMPLO 1:
const observable$ = of<number[]>(1, 2, 3, 4, 5, 6); // (*) Mientras no exista un suscripción este observable no emitirá valores

// Si hiciéramos esto:
const observable1$ = of([1, 2, 3, 4, 5, 6]); // Ya no sería una secuencia de elementos porque solo hay uno, que es un array con los 6 elementos. De esta forma, of sólo emitiría un valor que sería el array

console.log("Inicio del observable$"); // Con estos console.log() demostramos que los observables también trabajan de manera síncrona
observable$.subscribe({
  next: (value) => console.log("[next]: ", value),
  error: (error) => console.warn("[error]: ", error),
  complete: () => console.info("[complete] Secuencia terminada")
});
console.log("Fin del observable$");
console.log("-------------------------------");

// ---------------------------------------------------------------------------------------------------------------------
// EJEMPLO 2: Se emite una secuencia de valores de distinto tipo, pero también funciona
const observable2$ = of<any>([1, 2], {a:1, b:2}, function(){}, true, Promise.resolve());

console.log("Inicio del observable2$");
observable2$.subscribe({
  next: (value) => console.log("[next]: ", value),
  error: (error) => console.warn("[error]: ", error),
  complete: () => console.info("[complete] Secuencia terminada"),
});
console.log("Fin del observable2$");
console.log("-------------------------------");
