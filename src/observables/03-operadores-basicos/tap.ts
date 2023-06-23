import { range } from "rxjs";
import { tap, map } from "rxjs/operators";

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/tap
 * Nombre: tap
 * Descripción:
 *  - Operador bastante utilizado porque ayuda mucho a ver cómo fluye la información dentro de los observables
 *  - El principal uso del tap es disparar efectos secundarios (ya sea un console.log o disparar alguna acción cuando la información pase a través del observable) 
 *  SIN MODIFICAR el flujo de datos
 *  - El operador tap se utiliza comúnmente para depurar, registrar o realizar acciones adicionales en los datos que se emiten en un flujo de RxJs
 *  - Hay que tener en cuenta que hay que hacerlo con cuidado para no disparar acciones sin querer
 *  - Suele ser usado solo para propósitos de depuración y acciones secundarias
 *  - NO DEBE USARSE para transformar datos (ya que para eso está map, filter o reduce)
 *
 * Documentación oficial:
 * --------------------------
 *  - Used to perform side-effects for notifications from the source observable
 *  - tap<T>(observerOrNext?: Partial<TapObserver<T>> | ((value: T) => void), error?: (e: any) => void, complete?: () => void): MonoTypeOperatorFunction<T>
 */

/** EJERCICIO 1 */
const numeros$ = range(1, 5);
numeros$
  .pipe(
    tap((x) => {
      console.log("tap antes de que se ejecute el subscribe", x);
      return 100;
    }),
    map((val) => val * 10),
    tap((x) => console.log("despues", x)),
    tap({ // Creamos un observer parcial
      next: valor => console.log("DESPUEESSSS", valor), // El next se ejecutará cada vez que el tap reciba el siguiente valor
      complete: () => console.log("Se terminó todo") // El complete se ejecutará cuando todo el observer se complete (POR ESO SIRVE PARA LA DEPURACIÓN)
    })
  )
  .subscribe((val) => console.log("subs", val));
