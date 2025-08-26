import { Section } from '../../Section';

export class HeaderSection extends Section {
  constructor() {
    const template: string = `
  <nav>
    <a class="logo" href="/">
      <img
        src="icons/header/Foodieland-high.svg"
        alt="Foodieland logo"
        width="110"
        height="30"
      />
    </a>
    <div class="menu">
      <a href="/">Home</a>
      <a href="#recipes">Recipes</a>
      <a href="#blog">Blog</a>
      <a href="#contact">Contact</a>
      <a href="#about">About us</a>
    </div>
    <div class="social-icons">
      <a href="#">
        <img src="icons/header/001-facebook.svg" alt="facebook page" />
      </a>
      <a href="#">
        <img src="icons/header/003-twitter.svg" alt="twitter page" />
      </a>
      <a href="#">
        <img src="icons/header/004-instagram.svg" alt="instagram page" />
      </a>
    </div>
  </nav>
  <hr />`;

    super('header', [], template);
  }
}
