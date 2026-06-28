export interface UserInfoSelectors {
  nameSelector: string;
  jobSelector: string;
}

export interface UserData {
  name: string;
  job: string;
}

export default class UserInfo {
  private readonly nameElement: HTMLElement;
  private readonly jobElement: HTMLElement;

  constructor({ nameSelector, jobSelector }: UserInfoSelectors) {
    const nameElement = document.querySelector<HTMLElement>(nameSelector);
    const jobElement = document.querySelector<HTMLElement>(jobSelector);

    if (!nameElement || !jobElement) {
      throw new Error("No se encontraron los elementos de informacion del usuario");
    }

    this.nameElement = nameElement;
    this.jobElement = jobElement;
  }

  public getUserInfo(): UserData {
    return {
      name: this.nameElement.textContent ?? "",
      job: this.jobElement.textContent ?? "",
    };
  }

  public setUserInfo({ name, job }: UserData): void {
    this.nameElement.textContent = name;
    this.jobElement.textContent = job;
  }
}
