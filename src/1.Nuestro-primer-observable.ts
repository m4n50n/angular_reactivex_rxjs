import { Observable } from "rxjs";

// Creando Observables
/* Forma 1 */
// const obs$ = Observable.create(); // Deprecated

/* Forma 2 */
// Con <string> especificamos el tipo de dato que va a devolver el Observable. Si no ponemos nada se considerará <unknown>
const obs$ = new Observable<string>(subscriber => {
    subscriber.next("Hola"); // next() emitirá el valor a los elementos suscritos
    subscriber.next("Mundo");
    subscriber.next("Test");
    subscriber.complete();

    subscriber.next("Esto no se ejecuta porque se ha ejecutado complete()");
});

/**
 * IMPORTANTE
 * Para que un Observable se ejecute, tiene que tener por lo menos una suscripción
 * porque el subscriber notificará a las suscripciones, y si no hay suscripciones no notificará nada
 */
obs$.subscribe(resp => console.log(resp));

