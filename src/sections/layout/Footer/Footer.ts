import { Section } from "../../Section";
import logoSrc from '../../../assets/icons/navigation/Foodieland-high.svg'
import fbIcon from '../../../assets/icons/navigation/001-facebook.svg'
import twIcon from '../../../assets/icons/navigation/003-twitter.svg'
import igIcon from '../../../assets/icons/navigation/004-instagram.svg'

export class FooterSection extends Section {
  constructor() {
    const template: string = `
  <div class="footer__top">
    <div class="footer__top-left">
      <a class="logo" href="#home">
        <img
          src="${logoSrc}"
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
        <img src="${fbIcon}" alt="facebook page" />
      </a>
      <a href="#">
        <img src="${twIcon}" alt="twitter page" />
      </a>
      <a href="#">
        <img src="${igIcon}" alt="instagram page" />
      </a>
    </div>
  </div>`;

    super('footer', [], template);
  }
}
