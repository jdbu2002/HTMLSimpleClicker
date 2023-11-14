let money = 0;
let clickers = 0;
const autoclickers = new Worker('autoclicker.js');

addEventListener('beforeunload', () => save());
loadData();

function addMoney(earn = 1) {
  money += earn;
  updateText();
}

function updateText() {
  document.getElementById('money').innerText = money;
  document.getElementById('cps').innerText = `${clickers} cps`;
}

function loadData() {
  money = Number(localStorage.getItem('money'));
  clickers = Number(localStorage.getItem('clickers'));
  autoclickers.postMessage({ action: 'load', amount: clickers });
  updateText();
}

function buyAutoclicker(amount = 1) {
  if (money < amount * 10 * (clickers + 1)) {
    notEnough(amount);
    return;
  }

  money -= amount * 10 * (clickers + 1);
  clickers += amount;
  updateText();
  autoclickers.postMessage({ action: 'buy', amount });
}

autoclickers.addEventListener('message', (event) => {
  const { action, amount } = event.data;

  if (action === 'click') addMoney(amount);
  if (action === 'save') clickers = amount;
});

function save() {
  localStorage.setItem('money', money);
  localStorage.setItem('clickers', clickers);
}

function notEnough(amount) {
  const msg = document.getElementById('not-enough');
  msg.style.display = 'block';
  const value = amount * 10 * (clickers + 1);
  msg.innerText = `Not enough money! You need ${value} to buy ${amount} autoclickers`;
  setTimeout(() => {
    msg.style.display = 'none';
  }, 2000);
}
