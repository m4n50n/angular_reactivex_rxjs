import { Observable, Observer } from "rxjs";

const observer: Observer<any> = {
    next: value => console.log("[next]: ", value),
    error: error => console.warn("[error]: ", error),
    complete: () => console.info("[completado]")
};

const intervalo$ = new Observable<number>(subscriber => {
    // Crear un contador
    let i = 0;
    const interval = setInterval(() => {
        i++;
        subscriber.next(i); // Cada vez que se hace next, se EMITE un número (<number>)
    }, 1000);

    // El siguiente return se ejecutará al hacer un unsubscribe. Sin el return, se desuscribiría pero el intervalo seguiría corriento
    return () => {
        clearInterval(interval);
        console.log("Intervalo destruido");
    }
});

// Este método del subscribe, al final lo que retorna es una Suscription,
// así que puedo asignarlo a una variable
const subscription = intervalo$.subscribe(numero => console.log("Num: ", numero));

// Nota: cuando nos suscribimos, se crea una nueva instancia del Observable y vuelve a empezar

setTimeout(() => {
    subscription.unsubscribe(); // A los 3 segundos se desuscribirá esta suscripción pero el intervalo seguirá emitiendo datos, así que podría haber una fuga de memoria
}, 3000);