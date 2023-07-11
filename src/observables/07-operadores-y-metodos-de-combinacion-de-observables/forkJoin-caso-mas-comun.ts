import { catchError, forkJoin, of } from "rxjs";
import { ajax } from "rxjs/ajax";

// El caso más común con forkJoin es realizar peticiones ajax de manera simultánea

const GITHUB_API_URL = "https://api.github.com/users";
const GITHUB_USER = "m4n50n";

// En este caso las tres peticiones funcionan (es decir, las url son correctas)
forkJoin({
  usuario: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}`),
  repos: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/reposd`),
  gists: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/gists`),
}).subscribe(console.log); // Se realizarán las tres peticiones de manera simultánea y cuando se terminen se emitirán al subscriber

// En este caso, la segunda url es incorrecta y devuelve un error, el cual podemos controlar con un pipe en el forkJoin
forkJoin({
  usuario: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}`),
  repos: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/reposd`),
  gists: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/gists`),
})
  .pipe(catchError((err) => of(err)))
  .subscribe(console.log);

// (*) El problema, es que aunque la peticion a "/reposd" falle, las demás peticiones sí que se realizan, pero no se emiten

// En este caso, lo mejor es hacer esto
forkJoin({
  usuario: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}`),
  repos: ajax
    .getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/reposd`)
    .pipe(catchError((err) => of([]))),
  gists: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/gists`),
}).subscribe(console.log);

// De esta forma, si establecemos el pipe por cada peticion, se emitirán las peticiones correctas y las incorrectas aparecerán como un array vacio o como nosotros definamos
