let autoclicks = 0;

addEventListener('message', (event) => {
  const { action, amount } = event.data;

  if (action === 'buy') buy(amount);
  if (action === 'load') load(amount);
});

function click() {
  setInterval(() => {
    postMessage({ action: 'click', amount: autoclicks });
  }, 1000);
}

function load(amount) {
  autoclicks = amount;
  autoclicks > 0 && click();
}

function buy(amount) {
  autoclicks === 0 && click();
  autoclicks += amount;
  postMessage({ action: 'save', amount: autoclicks });
}
