# ReactiveX - RxJs - De cero hasta los detalles

Piezas fundamentales de la programamción reactiva:

* ***Observables***:
  * La pieza principal en la programación reactiva
  * Son la fuente de información
  * Pueden emitir múltiples valores, sólo uno o ninguno
  * Pueden emitir errores
  * Pueden ser infinitos o finitos
  * Pueden ser síncronos o asíncronos

- Un Observable en RxJS es una fuente de datos que emite eventos o valores a lo largo del tiempo.
- Un Observable puede tener cero, uno o muchos valores y puede terminar (completarse) o no. 
- Puede emitir valores síncrona o asincrónicamente y permite a los suscriptores registrarse para recibir estos valores o eventos.

*** **Funciones para crear Observables**
No crearemos observables manualmente, sino que usaremos funciones de RxJs para crearlos.

* ***Subscribers***:
  * <u>Se subscriben a un observable</u>. Es decir, estar pendiente de lo que realiza el observable
  * Consumen / Observan la data del observable
  * Pueden recibir los errores y eventos del observable
  * Desconocen todo lo que se encuentra detrás del observable

* ***Operadores***:
  * Usados para **transformar** observables (map, groups, scan ...)
  * Usados para **filtrar** observables (filter, distinct, skip, debounce ... )
  * Son usados para **combinar** observables
  * Usados para **crear** nuevos observables

*** Un Observable es el que emite todo el flujo de información, y el procedimiento de recibir todas estas cantidades de información y únicamente coger lo que nos interesa es el concepto de operador. El operador es una función que <u>se une a un observable</u> y *sirve procesar los datos que dicho observable emite*. También se pueden conectar múltiples operadores.

*** La idea de los operadores es que ya tengamos todos los métodos para procesar la información que emite un observable.

*** Podemos encadenar operadores dentro de un pipe (separando los operadores con comas) y se respetará el orden en el que se encadenen (de arriba hacia abajo).

*** Para trabajar con operadores pasaremos antes el método ***pipe***.

## Beneficios de la programación reactiva

1. Obtener información en tiempo real
2. Evitar el "Callback Hell" (tener callbacks anidados básicamente)
3. Trabajar de forma simple tareas síncronas y asíncronas
4. Uso de operadores para reducir y simplificar el trabajo
5. Es fácil transformar los flujos (streams) de información
6. Código más limpio y fácil de leer
7. Fácil de implementar
8. Fácil anexar procedimientos sin alterar el producto final

## ReactiveX
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
