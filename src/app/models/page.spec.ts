import { Page } from './page';
import { Hero } from './hero';

describe('Page interface', () => {
  it('should create a valid Page object', () => {
    const heroes: Hero[] = [
      {
        id: '1',
        name: 'Spiderman',
        superpower: 'Spider-sense',
        city: 'New York',
        description: 'Friendly neighborhood hero',
        image: 'spiderman.jpg',
      },
      {
        id: '2',
        name: 'Iron Man',
        superpower: 'Armor suit',
        city: 'Malibu',
        description: 'Genius billionaire playboy philanthropist',
        image: 'ironman.jpg',
      }
    ];

    const page: Page = {
      data: heroes,
      first: 0,
      items: 2,
      last: 1,
      pages: 1,
      next: 0,
      prev: 0
    };

    expect(page).toBeTruthy();
    expect(page.data.length).toBe(2);
    expect(page.first).toBe(0);
    expect(page.pages).toBe(1);
  });
});
