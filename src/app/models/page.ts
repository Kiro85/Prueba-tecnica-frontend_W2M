import { Hero } from "./hero";

export interface Page {
  data: Hero[];
  first: number;
  items: number;
  last: number;
  pages: number;
  next: number;
  prev: number;
}
