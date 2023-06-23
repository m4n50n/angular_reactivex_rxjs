import { fromEvent, range } from "rxjs";
import { map } from "rxjs/operators";

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/map
 * Nombre: map
 * Descripción:
 *  - Es el operador más común de todos y el que más se utiliza, ya que permite transformar lo que recibimos o lo que emite el observable en algo que necesitemos
 *
 * Documentación oficial:
 * --------------------------
 *  - Applies a given project function to each value emitted by the source Observable, and emits the resulting values as an Observable
 *  - map<T, R>(project: (value: T, index: number) => R, thisArg?: any): OperatorFunction<T, R>
 * 
 *  - T -> Tipo de dato de entrada
 *  - R -> Tipo de dato de salida
 */

/** Creamos Observables para probar */
range(1, 5).subscribe(val => console.log(val * 10)); // De esta forma normal funciona, todos los valores se multiplicarían por 10
// PERO no es conveniente realizar este cálculo en cada una de las suscripciones

// Para trabajar con operadores pasaremos antes el método pipe
range(1, 5).pipe(); // Aquí usamos pipe pero no hacemos nada. Es como si tuviéramos una manguera de agua que emite valores pero no hacemos nada con ellos (no los procesamos)

// Con <number, number> especificamos que la entrada es un number y la salida otro number
range(1, 5).pipe(map<number, string>((value) => (value * 10).toString())).subscribe(console.log);

// El siguiente observable emitirá un KeyboardEvent 
const keyUp$ = fromEvent<KeyboardEvent>(document, "keyup");
const keyUpCode$ = keyUp$.pipe(map(event => event.code)); // Esto también podríamos haberlo puesto al definir el observable, pero así son instancias diferentes
keyUpCode$.subscribe(code => console.log("map keyup", code));
