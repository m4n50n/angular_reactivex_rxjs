import { Observable, Observer, Subject } from "rxjs"; // Lo que importemos directamente de "rxjs" significa que será algo para crear observables o algún tipo de tipados como el subject

// El subject es un tipo despecial de Observable
// https://rxjs.dev/guide/subject

/**
 * En este ejercicio tenemos un observable que emite cada segundo un número random
 * Si creo subs1 y subs2 para que se subscriban al observable, cada segundo se emitirá dos valores distintos, pero....
 * 
 *********** Qué pasaría si necesitamos que todas las subscripciones reciban el mismo valor? Para esto usamos Subject
 */
const observer: Observer<any> = {
    next: value => console.log("[next]: ", value),
    error: error => console.warn("[error]: ", error),
    complete: () => console.info("[completado]")
};

// Creamos intervalo que emite un número random cada segundo
const intervalo$ = new Observable<number>(subscriber => { // Observable que emitirá un number
    const intervalId = setInterval(() => subscriber.next(Math.random()), 1000);

    return () => {
        clearInterval(intervalId);
        console.log("Intervalo destruido");
    } 
});

// const subs1 = intervalo$.subscribe(rnd => console.log("subs1", rnd)); // Aquí se recibiría un valor emitido por el observable
// const subs2 = intervalo$.subscribe(rnd => console.log("subs2", rnd)); // Aquí se recibiría otro valor emitido por el observable (distinto al valor que recibe subs1)

/**
 * Creamos el subject
 * Características principales:
 *  - 1. Casteo múltiple: quiere decir que muchas suscripciones van a estar sujetas al mismo observable y por lo tanto se distribuirá la misma información a todos los lugares que estén suscritos
 *  - 2. También es un Observer
 *  - 3. También se puede manejar next, error y complete (puesto que también es un observer)
 */
const subject$ = new Subject(); // Al poner el simbolo de $ definimos que es un observable (buenas prácticas)
const subscription = intervalo$.subscribe(subject$); // Aquí podemos comprobar que un subject también es un observer. De esta manera, si creamo nuevas suscripciones:

const subs1 = subject$.subscribe(observer); // Aquí se recibirá un valor
const subs2 = subject$.subscribe(observer); // Aquí se recibirá el mismo valor que en subs1

setTimeout(() => {
    subject$.next(10); // Cómo es un observable, puedo emitir un valor
    subject$.complete(); // OJO! Este complete completa el subject, pero no el observable principal, por lo que el return del clearInterval() no se está ejecutando puesto que no es un UNSUBSCRIBE, así que sigue consumiendo memoria

    subscription.unsubscribe(); // Aquí si se ejecuta el return puesto que no estamos unsubscribiendo

    // Aquí podemos ver que el subject nos va a servir para insertar información al flujo de datos que el Observable intervalo$ está emitiendo

    // ****** Cuando la información es emitida por un observable en sí mismo, es considerado un "Cold Observable", pero cuando la información es emitida FUERA del observable (como en este caso del subject) es un Hot Observable
}, 3500);