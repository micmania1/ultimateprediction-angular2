import { UltimatePredictionPage } from './app.po';

describe('ultimateprediction App', function() {
  let page: UltimatePredictionPage;

  beforeEach(() => {
    page = new UltimatePredictionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
