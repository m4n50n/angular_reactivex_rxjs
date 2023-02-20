import { Observable, Observer } from "rxjs";

// El Observer es una interface, por lo que obliga a establecer lo que se necesita para que ese Observer tenga todo lo que se necesita para que sea un observer valido 
// Este observer se podrá mandar a una suscripción para que ejecute automáticamente las instrucciones
const observer: Observer<any> = { // Establecemos el tipo de dato que va a fluir a través del observer
    next: value => console.log("Siguiente [next]: ", value),
    error: error => console.warn("Error [obs]: ", error),
    complete: () => console.info("Subscriber completado [obs]")
};

const obs$ = new Observable<string>(subscriber => {
    subscriber.next("Hola"); // next() emitirá el valor a los elementos suscritos
    subscriber.next("Mundo");
    subscriber.next("Test");

    // Simulación de un error para probar el parámetro "error"
    // const a = undefined;
    // a.nombre = "Jose";

    subscriber.complete();

    subscriber.next("Esto no se ejecuta porque se ha ejecutado complete()");
});

// En esta suscripción, se recibe exactamente el subscriber, por lo que si hago console.log() recibo el valor como tal (lo que envía el next())
// obs$.subscribe(resp => console.log(resp));

// En esta suscripción,
// obs$.subscribe(
//     valor => console.log("next: ", valor), // El primer argumento es el callback principal que no retorna nada
//     error => console.warn("Error!!: ", error), // El segundo argumento es el error (que tampoco regresa nada)
//     () => console.info("Completado") // El tercer argumento es el complete() (que no regresa nada tampoco -void-)
// );

obs$.subscribe(observer);
