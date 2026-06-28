import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { defaultFormConfig } from "../utils/constants.js";
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
        name: "Montanas Calvas",
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
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const editProfileForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__description",
});
const imagePopup = new PopupWithImage("#image-popup");
const createCard = (cardData) => new Card(cardData, "#card-template", (selectedCard) => {
    imagePopup.open(selectedCard);
}).generateCard();
let cardSection;
cardSection = new Section({
    items: initialCards,
    renderer: (cardData) => cardSection.addItem(createCard(cardData)),
}, ".cards__list");
let editProfilePopup;
editProfilePopup = new PopupWithForm("#edit-popup", (values) => {
    userInfo.setUserInfo({
        name: values.name,
        job: values.description,
    });
    editProfilePopup.close();
});
let newCardPopup;
newCardPopup = new PopupWithForm("#new-card-popup", (values) => {
    cardSection.addItem(createCard({
        name: values["place-name"],
        link: values.link,
    }));
    newCardPopup.close();
});
const editProfileFormValidator = new FormValidator(defaultFormConfig, editProfileForm);
const newCardFormValidator = new FormValidator(defaultFormConfig, newCardForm);
editButton.addEventListener("click", () => {
    const currentUser = userInfo.getUserInfo();
    nameInput.value = currentUser.name;
    descriptionInput.value = currentUser.job;
    editProfileFormValidator.resetValidation();
    editProfilePopup.open();
});
addButton.addEventListener("click", () => {
    newCardFormValidator.resetValidation();
    newCardPopup.open();
});
imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
newCardPopup.setEventListeners();
editProfileFormValidator.enableValidation();
newCardFormValidator.enableValidation();
cardSection.renderItems();
