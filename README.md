# Evaluación final modulo 2 Adalab

## Guía de inicio rápido

> **NOTA:** Necesitas tener instalado [Node JS](https://nodejs.org/) para trabajar con este Starter Kit:

### Pasos a seguir cada vez que queremos arrancar un proyecto desde cero:

1. **Crea tu propio repositorio.**
1. Descarga este el proyecto desde GitHub.
   - No recomendamos que clones este repo ya que no podrás añadir commits.
1. **Copia todos los ficheros** de este en la carpeta raíz de tu repositorio.
   - Recuerda que debes copiar **también los ficheros ocultos**.
   - Si has decidido clonar este repo, no debes copiar la carpeta `.git`. Si lo haces estarás machacando tu propio repositorio.
1. **Abre una terminal** en la carpeta raíz de tu repositorio.
1. **Instala las dependencias** locales ejecutando en la terminal el comando:

```bash
npm install
```

### Pasos para arrancar el proyecto:

Una vez hemos instalado las dependencias, vamos a arrancar el proyecto. **El proyecto hay que arrancarlo cada vez que te pongas a programar.** Para ello ejecuta el comando:

```bash
npm start
```

Este comando:

- **Abre una ventana de Chrome y muestra tu página web**, al igual que hace el plugin de VS Code Live Server (Go live).
- También **observa** todos los ficheros que hay dentro de la carpeta `src/`, para que cada vez que modifiques un fichero **refresca tu página en Chrome**.
- También **procesa los ficheros** HTML, SASS / CSS y JS y los **genera y guarda en la carpeta `public/`**. Por ejemplo:
  - Convierte los ficheros SASS en CSS.
  - Combina los diferentes ficheros de HTML y los agrupa en uno o varios ficheros HTML.

Después de ejecutar `npm start` ya puedes empezar a editar todos los ficheros que están dentro de la carpeta `src/` y programar cómodamente.

Enjoy!! :)

En está evaluación final nos piden desarrollar una aplicación web que contiene un listado de las bebidas y cócteles de
todo el mundo, que nos permite des/marcar las bebidas como favoritas y guardarlas en local storage.
El ejercicio también tiene una parte de maquetación con HTML y Sass.

## Los requisitos que nos piden son:

1.  En primer lugar hay que realizar una estructura básica.
2.  Busqueda :

        Al hacer clic sobre el botón de Buscar, la aplicación debe conectarse al API abierto de
        TheCocktailDB. Os recomendamos echar un vistazo al JSON que devuelve una petición de búsqueda
        para ver qué datos son los que necesitamos:
        https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
        Para construir la URL de búsqueda hay que recoger el texto que ha introducido la usuaria en el
        campo de búsqueda.

        Por cada cóctel contenido en el resultado de la búsqueda hay que pintar una tarjeta donde
        mostramos una imagen del cóctel y el nombre.
        Algunas de los cócteles que devuelve el API no tienen imagen.
        En ese caso hay que mostrar una
        imagen de relleno. Podemos crear una imagen de relleno con el servicio de placeholder.com donde
        en la propia URL indicamos el tamaño, colores, texto:
        https://via.placeholder.com/210x295/ffffff/666666/?text=TV
        Para pintar la información en la página se puede elegir entre hacerlo de forma básica con innerHTML
        o manipulando de forma avanzada el DOM.

3.  Favoritos:

        Una vez aparecen los resultados de búsqueda, la usuaria puede indicar cuáles son nuestros cócteles
        favoritos. Para ello, al hacer clic sobre una cóctel debe pasar lo siguiente:
        El color de fondo y el de fuente se intercambian, indicando que es un cóctel favorito.
        Hay que mostrar un listado en la parte izquierda de la pantalla, debajo del formulario de búsqueda,
        con los cócteles favoritos.

        Los cócteles favoritos deben seguir apareciendo a la izquierda aunque la usuaria realice otra
        búsqueda.

4.  Almacenamiento local:

        Hay que almacenar el listado de favoritos en el localStorage. De esta forma, al recargar la página el listado
        de favoritos se debe mostrarse.

5.  BONUS: Borrar favoritos:

        Como bonus, os proponemos la opción de borrar favoritos. Al hacer clic sobre el icono de una 'x' al lado de
        cada favorito, hay que borrar el favorito clicado de la lista y del localStorage.
        Para terminar de rematar nuestra app de cócteles, nos gustaría poder añadir/quitar como favorito al hacer
        clic sobre un cóctel del lado de la derecha. Y que, si realizamos una nueva búsqueda y sale un cóctel que ya es favorita,
        aparezca ya resaltada en los resultados de búsqueda (con colores de fondo y texto intercambiados).
        Y ya sería fantástico si al final de la lista de favoritos hay un botón para borrarlos todos los favoritos a la vez.

6.  BONUS: Afinar la maquetación

        Una vez terminada la parte de interacción, podemos centrarnos en la parte de maquetación donde tenéis
        libertad para decidir los estilo. En cualquier caso os dejamos una propuesta gráfica.

## Authors

- [@gloriarodrife](https://www.github.com/gloriarodrife)
