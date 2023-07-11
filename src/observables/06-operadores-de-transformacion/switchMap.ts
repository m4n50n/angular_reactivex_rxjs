import { fromEvent, switchMap } from "rxjs";
import { ajax } from "rxjs/ajax";

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/switchMap
 * Nombre: switchMap

 * Descripción:
 *  - Es un operador que, al igual que mergeMap() recibe un callback que retorna un observable que emitirá valores a los suscriptores
 *  - A diferencia del operador mergeMap, switchMap cancela cualquier subscripción anterior y solo emite los valores del observable más reciente
 *  - El operador switchMap se encarga de cancelar las solicitudes anteriores si el usuario ingresa un nuevo término de búsqueda antes de que se complete la solicitud actual. Esto evita que las respuestas lleguen en un orden incorrecto o que se muestren resultados obsoletos
 *
 * Documentación oficial:
 * --------------------------
 *  - Projects each source value to an Observable which is merged in the output Observable, emitting values only from the most recently projected Observable
 *  - switchMap<T, R, O extends ObservableInput<any>>(project: (value: T, index: number) => O, resultSelector?: (outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R): OperatorFunction<T, ObservedValueOf<O> | R>
 */
// Obtén el elemento de entrada de búsqueda del formulario
const searchInput = document.createElement("input");
document.querySelector("body").append(searchInput);

// Crea un observable desde el evento de entrada de búsqueda
const input$ = fromEvent(searchInput, 'input');

// Utiliza switchMap para realizar una solicitud de búsqueda cada vez que se ingresa un término de búsqueda
input$
  .pipe(
    switchMap((event: any) => {
      const term = event.target.value;

      return ajax.getJSON(`https://api.github.com/search/users?q=${term}`);
    })
  )
  .subscribe((response) => {
    console.log(response);
    // Realiza acciones con la respuesta de la API, como mostrar los resultados en la interfaz de usuario.
  });

// Si en este ejemplo usáramos mergeAll en lugar de switchMap, se realizarían múltiples solicitudes de búsqueda simultáneamente y las respuestas se fusionarían en el flujo de salida sin cancelar las solicitudes anteriores. Esto puede generar un orden de respuestas incorrecto y resultados obsoletos si el usuario ingresa rápidamente múltiples términos de búsqueda