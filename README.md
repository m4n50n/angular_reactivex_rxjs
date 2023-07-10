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
    - [of](#of)
    - [fromEvent](#fromevent)
    - [range](#range)
    - [interval](#interval)
    - [timer](#timer)
    - [asyncScheduler](#asyncscheduler)
  - [4: Operadores comunes](#4-operadores-comunes)
    - [map](#map)
    - [filter](#filter)
    - [tap](#tap)
    - [reduce](#reduce)
    - [scan](#scan)
  - [5: Operadores no tan comunes](#5-operadores-no-tan-comunes)
    - [take](#take)
    - [first](#first)
    - [takeWhile](#takewhile)
    - [takeUntil](#takeuntil)
    - [skip](#skip)
    - [distinct](#distinct)
    - [distinctUntilChanged](#distinctuntilchanged)
    - [distinctUntilKeyChanged](#distinctuntilkeychanged)
  - [6: Operadores que trabajan con tiempo](#6-operadores-que-trabajan-con-tiempo)
    - [debounceTime](#debouncetime)
    - [throttleTime](#throttletime)
    - [sampleTime](#sampletime)
  - [7: Recursos y documentación RxJS](#7-recursos-y-documentación-rxjs)
  - [8: Hot y Cold Observables](#8-hot-y-cold-observables)

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

### of

*Source*: https://rxjs.dev/api/index/function/of

- Función que permite crear observables en base a un listado de elementos (números o cualquier tipo de objeto)
- Lo importante es que of emitirá los valores en secuencia uno por uno de manera síncrona, y cuando termine, se completa el observable

```js
const observable$ = of<number[]>(1, 2, 3, 4, 5, 6).subscribe(...)
```

---

### fromEvent

*Source*: https://rxjs.dev/api/index/function/fromEvent

- Función que permite crear observables en base a un event target (es decir, de tipo Event)

```js
const observable$ = fromEvent<MouseEvent>(document, "click");.subscribe(...)
```

---

### range

*Source*: https://rxjs.dev/api/index/function/range

- Función que permite crear observables que emiten una secuencia de números en base a un rango específico
- Son síncronos pero pueden convertirse en asíncronos usando async scheduler
- El número inicial es 0 por defecto

```js
const observable$ = const src$ = range(-5, 10); // La salida de esto será "-5, -4, -3, -2, -1, 0, 1, 2, 3, 4"
// Es decir, recorre un rango de 10 elementos empezando desde el -5!!!
```

---

### interval

*Source*: https://rxjs.dev/api/index/function/interval

- Función que permite crear observables que se emiten en base al intervalo definido (si ponemos 2000, las emisiones se harían cada 2 segundos)
- Es un observable asíncrono por naturaleza
- **Importante**: Aunque cancelemos la suscripción, el intervalo seguirá corriendo
- El primer valor que emite interval es 0

```js
const interval$ = interval(1000); // (*) Mientras no exista un suscripción este observable no emitirá valores
// El intervalo empezará en 0 por defecto
```

---

### timer

*Source*: https://rxjs.dev/api/index/function/timer

- Función similar al interval
- Es un observable asíncrono por naturaleza
- Si establecemos timer(2000), diremos que después de 2 segundos emitirá el primer valor y se completará el observable y ya no se emitirán más valores

```js
const timer$ = timer(2000);

console.log("Inicio comprobar asincronía timer");
timer$.subscribe(observer); // Aquí se emitirá el complete porque este observable lo emite al acabar!
console.log("Fin comprobar asincronía timer");
```

---

### asyncScheduler

*Source*: https://rxjs.dev/api/index/const/asyncScheduler

- asyncScheduler no crea un observable, crea una SUSCRIPCIÓN (es decir, devuelve una suscripción), que es el producto de un subscribe (es decir, el punto subscribe de un observable) 

```js
const task = () => console.log('it works!');

asyncScheduler.schedule(task, 2000);
```

## 4: Operadores comunes

> ***RxJS*** proporciona una gran cantidad de operadores para manipular los datos emitidos desde un Observable y su flujo.

### map

*Source*: https://rxjs-dev.firebaseapp.com/api/operators/map

- Es el operador más común de todos y el que más se utiliza, ya que permite transformar lo que recibimos o lo que emite el observable en algo que necesitemos

```js
// Para trabajar con operadores pasaremos antes el método pipe
// Con <number, number> especificamos que la entrada es un number y la salida otro number
range(1, 5).pipe(map<number, string>((value) => (value * 10).toString())).subscribe(console.log);
```

---

### filter

*Source*: https://rxjs-dev.firebaseapp.com/api/operators/filter

- El operador filter sirve para filtrar las emisiones de los valores que emite el observable

```js
range(1, 10)
  .pipe(
    filter((value, index) => {
      console.log("El index es: ", index); // Aquí comprobamos que el index entra pero no es emitido
      return value % 2 === 1;
    })
  )
  .subscribe((val) => console.log("Valor recibido!!: ", val));
```

---

### tap

*Source*: https://rxjs-dev.firebaseapp.com/api/operators/tap

- Operador bastante utilizado porque ayuda mucho a ver cómo fluye la información dentro de los observables
- El principal uso del tap es disparar efectos secundarios (ya sea un console.log o disparar alguna acción cuando la información pase a través del observable) 
SIN MODIFICAR el flujo de datos
- El operador tap se utiliza comúnmente para depurar, registrar o realizar acciones adicionales en los datos que se emiten en un flujo de RxJs
- Hay que tener en cuenta que hay que hacerlo con cuidado para no disparar acciones sin querer
- Suele ser usado solo para propósitos de depuración y acciones secundarias
- NO DEBE USARSE para transformar datos (ya que para eso está map, filter o reduce)

```js
const numeros$ = range(1, 5);
numeros$
  .pipe(
    tap((x) => {
      console.log("tap antes de que se ejecute el subscribe", x);
      return 100;
    }),
    map((val) => val * 10),
    tap((x) => console.log("despues", x)),
    tap({ // Creamos un observer parcial
      next: valor => console.log("DESPUEESSSS", valor), // El next se ejecutará cada vez que el tap reciba el siguiente valor
      complete: () => console.log("Se terminó todo") // El complete se ejecutará cuando todo el observer se complete (POR ESO SIRVE PARA LA DEPURACIÓN)
    })
  )
  .subscribe((val) => console.log("subs", val));
```

---

### reduce

*Source*: https://rxjs-dev.firebaseapp.com/api/operators/reduce

- Hace lo mismo que el método reduce de JavaScript
- Lo que hace es aplicar una función acumuladora a las emisiones producidas por el observable

```js
interval(1000) // El primer valor que emite interval es 0
  .pipe(
    take(4), // Take COMPLETARÁ el observable después de la cantidad de veces que yo especifique dentro de el
    tap(console.log), // Debugeamos lo que fluye a través del observable en este instante
    reduce(totalReducer, 0) // No envio los paréntesis para no ejecutar la función en ese momento. El valor inicial será 0 (por defecto también)
  )
  .subscribe({
    next: (val) => console.log("next", val),
    complete: () => console.log("complete")
  });
```

---

### scan

*Source*: https://rxjs-dev.firebaseapp.com/api/operators/scan

- Es exactamente igual al operador reduce pero con una diferencia, y es que cuando los valores son emitidos por el observable, inmediatamente van saliendo conforme van ingresando pero regresa su valor acumulado

```js
const numbers = [1, 2, 3, 4, 5];
const totalReducer = (acumulador: number, valorActual: number) =>
  acumulador + valorActual;

// Reduce: tenemos una única emisión con el valor final
from(numbers)
  .pipe(reduce(totalReducer, 0))
  .subscribe((val) => console.log("Reduce val:", val));

// Scan: emite cada valor
from(numbers)
  .pipe(scan(totalReducer, 0))
  .subscribe((val) => console.log("Scan val:", val));
```

## 5: Operadores no tan comunes

### take

*Source*: https://rxjs-dev.firebaseapp.com/api/operators/take

- Sirve para limitar la cantidad de emisiones que un observable puede tener
- Si tengo take(2) se emitirá el primer valor, luego el segundo y justo después se completará la suscripción

```js
const numeros$ = of(1, 2, 3, 4, 5);
numeros$.pipe(
  tap(t => console.log(t)), // Con esto comprobamos que sólo emite 3 valores (correspondientes al take(3)) y que luego no sigue emitiendo los siguientes valores de la secuencia
  take(3)
)
.subscribe({
  next: (val) => console.log("next", val),
  complete: () => console.log("Completado"),
});
```

---

### first

*Source*: https://rxjs-dev.firebaseapp.com/api/operators/first

- Simplemente toma el primer valor y completa todo
- Si pongo first() se emitiría el primer valor y luego la suscripción se completaría y ya el observable no emitiría más
- Adicionalmente se le puede poner una condición para que se complete ÚNICAMENTE cuando se cumpla dicha condición:
  first(x => x >= 10)
- SI HAY UNA CONDICIÓN SOLO SE EMITE EL PRIMER VALOR QUE CUMPLE LA CONDICIÓN Y LUEGO SE COMPLETA LA EMISIÓN

```js
// Con esto solo se emitiría el primer click
const click$ = fromEvent<MouseEvent>(document, "click").pipe(first());
click$.subscribe({
  next: (val) => console.log("valor", val),
  complete: () => "completado",
});

const click1$ = fromEvent<MouseEvent>(document, "click").pipe(
  tap(console.log),
  first((event) => event.clientY > 150)
);
click1$.subscribe({
  next: (val) => console.log("valor click1", val),
  complete: () => "completado click1",
});
```

---

### takeWhile

*Source*: https://rxjs-dev.firebaseapp.com/api/operators/takeWhile

- Permite emitir valores mientras la condición se cumpla

```js
const click$ = fromEvent<MouseEvent>(document, "click").pipe(
  map(({ x, y }) => ({ x, y })),
  // takeWhile(({ y }) => y <= 150) // Cuando la condición se cumple emite el complete PERO no el elemento que "rompe" esa condición
  takeWhile(({ y }) => y <= 150, true) // Enviando true al parámetro "inclusive" hacemos que se devuelva ese elemento
);

click$.subscribe({
  next: (val) => console.log("next", val),
  complete: () => console.log("completado"),
});
```

---

### takeUntil

*Source*: https://rxjs-dev.firebaseapp.com/api/operators/takeUntil

- Es un operador que recibe como argumento otro Observable
- Se traduce a "emite valores hasta que el segundo Observable (el que se pasa como parámetro) emita su primer valor"

```js
// Creamos un botón para que emita un valor y podamos colocarle un valor
const boton = document.createElement("button");
boton.innerHTML = "Detener timer";
document.querySelector("body").append(boton);

const counter$ = interval(1000);
const clickBtn$ = fromEvent<MouseEvent>(boton, "click");

counter$.pipe(
  takeUntil(clickBtn$)
)
.subscribe({
  next: val => console.log("next", val),
  complete: () => console.log("Completado!!!") // El observable counter$ dejaría de emitir valores y se completaría en cuando se haga click en el botón y por lo tanto se emita su primer valor desdes el fromEvent
});
```

---

### skip

*Source*: https://rxjs-dev.firebaseapp.com/api/operators/skip

- Sirve para saltar / omitir X cantidad de emisiones INICIALES
- Si tenemos skip(3) el observable emitirá sólo a partir del cuarto valor (incluido)

```js
// Creamos un botón para que emita un valor y podamos colocarle un valor
const boton = document.createElement("button");
boton.innerHTML = "Detener timer";
document.querySelector("body").append(boton);

const counter$ = interval(1000);
const clickBtn$ = fromEvent<MouseEvent>(boton, "click").pipe(
  skip(2) // Esto saltaría el primer y segundo click y por lo tanto emitiría a partir del segundo click que es donde se completaría el takeUntil del observable counter$
)

counter$.pipe(
  takeUntil(clickBtn$)
)
.subscribe({
  next: val => console.log("next", val),
  complete: () => console.log("Completado!!!") // El observable counter$ dejaría de emitir valores y se completaría en cuando se haga click en el botón y por lo tanto se emita su primer valor desdes el fromEvent
});
```

---

### distinct

*Source*: https://rxjs-dev.firebaseapp.com/api/operators/distinct

- Únicamente deja pasar valores que no han sido previamente emitidos por el observable

```js
/** Ejercicio simple */
const numeros$ = of(1, 1, 2, 3, 4, 4, 5, 5, 5, 6, 7, 8);
numeros$.pipe(distinct()).subscribe(console.log); // Aquí se ve simple porque utiliza el parámetro de equidad ===, por lo que puede saber si un número es igual a otro número
// Con el parámetro de equidad === obviamente se entiende que distinct no considerará 1 igual a "1" puesto que uno es un número y otro un string y evaluamos tanto el valor como el tipo con ===

/** Ejercicio con objetos */
interface Personaje {
  nombre: string;
}

const personajes: Personaje[] = [
  { nombre: "Megaman" }, // El problema es que este objeto no es igual
  { nombre: "Batman" },
  { nombre: "Megaman" }, // A este objeto aunque los dos sean visualmente iguales, por lo que el parámetro de equidad aquí no nos serviría
  { nombre: "Joker" },
  { nombre: "Megaman" },
  { nombre: "Batman" },
];

// En este caso deberemos darle más información al distinct para que sepa comparar estos objetos

from(personajes)
  .pipe(distinct((personaje) => personaje.nombre)) // Con este predicado decimos al distinct qué tiene que comparar
  .subscribe(console.log);
```

---

### distinctUntilChanged

*Source*: https://rxjs-dev.firebaseapp.com/api/operators/distinctUntilChanged

- Similar a distinct() con la diferencia de que emite todos los valores siempre que la emisión ANTERIOR no sea la misma

```js
/** Ejercicio simple */
const numeros$ = of(1, 2, "2", 1, 2, 3, 4, 4, 5, 4, 5, 5, 6, 7, 8);
numeros$.pipe(distinctUntilChanged()).subscribe(console.log); // Aquí se ve simple porque utiliza el parámetro de equidad ===, por lo que puede saber si un número es igual a otro número

/** Ejercicio con objetos */
interface Personaje {
  nombre: string;
}

const personajes: Personaje[] = [
  { nombre: "Megaman" }, // El problema es que este objeto no es igual
  { nombre: "Megaman" }, // A este objeto aunque los dos sean visualmente iguales, por lo que el parámetro de equidad aquí no nos serviría
  { nombre: "Batman" },  
  { nombre: "Joker" },
  { nombre: "Megaman" },
  { nombre: "Batman" },
];

// En este caso deberemos darle más información al distinctUntilChanged para que sepa comparar estos objetos

from(personajes)
  // Con este predicado decimos al distinctUntilChanged qué tiene que comparar
  // La condición es que el predicado debe retornar un booleano, por lo que si es true lo que retorna, se considerarán iguales y por lo tanto el valor no se emitirá
  .pipe(distinctUntilChanged((anterior, actual) => anterior.nombre === actual.nombre)) 
  .subscribe(console.log);
```

---

### distinctUntilKeyChanged

*Source*: https://rxjs-dev.firebaseapp.com/api/operators/distinctUntilKeyChanged

- Es el mismo concepto que distinctUntilChanged pero pasándole directamente la key que queremos que compruebe y así no hay que pasar ningún predicado al método

```js
/** Ejercicio con objetos */
interface Personaje {
  nombre: string;
}

const personajes: Personaje[] = [
  { nombre: "Megaman" }, // El problema es que este objeto no es igual
  { nombre: "Megaman" }, // A este objeto aunque los dos sean visualmente iguales, por lo que el parámetro de equidad aquí no nos serviría
  { nombre: "Batman" },  
  { nombre: "Joker" },
  { nombre: "Megaman" },
  { nombre: "Batman" },
];

// En este caso NO deberemos darle más información al distinctUntilKeyChanged para que sepa comparar estos objetos, sino que sólo le daremos la key que queremos que evalúe

from(personajes)  
  .pipe(distinctUntilKeyChanged("nombre")) 
  .subscribe(console.log);
```

## 6: Operadores que trabajan con tiempo

### debounceTime

*Source*: https://rxjs-dev.firebaseapp.com/api/operators/debounceTime

- Trabaja en base a intervalos de tiempo
- Ayuda a contar las milésimas de segundo que han pasado desde la última emisión
- Si esa milésima de segundo sobrepasa el parámetro que tenemos en los paréntesis entonces emitirá dicho valor

```js
const click$ = fromEvent<MouseEvent>(document, "click");

click$.pipe(
    // Si empiezo a hacer clicks se emitirá un valor 3 segundos después de haber hecho el último click, antes no
    // Si tuviera una búsqueda onkeyup, se emitirá el valor si transcurren 3 segundos sin que se haga ningún keyup
    // Por lo tanto, después de los 3 segundos se hará solamente UNA emisión
    debounceTime(3000) 
).subscribe(console.log);

// Ejemplo 2
const input = document.createElement("input");
document.querySelector("body").append(input);

const input$ = fromEvent(input, "keyup");
input$.pipe(
    debounceTime(1000),
    distinctUntilChanged() // Con esto controlamos además que la emisión se haga siempre que el valor no sea el mismo que el valor de la emisión anterior
).subscribe(console.log);
```

---

### throttleTime

*Source*: https://rxjs-dev.firebaseapp.com/api/operators/throttleTime

- Permite limitar la frecuencia de emisión de valores de un observable y asegurar que solo se emita el último valor dentro de un intervalo de tiempo determinado
- Al emitirse el primer valor, empieza a contar los milisegundos definidos, y tras terminar, volverá a emitir el siguiente
- Si se emiten valores durante ese "conteo", los valores no serán emitidos

```js
click$.pipe(
    // Si hago un click se emitirá y empezará el conteo de 3 segundos
    // Durante el conteo no se emitirá ningún valor y el siguiente valor se emitirá tras el conteo
    throttleTime(3000) 
).subscribe(console.log);
```

---

### sampleTime

*Source*: https://rxjs-dev.firebaseapp.com/api/operators/sampleTime

- Se utiliza para obtener una muestra periódica de los valores emitidos por un observable a intervalos regulares de tiempo. Básicamente, te permite capturar el último valor emitido dentro de un intervalo de tiempo predefinido

```js
// Crea un observable que emite un valor cada 500 milisegundos
const observable = interval(500);

// Aplica sampleTime para obtener una muestra cada 2 segundos
const sampledObservable = observable.pipe(sampleTime(2000));

// Suscríbete al sampledObservable para recibir las muestras
sampledObservable.subscribe(value => console.log(value));
```

---

## 7: Recursos y documentación RxJS

* [RxJS Github](https://github.com/ReactiveX/rxjs)
* [RxMarbles](http://rxmarbles.com/)
* [RxVision Playground](http://jaredforsyth.com/rxvision/examples/playground/)

## 8: Hot y Cold Observables

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