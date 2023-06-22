import { Observable, Observer } from "rxjs";

/*
- Un Observable en RxJs es una fuente de datos que emite eventos o valores a lo largo del tiempo.
- Un Observable puede tener cero, uno o muchos valores y puede terminar (completarse) o no. 
- Puede emitir valores síncrona o asincrónicamente y permite a los suscriptores registrarse para recibir estos valores o eventos.
- Por otro lado, un Observer en RxJS es un objeto que define cómo reaccionar a los valores emitidos por un Observable. Un Observer se compone generalmente de tres métodos:

- Un Observer en RxJs representa un objeto que define cómo reaccionar a los valores emitidos por un Observable. 
- Un Observer se compone generalmente de tres métodos:
    - next(value): Este método se invoca cuando se emite un nuevo valor desde el Observable. El valor emitido se pasa como argumento a este método.
    - error(error): Se llama a este método cuando se produce un error en el Observable. El error se pasa como argumento a este método.
    - complete(): Este método se llama cuando el Observable completa su secuencia de valores y no emitirá más valores en el futuro.

- En resumen, un Observable es la fuente de datos que emite valores o eventos, mientras que un Observer es un objeto que reacciona a esos valores o eventos emitidos por el Observable. 
- El Observer define cómo manejar los valores y eventos emitidos, incluyendo cómo procesar los valores, manejar errores y manejar la finalización del Observable.
*/

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

// Este observer se podrá mandar a una suscripción para que ejecute automáticamente las instrucciones
const observer: Observer<any> = { // Establecemos el tipo de dato que va a fluir a través del observer
    next: value => console.log("Siguiente [next]: ", value),
    error: error => console.warn("Error [obs]: ", error),
    complete: () => console.info("Subscriber completado [obs]")
};

obs$.subscribe(observer);
