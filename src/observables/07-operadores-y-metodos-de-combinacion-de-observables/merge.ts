import { merge, fromEvent, pluck } from 'rxjs';

/**
 * https://rxjs-dev.firebaseapp.com/api/index/function/merge
 * Nombre: merge

 * Descripción:
 *  - Es la función merge
 *  - Es una función que recibe observables como argumento y el resultado será el producto de los observables combinados simultáneamente
 *
 * Documentación oficial:
 * --------------------------
 *  - Creates an output Observable which concurrently emits all values from every given input Observable
 *  - merge(...args: (number | SchedulerLike | ObservableInput<unknown>)[]): Observable<unknown>
 */
const keyup$ = fromEvent(document, "keyup");
const click$ = fromEvent(document, "click");

merge( // La salida de este merge es el producto de ambas emisiones
    keyup$.pipe(pluck("type")), 
    click$.pipe(pluck("type"))
).subscribe(console.log);
