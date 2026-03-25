import { Hero, HeroRequest } from './hero';

describe('Hero interface', () => {
  it('should create a valid Hero object', () => {
    const hero: Hero = {
      id: '1',
      name: 'Spiderman',
      superpower: 'Spider-sense',
      city: 'New York',
      description: 'Friendly neighborhood hero',
      image: 'spiderman.jpg',
    };

    expect(hero).toBeTruthy();
    expect(hero.name).toBe('Spiderman');
  });
});

describe('HeroRequest interface', () => {
  it('should create a valid HeroRequest object', () => {
    const heroReq: HeroRequest = {
      name: 'Iron Man',
      superpower: 'Armor suit',
      city: 'Malibu',
      description: 'Genius billionaire playboy philanthropist',
      image: 'ironman.jpg',
    };

    expect(heroReq).toBeTruthy();
    expect(heroReq.superpower).toBe('Armor suit');
  });
});
