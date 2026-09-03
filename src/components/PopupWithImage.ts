import Popup from "./Popup.js";

export interface PopupImageData {
  name: string;
  link: string;
}

export default class PopupWithImage extends Popup {
  private readonly popupImage: HTMLImageElement;
  private readonly popupCaption: HTMLElement;

  constructor(popupSelector: string) {
    super(popupSelector);

    const popupImage =
      this.popupElement.querySelector<HTMLImageElement>(".popup__image");
    const popupCaption =
      this.popupElement.querySelector<HTMLElement>(".popup__caption");

    if (!popupImage || !popupCaption) {
      throw new Error(`El popup de imagen esta incompleto: ${popupSelector}`);
    }

    this.popupImage = popupImage;
    this.popupCaption = popupCaption;
  }

  public override open(): void;
  public open(data: PopupImageData): void;
  public override open(data?: PopupImageData): void {
    if (data) {
      this.popupImage.src = data.link;
      this.popupImage.alt = data.name;
      this.popupCaption.textContent = data.name;
    }

    super.open();
  }
}
