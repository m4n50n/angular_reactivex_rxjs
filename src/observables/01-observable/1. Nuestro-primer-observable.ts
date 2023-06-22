import { Observable } from "rxjs";

// Un observable es un objeto que puede emitir valores
// Es típico poner el símbolo de dolar $ al final a los observables

// Creando Observables
/* Forma 1 */
// const obs$ = Observable.create(); // Deprecated

/* Forma 2 */
// Con <string> especificamos el tipo de dato que va a devolver el Observable. Si no ponemos nada se considerará <unknown>
const obs$ = new Observable<string>(subscriber => {
    subscriber.next("Hola"); // next() emitirá el valor a los elementos suscritos
    subscriber.next("Mundo");
    subscriber.next("Test");
    subscriber.complete(); // Notificar que el observable ya no va a seguir emitiendo valores o que los valores siguientes ya no son de importancia
    // Por lo que al hacer el complete es posible que el observable siguiera emitiendo valores pero ya no hubiera una salida y por lo tanto sus dependientes no llegan a ser notificados

    subscriber.next("Esto no se ejecuta porque se ha ejecutado complete()");
});

/**
 * IMPORTANTE
 * Para que un Observable se ejecute, tiene que tener por lo menos una suscripción
 * porque el subscriber notificará a las suscripciones, y si no hay suscripciones no notificará nada
 */
obs$.subscribe(resp => console.log(resp));

