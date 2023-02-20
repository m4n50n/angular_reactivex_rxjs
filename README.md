# ReactiveX - RxJs - De cero hasta los detalles

Observables, subscribers, operadores y programación reactiva.

* Observables:
  * Son la fuente de información
  * Pueden emitir múltiples valores, sólo uno o ninguno
  * Pueden emitir errores
  * Pueden ser infinitos o finitos
  * Pueden ser síncronos o asíncronos

* Subscribers:
  * Se subscriben a un observable. Es decir, estar pendiente de lo que realiza el observable
  * Consumen / Observan la data del observable
  * Pueden recibir los errores y eventos del observable
  * Desconocen todo lo que se encuentra detrás del observable

* Operadores:
  * Usados para **transformar** los Observables (map, groups, scan ...)
  * Usados para **filtrar** obserfables (filter, distinct, skip, debounce ... )
  * Son usados para **combinar** observables
  * Usados para **crear** nuevos observables

## Beneficios de la programación reactiva

1. Evitar el "Callback Hell"
2. Trabajar de forma simple tareas síncronas y asíncronas
3. Uso de operadores para reducir y simplificar el trabajo
4. Es fácil transformar los flujos (streams) de información
5. Código más limpio y fácil de leer
6. Fácil de implementar
7. Fácil anexar procedimientos sin alterar el producto final

## ReactiveX
El ***patrón Observer*** es un patrón de diseño de software que define una dependencia del tipo uno a muchos entre objetos, de manera que cuando uno de los objetos cambia su estado, notifica este cambio a todos los dependientes.

Por ejemplo, un semáforo sería un Observer y los coches los elementos suscritos. Si el semáforo está en rojo y cambia su color a verde, los coches serían notificados, seguirían su camino y cancelarían la suscripción a ese semáforo, pero el semáforo podrá seguir emitiendo valores por un tiempo indefinido.

<u>En conclusión</u>: Notificar cuando suceden cambios.

El ***Patrón Iterador*** define una interfaz que declara los métodos necesarios para acceder secuencialmente a un grupo de objetos de una colección.

Es decir, nosotros crearíamos funciones o métodos que nos permitan saber cual es el primer elemento, cual el siguiente, cual el actual y si hay más.

<u>En conclusión</u>: Poder ejecutar operaciones secuenciales.

La ***Programación Funcional*** es crear un conunto de funciones que tengan un objetivo específico. Es decir, si tengo una función que reciba "A", y retorna "A + 1", siempre que yo llame a esa función retornará "A + 1". Sin efectos secundarios y sin mutar la data.

<u>En conclusión</u>: Tener funciones con tareas específicas que reciban argumentos y no muten la información.
