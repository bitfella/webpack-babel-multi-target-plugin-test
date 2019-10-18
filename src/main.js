import './main.scss';

async function init() {
  const { default: tabs } = await import( /* webpackChunkName: "tabs" */ './components/tabs');

  if (tabs) {
    console.log('Tabs component loaded ok');
  }
}

init();
