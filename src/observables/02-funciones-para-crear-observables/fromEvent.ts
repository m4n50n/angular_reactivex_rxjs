import { fromEvent } from "rxjs";

/**
 * https://rxjs.dev/api/index/function/fromEvent
 * Nombre: fromEvent
 * Descripción:
 *  - Función que permite crear observables en base a un event target (es decir, de tipo Event)
 *
 * Documentación oficial:
 * --------------------------
 *  - Creates an Observable that emits events of a specific type coming from the given event target
 *  - fromEvent<T>(target: any, eventName: string, options?: EventListenerOptions | ((...args: any[]) => T), resultSelector?: (...args: any[]) => T): Observable<T>
 */

/**
 * Eventos del DOM
 */
const source1 = fromEvent<MouseEvent>(document, "click"); // (*) Mientras no exista un suscripción este observable no emitirá valores
const source2 = fromEvent<KeyboardEvent>(document, "keyup");

const observer = {
  next: (value) => console.log("[next]: ", value),
  error: (error) => console.warn("[error]: ", error),
  complete: () => console.info("[complete] Secuencia terminada"),
};

source1.subscribe(evento => {
    console.log(evento.x);
    console.log(evento.y);
});

source2.subscribe(evento => {
    console.log(evento.key);
});
