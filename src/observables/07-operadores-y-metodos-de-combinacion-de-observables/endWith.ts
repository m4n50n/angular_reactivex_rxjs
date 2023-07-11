import { of, endWith } from 'rxjs';

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/endWith
 * Nombre: endWith

 * Descripción:
 *  - Permite realizar una emisión antes de que el observable se complete
 *
 * Documentación oficial:
 * --------------------------
 *  - Returns an observable that will emit all values from the source, then synchronously emit the provided value(s) immediately after the source completes
 *  - endWith<T>(...values: (SchedulerLike | T)[]): MonoTypeOperatorFunction<T>
 */
const numeros$ = of(1, 2, 3);

numeros$.pipe(
    endWith(4) // 4 será la última emisión después de que el observable of emita sus valores
).subscribe(console.log);
