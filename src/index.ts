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
        console.log("dentro del observable", i);
    }, 1000);

    // Si ponemos lo siguiente, se emitirá el complete a los 2,5 segundos y por lo tanto los siguientes valores ya no se emitirían
    // Pero es importante matizar que el complete no hace lo mismo que el unsubscribe y que el return del observable se ejecuta al hacer unsubscribe
    // y no al hacer el complete
    setTimeout(() => {
        subscriber.complete(); // El evento "complete" simplemente indica que el flujo de datos ha finalizado
        console.log("completado timeout");
    }, 6000);

    // El siguiente return se ejecutará cada vez que se haga un unsubscribe. Sin el return, se desuscribiría pero el intervalo seguiría corriento
    // Hay que tener en cuenta que cuando se realiza una nueva suscripcion se ejecuta todo el código de aquí dentro (es decir, empezaría un nuevo contador)
    // Y cuando esa suscripción se anule (unsubscribe), se ejecutará el return del observable
    return () => { // La función de retorno del observable se ejecuta cuando se cancela explícitamente la suscripción al observable.
        clearInterval(interval);
        console.log("Intervalo destruido");
    }
});

// Este método del subscribe, al final lo que retorna es una Suscription,
// así que puedo asignarlo a una variable
// const subscription = intervalo$.subscribe(numero => console.log("Num: ", numero));
const subscription = intervalo$.subscribe(observer);

// Nota: cuando nos suscribimos, se crea una nueva instancia del Observable y vuelve a empezar

setTimeout(() => {
    console.log("Antes del timeout");
    subscription.unsubscribe(); // A los 3 segundos se desuscribirá esta suscripción pero el intervalo seguirá emitiendo datos, así que podría haber una fuga de memoria, por esto hacemos el return en el observable
    console.log("unsubscribe timeout");
}, 3000);