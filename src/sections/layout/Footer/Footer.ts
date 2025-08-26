import { Section } from "../../Section";

export class FooterSection extends Section {
  constructor() {
    const template: string = `
  <div class="footer__top">
    <div class="footer__top-left">
      <a class="logo" href="#home">
        <img
          src="icons/header/Foodieland-high.svg"
          alt="Foodieland logo"
          width="110"
          height="30"
        />
      </a>
      <p>Lorem ipsum dolor sit amet, consectetuipisicing elit</p>
    </div>
    <div class="footer__top-right">
      <div class="menu">
        <a class="menu__link" href="#recipes">Recipes</a>
        <a class="menu__link" href="#blog">Blog</a>
        <a class="menu__link" href="#contact">Contact</a>
        <a class="menu__link" href="#about">About us</a>
      </div>
    </div>
  </div>
  <hr />
  <div class="footer__bottom">
    <p class="footer__copyright">
      © 2020 Flowbase. Powered by <a href="#">Webflow</a>
    </p>
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
  </div>`;

    super('footer', [], template);
  }
}
