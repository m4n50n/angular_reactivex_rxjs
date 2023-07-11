import { debounceTime, fromEvent, map, mergeAll, pluck } from "rxjs";
import { ajax } from "rxjs/ajax";

/**
 * https://rxjs-dev.firebaseapp.com/api/operators/mergeAll
 * Nombre: mergeAll

 * Descripción:
 *  - Combina los observables que se emiten dentro del flujo principal
 *
 * Documentación oficial:
 * --------------------------
 *  - Converts a higher-order Observable into a first-order Observable which concurrently delivers all values that are emitted on the inner Observables
 *  - mergeAll<O extends ObservableInput<any>>(concurrent: number = Infinity): OperatorFunction<O, ObservedValueOf<O>>
 */
const input = document.createElement("input");
document.querySelector("body").append(input);

const input$ = fromEvent<KeyboardEvent>(input, "keyup");

input$
  .pipe(
    debounceTime(500),
    map((texto) =>
      ajax.getJSON(`https://api.github.com/search/users?q=${texto}`)
      // Al utilizar mergeAll(), se suscribe a cada observable interno y se emiten sus valores
      // En este caso, el observable interno se crea con ajax.getJSON(), que realiza una solicitud HTTP a la URL proporcionada y devuelve un observable que emite la respuesta JSON
      // En cambio, si no se pone mergeAll(), el flujo de observables no se aplana y se suscribe directamente al observable que devuelve ajax.getJSON(). Debido a esto, solo se obtiene el observable en sí mismo, pero no se emite la respuesta JSON.
    ),
    mergeAll()
    // La función ajax.getJSON devuelve un observable que emite la respuesta JSON de la solicitud
    // mergeAll combina los observables emitidos por cada evento de teclado con el observable que emite la respuesta JSON
  )
  .subscribe((resp) => {
    console.log(resp);
  });

/*
1. Se define el flujo de eventos de teclado input$ utilizando fromEvent y el evento "keyup" del elemento input.
2. Se aplica el operador debounceTime(500) para asegurar que solo se emita el último evento después de un retraso de 500 milisegundos desde la última pulsación de tecla.
3. A continuación, se aplica el operador map al flujo input$. En cada evento de teclado, se ejecuta la función de mapeo que realiza una solicitud AJAX a la API de GitHub utilizando ajax.getJSON. Esto devuelve un observable que emite la respuesta JSON de la solicitud.
4. Finalmente, se utiliza el operador mergeAll para combinar todos los observables emitidos por el operador map en un solo flujo continuo de respuestas JSON. Esto significa que, en lugar de tener un flujo de observables, obtenemos un flujo continuo de valores JSON correspondientes a las respuestas de las solicitudes AJAX.
*/