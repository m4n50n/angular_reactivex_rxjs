import { of, concat, interval, take } from 'rxjs';

/**
 * https://rxjs-dev.firebaseapp.com/api/index/function/concat
 * Nombre: concat

 * Descripción:
 *  - Es la función concat (no el operador - que está obsoleto -)
 *  - Es una función que recibe observables como argumento y creará un nuevo observable
 *
 * Documentación oficial:
 * --------------------------
 *  - Creates an output Observable which sequentially emits all values from the first given Observable and then moves on to the next
 *  - concat(...args: any[]): Observable<unknown>
 */
const interval$ = interval(1000); // Este observable emitirá valores de manera secuencial cada 1000 milisegundos (1 segundo)

// En el siguiente ejemplo, concat combinará dos observables en uno solo y mantener un orden secuencial en las emisiones
// De forma que primero se emitirán los valores del primer observable y cuando se complete se emitirá los valores del segundo observable y así
concat(
    interval$.pipe(take(3)),
    interval$.pipe(take(2))
).subscribe(console.log);