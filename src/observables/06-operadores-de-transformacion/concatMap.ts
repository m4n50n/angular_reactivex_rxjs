import { fromEvent, of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/concatMap
 * Nombre: concatMap

 * Descripción:
 *  - Se utiliza para transformar los valores emitidos por un observable en otro observable, manteniendo un orden secuencial en las suscripciones. Cada observable interno se espera a que el anterior se complete antes de que se inicie la suscripción al siguiente
 *
 * Documentación oficial:
 * --------------------------
 *  - Projects each source value to an Observable which is merged in the output Observable, in a serialized fashion waiting for each one to complete before merging the next
 *  - concatMap<T, R, O extends ObservableInput<any>>(project: (value: T, index: number) => O, resultSelector?: (outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R): OperatorFunction<T, ObservedValueOf<O> | R>
 */
// Obtén el elemento de entrada de búsqueda del formulario
const searchInput = document.createElement("input");
document.querySelector("body").append(searchInput);

// Crea un observable desde el evento de entrada de búsqueda
const input$ = fromEvent(searchInput, 'input');

// Utiliza concatMap para simular solicitudes de búsqueda secuenciales
input$
  .pipe(
    concatMap((event: any) => {
      const term = event.target.value;
      // Simula una solicitud de búsqueda con un retraso de 1 segundo
      return of(`Resultado para ${term}`).pipe(delay(1000));
    })
  )
  .subscribe((response) => {
    console.log(response);
    // Realiza acciones con el resultado de búsqueda, como mostrarlo en la interfaz de usuario.
  });

/*
Dentro de concatMap, se obtiene el término de búsqueda ingresado por el usuario a través de event.target.value. Luego, se utiliza of para crear un observable que emite un único valor, que en este caso es una cadena que representa el resultado de búsqueda para el término ingresado. Se utiliza delay para simular una solicitud de búsqueda que toma 1 segundo en completarse.
El operador concatMap se encarga de suscribirse secuencialmente a cada observable interno generado por el término de búsqueda ingresado. Cada observable se completa antes de que comience la suscripción al siguiente. Esto garantiza que las solicitudes de búsqueda se realicen en orden y se respete el flujo secuencial.
En la función de suscripción, puedes realizar acciones con el resultado de búsqueda, como mostrarlo en la interfaz de usuario o realizar cualquier otra lógica de manejo de datos necesaria.
En resumen, concatMap te permite transformar los valores de un observable en otro observable, manteniendo un orden secuencial en las suscripciones. Es útil cuando necesitas que las solicitudes o acciones se realicen de manera secuencial y respeten un orden específico.
*/