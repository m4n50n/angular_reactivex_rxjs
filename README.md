# RxJS - ReactiveX

- [RxJS - ReactiveX](#rxjs---reactivex)
  - [1.0: Introducción a la programación Reactiva](#10-introducción-a-la-programación-reactiva)
  - [1.1: Beneficios de la programación reactiva](#11-beneficios-de-la-programación-reactiva)
  - [1.2: Comparación entre JS y RxJS](#12-comparación-entre-js-y-rxjs)
  - [2: El núcleo de las extensiones Reactivas](#2-el-núcleo-de-las-extensiones-reactivas)
  - [2.1: Observables, Operadores y Suscripciones](#21-observables-operadores-y-suscripciones)
  - [2.2: ReactiveX](#22-reactivex)
  - [2.3: Creando Observables](#23-creando-observables)
  - [2.4: Subjects](#24-subjects)
  - [3: Funciones para crear Observables (Built in Observables)](#3-funciones-para-crear-observables-built-in-observables)
  - [4: Recursos y documentación RxJS](#4-recursos-y-documentación-rxjs)
  - [3.7: Hot y Cold Observables](#37-hot-y-cold-observables)

## 1.0: Introducción a la programación Reactiva

* Primitivo: **Observable**
* En lugar de describir los datos en términos de otros datos, los describimos en términos de flujos de eventos. A partir de esto creamos una canalización de modo que ciertos datos cambian y se procesan
* Los datos fluyen unidireccionalmente
* Las suscripciones ayudan a cambiar los datos

```javascript
const myObservable$ = of<number[]>(1, 2, 3, 4, 5, 6);

myObservable$.subscribe({
  next: (value) => console.log("[next]: ", value),
  error: (error) => console.warn("[error]: ", error),
  complete: () => console.info("[complete] Secuencia terminada")
});
```

## 1.1: Beneficios de la programación reactiva

* Obtener información en tiempo real
* Evitar el "Callback Hell" (tener callbacks anidados básicamente)
* Trabajar de forma simple tareas síncronas y asíncronas
* Uso de operadores para reducir y simplificar el trabajo
* Es fácil transformar los flujos (streams) de información
* Código más limpio y fácil de leer
* Fácil de implementar
* Fácil anexar procedimientos sin alterar el producto final

## 1.2: Comparación entre JS y RxJS

Vamos a comparar JS y RxJS en el caso del autocompletado (cuando tenemos, por ejemplo, un input que realiza una consulta cuando el usuario pulsa una tecla).

**JS**

Si ejecutamos `myInput.on("keyup", () => {})` en JS nos encontraríamos con los siguientes problemas:

* Puede provocar resultados impredecibles o incorrectos
* Puede provocar muchos cambios de estado
* Se realizarían múltiples consultas y afectaría al rendimiento
* Incluso si usamos `setTimeout` para reducir la cantidad de consultas no solucionaría problemas de rendimiento
* Habría que ir deteniendo la consulta anterior en cada *keyup*

**RxJS**

```javascript
const myInput = $("#myInput");
const results = $("#results");

fromEvent(myInput, "keyup")
    .map((e) => e.target.value)
    .distinctUntilChanged()
    .debounceTime(500)
    .switchMap(getItems)
    .subscribe((items) => {
        results.empty();
        results.append(items.map((r) => $(`<li />`).text(r)));
    });
```

## 2: El núcleo de las extensiones Reactivas

## 2.1: Observables, Operadores y Suscripciones

**Observables**

* La pieza principal en la programación reactiva
* Es algo que se puede observar y produce valores
* Es una fuente de datos que emite eventos o valores a lo largo del tiempo
* Puede emitir cero, uno o muchos valores y puede terminar (completarse) o no
* Permite a los suscriptores registrarse para recibir estos valores o eventos
* Pueden emitir errores
* Pueden ser infinitos o finitos
* Pueden ser síncronos o asíncronos

(*) No crearemos observables manualmente, sino que usaremos funciones de RxJs para crearlos.

**Operadores**

* Usados para **transformar** observables (map, groups, scan ...)
* Usados para **filtrar** observables (filter, distinct, skip, debounce ... )
* Son usados para **combinar** observables
* Usados para **crear** nuevos observables
* Son operaciones que modifican los datos que se envían desde los Observables: no producen valores por sí mismos, sino que los mueven a través de la canalización (*pipe*).


(*) Un Observable es el que emite todo el flujo de información, y <u>el procedimiento de recibir todas estas cantidades de información y únicamente coger lo que nos interesa es el concepto de **operador**</u>. El operador es una función que <u>se une a un observable</u> y *sirve para procesar los datos que dicho observable emite*. También se pueden conectar múltiples operadores.

(*) La idea de los operadores es que ya tengamos todos los métodos para procesar la información que emite un observable.

(*) Podemos encadenar operadores dentro de un *pipe* (separándolos con comas) y se respetará el orden en el que se encadenen (de arriba hacia abajo).

(*) Para trabajar con operadores pasaremos antes el método *pipe*.

**Suscripciones**

* Pedazo de código que hace "algo" con los valores devueltos por los operadores
* Consumen / observan la data del observable al que se suscriben
* Pueden recibir los errores y eventos del observable
* Desconocen todo lo que se encuentra detrás del observable

**Explicación ampliada**

Un ***Observable*** es una representación de una fuente de datos o de un flujo de eventos que puede cambiar con el tiempo. Puede ser cualquier tipo de flujo de datos, como una lista de elementos, eventos de un usuario, respuestas de una API, entre otros. Los Observables emiten valores y notifican a los Observadores (Observers) sobre cualquier cambio o actualización.

Un ***Observer*** (observador) es un objeto que está interesado en recibir notificaciones de un Observable. Es el componente que "observa" al Observable y reacciona ante los eventos o cambios que emite. El Observer define una serie de métodos para manejar diferentes situaciones, como recibir nuevos valores, manejar errores o completar la suscripción.

Un Observer en RxJs representa un objeto que define cómo reaccionar a los valores emitidos por un Observable. 

Un observer se compone generalmente de tres métodos:
  - **next(value)**: Este método se invoca cuando se emite un nuevo valor desde el Observable. El valor emitido se pasa como argumento a este método.
  - **error(error)**: Se llama a este método cuando se produce un error en el Observable. El error se pasa como argumento a este método.
  - **complete()**: Este método se llama cuando el Observable completa su secuencia de valores y no emitirá más valores en el futuro.

Un ***Subscriber*** (suscriptor) representa el observador que está suscrito al observable y la función de suscripción define qué hacer con los valores emitidos por el observable. Es similar al Observer, pero se utiliza más comúnmente en el contexto de programación reactiva, donde se proporcionan métodos adicionales para manejar la suscripción, como cancelarla o manejar la liberación de recursos.

Si tengo esto:
```javascript
const obs$ = new Observable<string>(subscriber => {
  subscriber.next("Nuevo valor"); 
  subscriber.complete(); 
});

obs$.subscribe(resp => console.log(resp));
```

El subscriber se crea al llamar al método subscribe en el observable obs$.

El método ***subscribe()*** es utilizado para establecer una conexión entre un Observable y un Observer (o Subscriber). Cuando se invoca el método subscribe en un Observable, se crea una suscripción y se pasa un Observer o Subscriber como argumento. Esta suscripción permite que el Observer o Subscriber reciba las notificaciones emitidas por el Observable. El método subscribe puede aceptar diferentes argumentos adicionales, como funciones para manejar valores, errores y completar la suscripción.

En resumen, el *Observable* es la fuente de datos o flujo de eventos que puede cambiar con el tiempo, el *Observer* es el componente que "observa" al Observable y reacciona ante los cambios o eventos emitidos, el *Subscriber* es una entidad que realiza la suscripción y recibe las notificaciones del Observable, y el método *subscribe* establece la conexión entre el Observable y el Observer/Subscriber, permitiendo que este último reciba las notificaciones emitidas por el Observable.

```javascript
import { Observable } from 'rxjs';

// Creamos un Observable que emite números del 1 al 5 cada segundo
const observable = new Observable<number>(observer => {
  let count = 1;
  const intervalId = setInterval(() => {
    observer.next(count);
    count++;

    if (count > 5) {
      clearInterval(intervalId);
      observer.complete(); // Notificar que la emisión ha terminado
    }
  }, 1000);
});

// Observer que tiene tres métodos: next, error y complete, para manejar los valores emitidos, los errores y la finalización de la emisión, respectivamente
const observer = {
  next: (value: number) => console.log(`Valor recibido: ${value}`),
  error: (error: any) => console.error(`Ocurrió un error: ${error}`),
  complete: () => console.log('La emisión ha finalizado'),
};

// Creamos un Subscriber (opcional) del Observable para establecer la conexión entre el Observable y el Observer (o Subscriber). El Observer se pasa como argumento al método subscribe, lo que permite que el Observer reciba las notificaciones emitidas por el Observable
const subscriber = observable.subscribe(observer);

// Ejemplo adicional de uso del método subscribe, donde se proporcionan funciones separadas para manejar los valores, errores y la finalización de la emisión
observable.subscribe(
  value => console.log(`Valor recibido: ${value}`),
  error => console.error(`Ocurrió un error: ${error}`),
  () => console.log('La emisión ha finalizado')
);
```

## 2.2: ReactiveX

ReactiveX es una API para programación asíncrona usando observables. Es una combinación de ideas de los patrones *observer*, *iterador* y *funcional*:

El ***patrón Observer*** es un patrón de diseño de software que define una dependencia del tipo uno a muchos entre objetos, de manera que cuando uno de los objetos cambia su estado, notifica este cambio a todos sus dependientes.

Por ejemplo, un semáforo sería un observer y los coches los elementos suscritos. Si el semáforo está en rojo y cambia su color a verde, los coches serían notificados, seguirían su camino y cancelarían la suscripción a ese semáforo, pero el semáforo podrá seguir emitiendo valores por un tiempo indefinido.

<u>En conclusión</u>: Notificar cuando suceden cambios (de uno a muchos).

El ***Patrón Iterador*** define una interfaz que declara los métodos necesarios para acceder secuencialmente a un grupo de objetos de una colección.

Es decir, nosotros crearíamos funciones o métodos que nos permitan saber cual es el primer elemento, cual el siguiente, cual el actual y si hay más.

<u>En conclusión</u>: Poder ejecutar operaciones secuenciales.

La ***Programación Funcional*** es crear un conunto de funciones que tengan un objetivo específico. Es decir, si tengo una función que reciba "A", y retorna "A + 1", siempre que yo llame a esa función retornará "A + 1". Sin efectos secundarios y sin mutar la data.

<u>En conclusión</u>: Tener funciones con tareas específicas que reciban argumentos y no muten la información.

![image](https://user-images.githubusercontent.com/92524023/220173581-a8df2a55-6243-4a3c-8e5c-24a253499c8e.png)

## 2.3: Creando Observables

```javascript
import { Observable } from "rxjs";

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
 * Para que un Observable se ejecute tiene que tener por lo menos una suscripción (excepto en el caso de Subject)
 * porque el subscriber notificará a las suscripciones, y si no hay suscripciones no notificará nada
 */
obs$.subscribe(resp => console.log(resp));
```

## 2.4: Subjects

https://rxjs.dev/guide/subject

Los **Subjects** son un tipo especial de Observable, con la diferencia de que son Observable y Observer a la misma vez.

Un Subject es una combinación de un observable y un observer, lo que significa que puede emitir eventos independientemente de si hay suscriptores presentes o no.

Se utiliza para unir código no reactivo con código reactivo.

Se aconseja usarlos como último recurso.

```javascript
import { Observable, Observer, Subject } from "rxjs";

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
```

## 3: Funciones para crear Observables (Built in Observables)

> ***RxJS*** proporciona una gran cantidad de operadores para manipular los datos emitidos desde un Observable y su flujo.

## 4: Recursos y documentación RxJS

* [RxJS Github](https://github.com/ReactiveX/rxjs)
* [RxMarbles](http://rxmarbles.com/)
* [RxVision Playground](http://jaredforsyth.com/rxvision/examples/playground/)

## 3.7: Hot y Cold Observables

La diferencia entre hot observables y cold observables radica en cómo se manejan los eventos pasados cuando hay nuevos suscriptores. Los hot observables no transmiten los eventos pasados a los nuevos suscriptores, mientras que los cold observables proporcionan todos los eventos, incluidos los pasados, a cada suscriptor.

* ***Hot Observable***: Producirá eventos independientemente de si hay alguien escuchando - ej.`fromEvent(title, 'keyup')`; Imagina una transmisión en vivo de un partido de fútbol. El partido está en curso y se están generando eventos, como goles, tarjetas amarillas, etc. Los espectadores que se unen a la transmisión en cualquier momento solo pueden observar los eventos que ocurrieron después de su entrada. No pueden ver los eventos pasados, como los goles que ya han sucedido.
  
* ***Cold Observable***: Emite eventos una vez hay suscripciones - ej. Ejemplo: Considera una lista de reproducción de canciones en un reproductor de música. Cada vez que un suscriptor se une a la lista de reproducción, comienza desde la primera canción y recibe todas las canciones en orden. Incluso si se unen múltiples suscriptores en momentos diferentes, cada uno obtendrá todas las canciones en el mismo orden.

```javascript
// Ejemplo Hot Observable
import { Subject } from 'rxjs';

// Creamos un subject como hot observable
const hotObservable = new Subject<number>();

// Emitimos números cada segundo
let count = 0;
setInterval(() => {
  hotObservable.next(count++);
}, 1000);

// Suscripción 1 al hot observable
hotObservable.subscribe((value) => {
  console.log(`Suscriptor 1: ${value}`);
});

setTimeout(() => {
  // Suscripción 2 al hot observable después de 3 segundos
  hotObservable.subscribe((value) => {
    console.log(`Suscriptor 2: ${value}`);
  });
}, 3000);

/*
En este ejemplo, utilizamos un Subject de RxJS como hot observable. Emitimos números cada segundo mediante hotObservable.next(count++). Cuando se suscribe el primer suscriptor, comienza a recibir los números en tiempo real. Después de 3 segundos, se suscribe un segundo suscriptor y también comienza a recibir los números desde ese punto en adelante.
*/
```

```javascript
// Ejemplo Cold Observable
import { Observable } from 'rxjs';

// Creamos un cold observable que emite números cuando hay un suscriptor
const coldObservable = new Observable<number>((observer) => {
  let count = 0;

  // Emitimos números cada 500 ms cuando hay un suscriptor
  const intervalId = setInterval(() => {
    observer.next(count++);
  }, 500);

  // Manejamos la limpieza cuando no hay suscriptores
  return () => {
    clearInterval(intervalId);
  };
});

// Suscripción 1 al cold observable
coldObservable.subscribe((value) => {
  console.log(`Suscriptor 1: ${value}`);
});

setTimeout(() => {
  // Suscripción 2 al cold observable después de 3 segundos
  coldObservable.subscribe((value) => {
    console.log(`Suscriptor 2: ${value}`);
  });
}, 3000);

/*
En este ejemplo, el cold observable emite números cada 500 ms solo cuando hay suscriptores presentes. Cuando se suscribe el primer suscriptor, comienza a recibir los números desde el principio. Después de 3 segundos, se suscribe un segundo suscriptor y también comienza a recibir los números desde el principio, pero con un desfase de tiempo respecto al primer suscriptor debido al intervalo de emisión de números.
*/

/*
Usamos Subject porque un Observable en RxJS no tiene la capacidad de emitir eventos de forma independiente sin suscriptores. Los observables comunes solo comienzan a emitir eventos cuando se suscriben a ellos.
*/
```