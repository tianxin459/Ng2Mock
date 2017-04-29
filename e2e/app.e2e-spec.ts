import { Ng2mockPage } from './app.po';

describe('ng2mock App', function() {
  let page: Ng2mockPage;

  beforeEach(() => {
    page = new Ng2mockPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
