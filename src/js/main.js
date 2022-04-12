const form = document.getElementById('form');
const inputSearch = document.getElementById('search');
const bookmarkList = document.getElementById('bookmarks');
const drinksList = document.getElementById('list');
const buttonFav = document.getElementById('button');
const buttonLog = document.getElementById('buttonlog');

const API_URL = 'https://www.thecocktaildb.com';

let bookmarks = [];

async function searchDrinks(search) {
  const response = await fetch(
    `${API_URL}/api/json/v1/1/search.php?s=${search}`
  );
  const data = await response.json();

  return data.drinks;
}

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

    if (searchValue === '') {
      const messageResults = document.createElement('p');
      messageResults.classList.add('message_results');
      const textResults = document.createTextNode(
        'Introduce algún valor para la busqueda'
      );
      messageResults.appendChild(textResults);
      drinksList.appendChild(messageResults);
    } else {
      const drinks = await searchDrinks(searchValue);
      // Recorro la lista
      if (drinks === null) {
        const messageResults = document.createElement('p');
        messageResults.classList.add('message_results');
        const textResults = document.createTextNode(
          'No se han obtenido resultados'
        );
        messageResults.appendChild(textResults);
        drinksList.appendChild(messageResults);
        // drinksList.innerHTML = 'No hay conincidencias';
      } else {
        listDrinks(drinks);
      }
    }
  });

  form.addEventListener('reset', (event) => {
    event.preventDefault();

    inputSearch.value = '';
    drinksList.innerHTML = '';
  });
}

function renderBookmarks() {
  bookmarkList.innerHTML = '';

  for (const bookmark of bookmarks) {
    const li = createListItem(bookmark);

    const button = document.createElement('button');
    const buttonText = document.createTextNode('x');
    button.appendChild(buttonText);

    li.appendChild(button);
    bookmarkList.appendChild(li);

    button.addEventListener('click', () => {
      const index = bookmarks.findIndex(
        (item) => item.idDrink === bookmark.idDrink
      );

      bookmarks.splice(index, 1);

      const bookmarkElement = document.getElementById(bookmark.idDrink);
      if (bookmarkElement) {
        bookmarkElement.classList.remove('highlight');
      }

      // Modificar el inner html (reenderizar bookmarks)
      renderBookmarks();

      // Guardar en el local storage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    });

    buttonFav.addEventListener('click', () => {
      bookmarks = [];
      bookmarkList.innerHTML = '';
      const index = bookmarks.findIndex(
        (item) => item.idDrink === bookmark.idDrink
      );

      bookmarks.splice(index, 1);

      const bookmarkElement = document.getElementById(bookmark.idDrink);
      if (bookmarkElement) {
        bookmarkElement.classList.remove('highlight');
      }

      renderBookmarks();

      localStorage.removeItem('bookmarks');
    });

    buttonLog.addEventListener('click', () => {
      const favoritos = bookmarks.length;
      console.log(`Tienes ${favoritos}`);
    });
  }
}

// Función que crea los elementos
function listDrinks(listDrinks) {
  for (const item of listDrinks) {
    const liDetail = createListItem(item);

    liDetail.setAttribute('id', item.idDrink);

    // comprobar si estan en bookmaks
    const itemExist = bookmarks.find(
      (element) => element.idDrink === item.idDrink
    );
    if (itemExist) {
      liDetail.classList.add('highlight');
    }

    drinksList.appendChild(liDetail);

    // Evento clik de cada item de la lista de busqueda
    liDetail.addEventListener('click', (e) => {
      e.preventDefault();

      const itemExist = bookmarks.find(
        (element) => element.idDrink === item.idDrink
      );
      // Si el item no esta en la lista de favoritos, lo añado
      if (!itemExist) {
        liDetail.classList.add('highlight');

        bookmarks.push(item);
        // Meto en el local todas mis bebidas favoritas
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        renderBookmarks();
      }
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

  if (item.strIngredient4 === null) {
    const listIngredients = document.createElement('ul');
    const ingredient1 = document.createElement('li');
    ingredient1.innerText = item.strIngredient1;

    const ingredient2 = document.createElement('li');
    ingredient2.innerText = item.strIngredient2;

    const ingredient3 = document.createElement('li');
    ingredient3.innerText = item.strIngredient3;

    listIngredients.appendChild(ingredient1);
    listIngredients.appendChild(ingredient2);

    listIngredients.appendChild(ingredient3);

    liDetail.appendChild(listIngredients);
  } else {
    const listIngredients = document.createElement('ul');
    const ingredient1 = document.createElement('li');
    ingredient1.innerText = item.strIngredient1;

    const ingredient2 = document.createElement('li');
    ingredient2.innerText = item.strIngredient2;

    const ingredient3 = document.createElement('li');
    ingredient3.innerText = item.strIngredient3;

    const ingredient4 = document.createElement('li');
    ingredient4.innerText = item.strIngredient4;

    listIngredients.appendChild(ingredient1);
    listIngredients.appendChild(ingredient2);

    listIngredients.appendChild(ingredient3);
    listIngredients.appendChild(ingredient4);

    liDetail.appendChild(listIngredients);
  }

  return liDetail;
}

initApp();
