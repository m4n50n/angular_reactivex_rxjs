import { mergeMap, of } from "rxjs";

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/mergeMap
 * Nombre: mergeMap

 * Descripción:
 *  - Se utiliza para transformar y combinar observables en una secuencia de emisiones
 *  - Toma cada valor emitido por el observable fuente y lo transforma en otro observable. Luego, combina todas las emisiones de los observables resultantes en una sola secuencia
 *
 * Documentación oficial:
 * --------------------------
 *  - Projects each source value to an Observable which is merged in the output Observable
 *  - mergeMap<T, R, O extends ObservableInput<any>>(project: (value: T, index: number) => O, resultSelector?: number | ((outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R), concurrent: number = Infinity): OperatorFunction<T, ObservedValueOf<O> | R>
 */
// Creamos un observable fuente con algunos valores
const source = of(1, 2, 3);

// Definimos una función que toma un valor y devuelve un observable con ese valor duplicado
const duplicate = (value: number) => of(value, value);

// Aplicamos mergeMap para transformar cada valor del observable fuente en un observable duplicado
const example = source.pipe(
  mergeMap(duplicate)
);

// Subscribimos y recibimos todas las emisiones de los observables resultantes
example.subscribe(value => console.log(value));