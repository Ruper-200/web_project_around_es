// Datos iniciales
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

// Elementos de tarjetas
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// Elementos del perfil
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const closeEditPopupButton = editPopup.querySelector(".popup__close");
const nameInput = editPopup.querySelector(".popup__input_type_name");
const descriptionInput = editPopup.querySelector(
  ".popup__input_type_description",
);
const profileSubmitButton = editPopup.querySelector(".popup__button");
const profileInputList = Array.from(
  editPopup.querySelectorAll(".popup__input"),
);

// Elementos del popup de imagen
const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const closeImagePopupButton = imagePopup.querySelector(".popup__close");

// Elementos del popup de nueva tarjeta
const addButton = document.querySelector(".profile__add-button");
const cardPopup = document.querySelector("#new-card-popup");
const closeCardPopupButton = cardPopup.querySelector(".popup__close");

// Formularios
let formElement = document.querySelector("#edit-profile-form");

// Funciones de modales
function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscKey);
  modal.addEventListener("click", handleOverlayClick);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKey);
  modal.removeEventListener("click", handleOverlayClick);
}

function handleEscKey(event) {
  if (event.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}

function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.target);
  }
}

// Funciones del perfil
function fillProfileForm() {
  nameInput.value = document.querySelector(".profile__title").textContent;
  descriptionInput.value = document.querySelector(
    ".profile__description",
  ).textContent;
}

function handleOpenEditPopup() {
  fillProfileForm();
  resetProfileValidation();
  openModal(editPopup);
}

function handleCloseEditPopup() {
  closeModal(editPopup);
}

function handleProfileFormSubmit(event) {
  event.preventDefault("submit");
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent =
    descriptionInput.value;
  closeModal(editPopup);
}

// Funciones de validación
function showInputError(inputElement) {
  const errorElement = editPopup.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = inputElement.validationMessage;
}

function hideInputError(inputElement) {
  const errorElement = editPopup.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
}

function checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(inputElement);
  } else {
    hideInputError(inputElement);
  }
}

function hasInvalidInput() {
  return profileInputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleProfileSubmitButton() {
  if (hasInvalidInput()) {
    profileSubmitButton.classList.add("popup__button_disabled");
    profileSubmitButton.disabled = true;
  } else {
    profileSubmitButton.classList.remove("popup__button_disabled");
    profileSubmitButton.disabled = false;
  }
}

function resetProfileValidation() {
  profileInputList.forEach((inputElement) => {
    hideInputError(inputElement);
  });
  toggleProfileSubmitButton();
}

function enableProfileValidation() {
  profileInputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement);
      toggleProfileSubmitButton();
    });
  });
  toggleProfileSubmitButton();
}

// Funciones de tarjetas.
function getCardElement(
  title = "Sin título",
  imageUrl = "./images/placeholder.jpg",
) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = title;
  cardImage.src = imageUrl;
  cardImage.alt = title;

  cardImage.addEventListener("click", () => {
    popupCaption.textContent = title;
    popupImage.src = imageUrl;
    popupImage.alt = title;
    openModal(imagePopup);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

function renderCard(title, imageUrl) {
  const cardElement = getCardElement(title, imageUrl);
  cardsContainer.appendChild(cardElement);
}

function handleCardFormSubmit() {
  const titleInput = document.querySelector(".popup__input_type_card-name");
  const imageUrlInput = document.querySelector(".popup__input_type_url");
  renderCard(titleInput.value, imageUrlInput.value);
  closeModal(cardPopup);
  titleInput.value = "";
  imageUrlInput.value = "";
}

// Eventos del perfil
editButton.addEventListener("click", handleOpenEditPopup);
closeEditPopupButton.addEventListener("click", handleCloseEditPopup);
formElement.addEventListener("submit", handleProfileFormSubmit);

// Eventos del popup de imagen
closeImagePopupButton.addEventListener("click", () => {
  closeModal(imagePopup);
});

// Eventos del popup de nueva tarjeta
closeCardPopupButton.addEventListener("click", () => {
  closeModal(cardPopup);
});

addButton.addEventListener("click", () => {
  openModal(cardPopup);
});

formElement = document.querySelector("#new-card-form");
formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  handleCardFormSubmit();
});

// Render inicial
initialCards.forEach((card) => {
  renderCard(card.name, card.link);
});

enableProfileValidation();
