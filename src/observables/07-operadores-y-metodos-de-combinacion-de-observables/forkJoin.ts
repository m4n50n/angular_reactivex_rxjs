import { delay, forkJoin, interval, of, take } from 'rxjs';

/**
 * https://rxjs-dev.firebaseapp.com/api/index/function/forkJoin
 * Nombre: forkJoin

 * Descripción:
 *  - Puede recibir varios observables como argumento
 *  - Los observables internos deben ser finitos. Si no, forkJoin no emitiría ningún valor
 *
 * Documentación oficial:
 * --------------------------
 *  - Accepts an Array of ObservableInput or a dictionary Object of ObservableInput and returns an Observable that emits either an array of values in the exact same order as the passed array, or a dictionary of values in the same shape as the passed dictionary
 *  - forkJoin(...args: any[]): Observable<any>
 */
const numeros$ = of(1,2,3,4);
const intervalo$ = interval(1000).pipe(take(3)); // Limitamos a 3 emisiones con take puesto que el observable debe ser finito e interval es infinito
const letras$ = of("a", "b", "c").pipe(delay(3500));

// forkJoin(
//     numeros$,
//     intervalo$,
//     letras$
// ).subscribe(console.log);

// forkJoin(
//     numeros$,
//     intervalo$,
//     letras$
// ).subscribe(resp => {
//     console.log("numeros: ", resp[0])
//     console.log("intervalo: ", resp[1])
//     console.log("letras: ", resp[2])
// });

forkJoin({
    numeros$,
    intervalo$,
    letras$
}).subscribe(resp => {
    console.log(resp);
});