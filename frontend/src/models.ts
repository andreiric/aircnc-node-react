export interface User {
  id: number;
  email: string;
}

export interface Spot {
  id: number;
  thumbnail: string;
  thumbnail_url: string;
  company: string;
  price: number;
  techs: string;
  user: User;
}

