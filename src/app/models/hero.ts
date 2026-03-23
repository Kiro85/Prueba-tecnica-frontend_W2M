export interface Hero {
  id: string;
  name: string;
  superpower: string;
  city: string;
  description: string;
  image: string;
}

export interface HeroRequest {
  name: string;
  superpower: string;
  city: string;
  description: string;
  image: string;
}
