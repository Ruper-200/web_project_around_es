import Card, { type CardData } from "../components/Card.js";
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
    "Content-Type": "application/json"
  }
});



const editButton = document.querySelector<HTMLButtonElement>(
  ".profile__edit-button",
) as HTMLButtonElement;
const addButton = document.querySelector<HTMLButtonElement>(
  ".profile__add-button",
) as HTMLButtonElement;
const nameInput = document.querySelector<HTMLInputElement>(
  ".popup__input_type_name",
) as HTMLInputElement;
const descriptionInput = document.querySelector<HTMLInputElement>(
  ".popup__input_type_description",
) as HTMLInputElement;
const editProfileForm = document.querySelector<HTMLFormElement>(
  "#edit-profile-form",
) as HTMLFormElement;
const newCardForm = document.querySelector<HTMLFormElement>(
  "#new-card-form",
) as HTMLFormElement;
const avatarEditButton = document.querySelector<HTMLButtonElement>( 
  ".profile__avatar-edit-button"
) as HTMLButtonElement;
const avatarEditForm = document.querySelector<HTMLFormElement>(
  "#edit-avatar-form",
) as HTMLFormElement;
const avatarEditPopup = new PopupWithForm("#avatar-popup", async (values) => {
  const updatedUserData = await api.updateAvatar({
    avatar: values.avatar,
  });
  userInfo.setUserInfo({
    ...userInfo.getUserInfo(),
    avatar: updatedUserData.avatar,
  });
  avatarEditPopup.close();
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const imagePopup = new PopupWithImage("#image-popup");
const deleteConfirmationPopup = new PopupWithConfirmation("#delete-confirmation-popup", async () => {});
const createCard = (cardData : CardData, userId : string ): HTMLElement => {
const isOwner = cardData.owner === userId;
const card = new Card(
    cardData,
    "#card-template",
    (selectedCard) => {
      imagePopup.open(selectedCard);
    },
    (cardId) => {
      deleteConfirmationPopup.setSubmitAction(async () => {
        await api.deleteCard(cardId);
        card.deleteCard();
      }
    );
    
      deleteConfirmationPopup.open();
},

    async (cardId, isLiked) => {
      let updatedCard : CardData;
      if(isLiked) {
      updatedCard = await api.unlikeCard(cardId);
      } else {
      updatedCard = await api.likeCard(cardId);
      }
      card.setLikeState(updatedCard.isLiked);
    },
    isOwner,
  );

  return card.generateCard();
};
  
let userId: string;
let cardSection: Section<CardData>;
async function loadInitialData(): Promise<void> {
  try {
    const [userData, initialCards] = await Promise.all([
      api.getUserInfo(),
      api.getInitialCards(),
    ]);

    userId = userData._id;

    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });

    cardSection = new Section<CardData>(
      {
        items: initialCards,
        renderer: (cardData) =>
          cardSection.addItem(createCard(cardData, userId)),
      },
      ".cards__list",
    );

    cardSection.renderItems();
  } catch (err: unknown) {
    console.error("Fallo al cargar datos iniciales:", err);
  }
}



const editProfilePopup = new PopupWithForm("#edit-popup", async (values) => {
  const currentUser = userInfo.getUserInfo();
  const updatedUserData = await api.updateUserInfo({
    name: values.name,
    about: values.description,
  });
  userInfo.setUserInfo({
    name: updatedUserData.name,
    job: updatedUserData.about,
    avatar: currentUser.avatar,
  });
  editProfilePopup.close();
});


const newCardPopup = new PopupWithForm("#new-card-popup", async (values) => {
const newCardData = await api.addCard({
    name: values["place-name"],
    link: values.link,
  });

  cardSection.addItem(
    createCard(newCardData, userId),
  );
  newCardPopup.close();
});

loadInitialData();

const editProfileFormValidator = new FormValidator(
  defaultFormConfig,
  editProfileForm,
);
const newCardFormValidator = new FormValidator(
  defaultFormConfig,
  newCardForm,
);
const avatarEditFormValidator = new FormValidator(
  defaultFormConfig,
  avatarEditForm,
);

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


