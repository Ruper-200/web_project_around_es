export interface UserInfoSelectors {
  nameSelector: string;
  jobSelector: string;
  avatarSelector: string;
}

export interface UserData {
  name: string;
  job: string;
  avatar: string;
}

export default class UserInfo {
  private readonly nameElement: HTMLElement;
  private readonly jobElement: HTMLElement;
  private readonly avatarElement: HTMLImageElement;

  constructor({ nameSelector, jobSelector, avatarSelector }: UserInfoSelectors) {
    const nameElement = document.querySelector<HTMLElement>(nameSelector);
    const jobElement = document.querySelector<HTMLElement>(jobSelector);
    const avatarElement = document.querySelector<HTMLImageElement>(avatarSelector);

    if (!nameElement || !jobElement || !avatarElement) {
      throw new Error("No se encontraron los elementos de informacion del usuario");
    }

    this.nameElement = nameElement;
    this.jobElement = jobElement;
    this.avatarElement = avatarElement;
  }

  public getUserInfo(): UserData {
    return {
      name: this.nameElement.textContent ?? "",
      job: this.jobElement.textContent ?? "",
      avatar: this.avatarElement.src,
    };
  }

  public setUserInfo({ name, job, avatar }: UserData): void {
    this.nameElement.textContent = name;
    this.jobElement.textContent = job;
    this.avatarElement.src = avatar;
  }
}
