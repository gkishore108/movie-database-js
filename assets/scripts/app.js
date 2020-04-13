const addMovieModal = document.getElementById("add-modal");

const selectMovieButton = document.querySelector("header button");

const selectBackdrop = document.getElementById("backdrop");

const selectCancelButton = document.querySelector(".btn--passive");

const selectAddButton = selectCancelButton.nextElementSibling;

const userInputs = addMovieModal.querySelectorAll("input");

const selectEntryText = document.getElementById("entry-text");

const movies = [];

const toggleBackdrop = () => {
  selectBackdrop.classList.toggle("visible");
};

const showModalHandler = () => {
  addMovieModal.classList.toggle("visible");
  toggleBackdrop();
};

const backdropHandler = () => {
  showModalHandler();
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
  showModalHandler();
  clearModal();
};

const showMovieItems = (title, image, rating) => {
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
    title: title,
    image: imageURL,
    rating: rating,
  };

  movies.push(userInput);
  console.log(movies);
  updateUI();
  clearModal();
  showModalHandler();
  showMovieItems(userInput.title, userInput.image, userInput.rating);
};

selectMovieButton.addEventListener("click", showModalHandler);
selectBackdrop.addEventListener("click", backdropHandler);
selectCancelButton.addEventListener("click", cancelButtonHandler);
selectAddButton.addEventListener("click", addButtonHandler);
