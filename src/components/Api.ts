import type { CardData } from "./Card.js";



type UserData = {
  name: string;
  about: string;
  avatar: string;
  _id: string;
};

type ApiOptions = {
  baseUrl: string;
  headers: {
    authorization: string;
    "Content-Type": string;
  };
};

type CardFormData = {
    name: string;
    link: string;
};

type UserFormData = {
    name: string;
    about: string;
};


type AvatarFormData = {
    avatar: string;
};

export class Api {
  private baseUrl: string;
  private headers: ApiOptions["headers"];

  constructor(options: ApiOptions) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  async getUserInfo(): Promise<UserData> {
    const res = await fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
      });

        if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data: UserData = await res.json();

    return data;
  }

  async getInitialCards(): Promise<CardData[]> {
    const res = await fetch(`${this.baseUrl}/cards/`, {
      headers: this.headers
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data: CardData[] = await res.json();

    return data;
  }


async addCard(cardData: CardFormData) : Promise<CardData> {
    const res = await fetch(`${this.baseUrl}/cards/`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(cardData),
    }); 

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data: CardData = await res.json();
    return data;
  } 


  async updateUserInfo(userData: UserFormData): Promise<UserData> {
    const res = await fetch(`${this.baseUrl}/users/me`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify(userData),
    });
    if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
    } 
    const data: UserData = await res.json();
    return data;
}

async deleteCard(cardId: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this.headers,
    });
    if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
    } 
}}
