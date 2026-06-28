import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        const popupImage = this.popupElement.querySelector(".popup__image");
        const popupCaption = this.popupElement.querySelector(".popup__caption");
        if (!popupImage || !popupCaption) {
            throw new Error(`El popup de imagen esta incompleto: ${popupSelector}`);
        }
        this.popupImage = popupImage;
        this.popupCaption = popupCaption;
    }
    open(data) {
        if (data) {
            this.popupImage.src = data.link;
            this.popupImage.alt = data.name;
            this.popupCaption.textContent = data.name;
        }
        super.open();
    }
}
