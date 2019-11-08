import './main.scss';

async function init() {
  const { default: tabs } = await import( /* webpackChunkName: "tabs" */ './components/tabs');

  if (tabs) {
    const myTabs = new tabs();
    myTabs.init();
  }
}

init();
