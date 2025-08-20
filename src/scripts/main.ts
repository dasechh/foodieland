import '/src/styles/styles.scss';
import { loadSection } from './utils/load-section';

async function main() {
  await loadSection('header', 'body');
  await loadSection('main', 'body');
  await loadSection('footer', 'body');

  const path = window.location.pathname;
  const page = path.split('/').pop()?.split('.')[1] || 'index';

  await import(`./pages/${page}.ts`);
}

main().catch(console.error);
