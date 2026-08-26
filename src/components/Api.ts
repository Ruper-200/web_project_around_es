type UserData = {
  name: string;
  about: string;
  avatar: string;
  _id: string;
};

type CardData = {
  isLiked: boolean;
  _id: string;
  name: string;
  link: string;
  owner: string;
  createdAt: string;
};

export class Api {
  private baseUrl: string;
  private token: string;

  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  async getUserInfo(): Promise<UserData> {
    const res = await fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.token,
      },
    });

    const data: UserData = await res.json();

    return data;
  }

  async getCardData(): Promise<CardData[]> {
    const res = await fetch(`${this.baseUrl}/cards/`, {
      headers: {
        authorization: this.token,
      },
    });

    const data: CardData[] = await res.json();

    return data;
  }
}