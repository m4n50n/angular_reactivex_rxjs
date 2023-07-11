import { of, startWith } from 'rxjs';

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/startWith
 * Nombre: startWith

 * Descripción:
 *  - Permite realizar una emisión antes de que el observable empiece a emitir
 *
 * Documentación oficial:
 * --------------------------
 *  - Returns an observable that, at the moment of subscription, will synchronously emit all values provided to this operator, then subscribe to the source and mirror all of its emissions to subscribers
 *  - startWith<T, D>(...values: D[]): OperatorFunction<T, T | D>
 */
const numeros$ = of(1, 2, 3);

numeros$.pipe(
    startWith(0) // 0 será la primera emisión antes de que el observable of emita sus valores
).subscribe(console.log);