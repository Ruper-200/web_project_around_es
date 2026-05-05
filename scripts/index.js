const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];
initialCards.forEach((card) => {
  console.log(card.name);
});

////////////////////////////////////////////////////////////////////
// Proyecto de sprint 6: Etapa 2. Perfil modal

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const closeEditPopupButton = editPopup.querySelector(".popup__close");
const nameInput = editPopup.querySelector(".popup__input_type_name");
const descriptionInput = editPopup.querySelector(
  ".popup__input_type_description",
);

function fillProfileForm() {
  nameInput.value = document.querySelector(".profile__title").textContent;
  descriptionInput.value = document.querySelector(
    ".profile__description",
  ).textContent;
}

function handleOpenEditPopup() {
  fillProfileForm();
  editPopup.classList.add("popup_is-opened");
}

editButton.addEventListener("click", handleOpenEditPopup);

let formElement = document.querySelector("#edit-profile-form");

function handleProfileFormSubmit(event) {
  event.preventDefault();
  let nameInput = document.querySelector(".popup__input_type_name");
  let descriptionInput = document.querySelector(
    ".popup__input_type_description",
  );
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent =
    descriptionInput.value;
  editPopup.classList.remove("popup_is-opened");
}

formElement.addEventListener("submit", handleProfileFormSubmit);

closeEditPopupButton.addEventListener("click", function () {
  editPopup.classList.remove("popup_is-opened");
});

//muchas gracias por la revisión y los comentarios.
