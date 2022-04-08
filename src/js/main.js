const form = document.getElementById('form');
const inputSearch = document.getElementById('search');
const bookmarkList = document.getElementById('bookmarks');
const drinksList = document.getElementById('list');

const API_URL = 'https://www.thecocktaildb.com';

let bookmarks = [];

async function searchDrinks(search) {
  const response = await fetch(
    `${API_URL}/api/json/v1/1/search.php?s=${search}`
  );
  const data = await response.json();

  return data.drinks;
}

searchDrinks();
function initApp() {
  // cache crudo
  const cacheRaw = localStorage.getItem('bookmarks');
  // si el cache no es nulo pintame lo que hay en favoritos
  if (cacheRaw !== null) {
    const cache = JSON.parse(cacheRaw);
    bookmarks = cache;
    renderBookmarks();
  }

  // sumbit y reset solo lo tienen los formularios
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    drinksList.innerHTML = '';
    const searchValue = inputSearch.value;
    const drinks = await searchDrinks(searchValue);
    // Recorro la lista
    listDrinks(drinks);
  });

  clearBookmarks();
}
function renderBookmarks() {
  for (const bookmark of bookmarks) {
    const li = createListItem(bookmark);

    const idBookmarkElement = document.getElementById(bookmark.idDrink);

    const button = document.createElement('button');
    const buttonText = document.createTextNode('x');
    button.appendChild(buttonText);

    button.setAttribute('id', bookmark.idDrink);

    li.setAttribute('id', bookmark.idDrink);

    li.appendChild(button);
    bookmarkList.appendChild(li);

    button.addEventListener('click', () => {
      idBookmarkElement.removeAttribute('style');

      const idBookmark = document.getElementById(bookmark.idDrink);

      const index = bookmarks.findIndex(
        (item) => item.idDrink === idBookmark.id
      );

      // console.log(idBookmark);

      // Elimino item
      bookmarks.splice(index, 1);
      bookmarkList.innerHTML = '';
      // Modificar el inner html (reenderizar bookmarks)
      renderBookmarks();

      // Guardar en el local storage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    });
  }
}

function clearBookmarks() {
  form.addEventListener('reset', (event) => {
    event.preventDefault();

    bookmarkList.innerHTML = '';
    drinksList.innerHTML = '';
    bookmarks = [];

    //Elimino mis datos del local
    localStorage.removeItem('bookmarks');
  });
}
// Función que crea los elementos
function listDrinks(listDrinks) {
  for (const item of listDrinks) {
    const liDetail = createListItem(item);

    // comprobar si estan en bookmaks
    const itemExist = bookmarks.find(
      (element) => element.idDrink === item.idDrink
    );
    if (itemExist) {
      liDetail.style.border = '2px solid #f8b5d6';
      liDetail.style.fontStyle = 'Italic';
    }
    //Agrego id al item

    liDetail.setAttribute('id', item.idDrink);

    drinksList.appendChild(liDetail);

    // Evento clik de cada item de la lista de busqueda
    liDetail.addEventListener('click', (e) => {
      e.preventDefault();
      // Si el item no esta en la lista de favoritos, lo añado
      const itemExist = bookmarks.find(
        (element) => element.idDrink === item.idDrink
      );
      if (!itemExist) {
        liDetail.style.border = '2px solid #f8b5d6';
        liDetail.style.fontStyle = 'Italic';
        bookmarks.push(item);
        // Meto en el local todas mis bebidas favoritas
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      }
      // limpiamos la lista para evitar que pinte duplicasdos los elementos
      bookmarkList.innerHTML = '';
      renderBookmarks();
    });
  }
}

function createListItem(item) {
  const liDetail = document.createElement('li');

  const nameElement = document.createElement('p');

  nameElement.innerText = item.strDrink;
  liDetail.appendChild(nameElement);

  // Si el elemento no tiene imagen, agrego una por defecto
  if (item) {
    const img = document.createElement('img');
    img.src = item.strDrinkThumb || item.strDrinkThumb;
    liDetail.appendChild(img);
  } else {
    const img = document.createElement('img');
    img.src = `./assets/images/images.jpeg`;
    liDetail.appendChild(img);
  }

  return liDetail;
}

initApp();
