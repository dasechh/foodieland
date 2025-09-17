import { Section } from '../../Section'
import logoSrc from '../../../assets/icons/navigation/Foodieland-high.svg'
import fbIcon from '../../../assets/icons/navigation/001-facebook.svg'
import twIcon from '../../../assets/icons/navigation/003-twitter.svg'
import igIcon from '../../../assets/icons/navigation/004-instagram.svg'

export class HeaderSection extends Section {
  constructor() {
    const template: string = `
  <nav>
    <a class="logo" href="/">
      <img src="${logoSrc}" alt="Foodieland logo" width="110" height="30" />
    </a>
    <div class="menu">
      <a href="/">Home</a>
      <a href="#recipes">Recipes</a>
      <a href="#blog">Blog</a>
      <a href="#contact">Contact</a>
      <a href="#about">About us</a>
    </div>
    <div class="social-icons">
      <a href="#"><img src="${fbIcon}" alt="facebook page" /></a>
      <a href="#"><img src="${twIcon}" alt="twitter page" /></a>
      <a href="#"><img src="${igIcon}" alt="instagram page" /></a>
    </div>
  </nav>
  <hr />`

    super('header', [], template)
  }
}
