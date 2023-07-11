import { combineLatest, fromEvent, pluck } from 'rxjs';

/**
 * https://rxjs-dev.firebaseapp.com/api/index/function/combineLatest
 * Nombre: combineLatest

 * Descripción:
 *  - Es la función combineLatest
 *  - Es una función que permite mandar observables como argumento, combinarlos, y emitir todos los valores de los observables internos simultáneamente
 *  - Retorna un nuevo observable que emitirá valores hasta que todos los observables internos hayan emitido al menos un valor
 *
 * Documentación oficial:
 * --------------------------
 *  - Combines multiple Observables to create an Observable whose values are calculated from the latest values of each of its input Observables
 *  - combineLatest<O extends ObservableInput<any>, R>(...args: any[]): Observable<R> | Observable<ObservedValueOf<O>[]>
 */
// Ejemplo 1
// const keyup$ = fromEvent(document, "keyup");
// const click$ = fromEvent(document, "click");

// combineLatest(
//     keyup$.pipe(pluck("type")), 
//     click$.pipe(pluck("type"))
// ).subscribe(console.log);

// Ejemplo 2
const input1 = document.createElement("input");
const input2 = document.createElement("input");

input1.placeholder = "email@gmail.com";
input2.placeholder = "***************";
input2.type = "password";
document.querySelector("body").append(input1, input2);

// Helper
const getInputStream = (element: HTMLElement) =>
    fromEvent<KeyboardEvent>(element, "keyup").pipe(
        pluck("target", "value")
    );

combineLatest(
    getInputStream(input1),
    getInputStream(input2)
).subscribe(console.log); // Los valores se emitirán cuando cada observable interno haya emitido al menos un valor
