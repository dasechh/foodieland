import '/src/styles/styles.scss';
import { HeaderSection, MainSection, FooterSection } from './sections';

const headerSection = await new HeaderSection().element;
const mainSection = await new MainSection().element;
const footerSection = await new FooterSection().element;

const body = document.querySelector('body') as HTMLBodyElement;
body.append(headerSection, mainSection, footerSection);

const path = window.location.pathname;
const page = path.split('/').at(-1)?.split('.')[0] || 'index';

await import(`./pages/${page}.ts`);
