var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { defaultFormConfig } from "../utils/constants.js";
import { Api } from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
const api = new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
        authorization: "3636b31b-1450-4ffd-abc5-23c5322623e2",
        "Content-Type": "application/json",
    },
});
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const editProfileForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");
const avatarEditButton = document.querySelector(".profile__avatar-edit-button");
const avatarEditForm = document.querySelector("#edit-avatar-form");
const avatarEditPopup = new PopupWithForm("#avatar-popup", (values) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUserData = yield api.updateAvatar({
        avatar: values.avatar,
    });
    userInfo.setUserInfo(Object.assign(Object.assign({}, userInfo.getUserInfo()), { avatar: updatedUserData.avatar }));
    avatarEditPopup.close();
}));
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__description",
    avatarSelector: ".profile__image",
});
const imagePopup = new PopupWithImage("#image-popup");
const deleteConfirmationPopup = new PopupWithConfirmation("#delete-confirmation-popup", () => __awaiter(void 0, void 0, void 0, function* () { }));
const createCard = (cardData, userId) => {
    const isOwner = cardData.owner === userId;
    const card = new Card(cardData, "#card-template", (selectedCard) => {
        imagePopup.open(selectedCard);
    }, (cardId) => {
        deleteConfirmationPopup.setSubmitAction(() => __awaiter(void 0, void 0, void 0, function* () {
            yield api.deleteCard(cardId);
            card.deleteCard();
        }));
        deleteConfirmationPopup.open();
    }, (cardId, isLiked) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let updatedCard;
            if (isLiked) {
                updatedCard = yield api.unlikeCard(cardId);
            }
            else {
                updatedCard = yield api.likeCard(cardId);
            }
            card.setLikeState(updatedCard.isLiked);
        }
        catch (error) {
            console.error("Error al actualizar los likes de la tarjeta:", error);
        }
    }), isOwner);
    return card.generateCard();
};
let userId;
let cardSection;
function loadInitialData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [userData, initialCards] = yield Promise.all([
                api.getUserInfo(),
                api.getInitialCards(),
            ]);
            userId = userData._id;
            userInfo.setUserInfo({
                name: userData.name,
                job: userData.about,
                avatar: userData.avatar,
            });
            cardSection = new Section({
                items: initialCards,
                renderer: (cardData) => cardSection.addItem(createCard(cardData, userId)),
            }, ".cards__list");
            cardSection.renderItems();
        }
        catch (err) {
            console.error("Fallo al cargar datos iniciales:", err);
        }
    });
}
const editProfilePopup = new PopupWithForm("#edit-popup", (values) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = userInfo.getUserInfo();
    const updatedUserData = yield api.updateUserInfo({
        name: values.name,
        about: values.description,
    });
    userInfo.setUserInfo({
        name: updatedUserData.name,
        job: updatedUserData.about,
        avatar: currentUser.avatar,
    });
    editProfilePopup.close();
}));
const newCardPopup = new PopupWithForm("#new-card-popup", (values) => __awaiter(void 0, void 0, void 0, function* () {
    const newCardData = yield api.addCard({
        name: values["place-name"],
        link: values.link,
    });
    cardSection.addItem(createCard(newCardData, userId));
    newCardPopup.close();
}));
loadInitialData();
const editProfileFormValidator = new FormValidator(defaultFormConfig, editProfileForm);
const newCardFormValidator = new FormValidator(defaultFormConfig, newCardForm);
const avatarEditFormValidator = new FormValidator(defaultFormConfig, avatarEditForm);
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
avatarEditButton.addEventListener("click", () => {
    avatarEditForm.reset();
    avatarEditFormValidator.resetValidation();
    avatarEditPopup.open();
});
imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
newCardPopup.setEventListeners();
deleteConfirmationPopup.setEventListeners();
avatarEditPopup.setEventListeners();
editProfileFormValidator.enableValidation();
newCardFormValidator.enableValidation();
avatarEditFormValidator.enableValidation();
