import { StarWarsTestPage } from './app.po';

describe('star-wars-test App', () => {
  let page: StarWarsTestPage;

  beforeEach(() => {
    page = new StarWarsTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
