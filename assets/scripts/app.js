const addMovieModal = document.getElementById("add-modal");

const selectMovieButton = document.querySelector("header button");

const selectBackdrop = document.getElementById("backdrop");

const selectCancelButton = document.querySelector(".btn--passive");

const selectAddButton = selectCancelButton.nextElementSibling;

const userInputs = addMovieModal.querySelectorAll("input");

const selectEntryText = document.getElementById("entry-text");

const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

const toggleBackdrop = () => {
  selectBackdrop.classList.toggle("visible");
};

const closeModalHandler = () => {
  addMovieModal.classList.remove("visible");
};

const showModalHandler = () => {
  addMovieModal.classList.add("visible");
  toggleBackdrop();
};

const backdropHandler = () => {
  closeModalHandler();
  cancelMovieDeletion();
  clearModal();
};

const clearModal = () => {
  for (const inpt of userInputs) {
    inpt.value = "";
  }
};

const updateUI = () => {
  if (movies.length === 0) {
    selectEntryText.style.display = "block";
  } else {
    selectEntryText.style.display = "none";
  }
};

const cancelButtonHandler = () => {
  closeModalHandler();
  toggleBackdrop();
  clearModal();
};

const deleteMovie = (movieId) => {
  let counter = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    counter++;
  }
  movies.splice(counter, 1);
  const showList = document.getElementById("movie-list");
  showList.children[counter].remove();
  // showList.removeChild(showList.children[movieId]);
  cancelMovieDeletion();
  updateUI();
};

const cancelMovieDeletion = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove("visible");
};

const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add("visible");
  toggleBackdrop();

  const cancelButtonClick = deleteMovieModal.querySelector(".btn--passive");
  // Workaround for Multiple Event Listeners in the list item which was causing errors.
  let addButtonClick = deleteMovieModal.querySelector(".btn--danger");

  addButtonClick.replaceWith(addButtonClick.cloneNode(true));

  addButtonClick = deleteMovieModal.querySelector(".btn--danger");

  cancelButtonClick.removeEventListener("click", cancelMovieDeletion);

  cancelButtonClick.addEventListener("click", cancelMovieDeletion);
  addButtonClick.addEventListener("click", deleteMovie.bind(null, movieId));
};

const showMovieItems = (id, title, image, rating) => {
  const newLi = document.createElement("li");
  newLi.className = "movie-element";
  newLi.innerHTML = `
  <div class='movie-element__image'>
    <img src="${image}" alt="${title}">
  </div>
  <div class='movie-element__info'>
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
  </div>
  `;
  newLi.addEventListener("click", deleteMovieHandler.bind(null, id));
  const showList = document.getElementById("movie-list");
  showList.append(newLi);
};

const addButtonHandler = () => {
  const title = userInputs[0].value;
  const imageURL = userInputs[1].value;
  const rating = userInputs[2].value;

  if (
    title.trim() === "" ||
    imageURL.trim() === "" ||
    rating.trim() === "" ||
    parseInt.rating > 5
  ) {
    alert("Please enter a valid value!");
    return;
  }

  userInput = {
    id: Math.random().toString(),
    title: title,
    image: imageURL,
    rating: rating,
  };

  movies.push(userInput);
  console.log(movies);
  updateUI();
  closeModalHandler();
  toggleBackdrop();
  clearModal();
  showMovieItems(
    userInput.id,
    userInput.title,
    userInput.image,
    userInput.rating
  );
};

selectMovieButton.addEventListener("click", showModalHandler);
selectBackdrop.addEventListener("click", backdropHandler);
selectCancelButton.addEventListener("click", cancelButtonHandler);
selectAddButton.addEventListener("click", addButtonHandler);
