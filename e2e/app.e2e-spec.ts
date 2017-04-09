import { UltimatepredictionPage } from './app.po';

describe('ultimateprediction App', () => {
  let page: UltimatepredictionPage;

  beforeEach(() => {
    page = new UltimatepredictionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
