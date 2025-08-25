import '/src/styles/styles.scss';
import { loadSection } from './utils/load-section';
import { HeaderSection, MainSection, FooterSection } from './sections';

async function main() {
  await loadSection(HeaderSection, 'body');
  await loadSection(MainSection, 'body');
  await loadSection(FooterSection, 'body');

  const path = window.location.pathname;
  const page = path.split('/').pop()?.split('.')[1] || 'index';

  await import(`./pages/${page}.ts`);
}

main().catch(console.error);
