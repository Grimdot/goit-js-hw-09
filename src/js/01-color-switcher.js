const TIMER_DELAY = 1000;

const startColorSwitcher = document.querySelector('button[data-start]');
const stopColorSwitcher = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let timerId = null;

stopColorSwitcher.setAttribute('disabled', '');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyColorChanger = () => {
  body.style.backgroundColor = getRandomHexColor();
};

const handleStartButton = () => {
  startColorSwitcher.setAttribute('disabled', '');
  stopColorSwitcher.removeAttribute('disabled');

  timerId = setInterval(bodyColorChanger, TIMER_DELAY);
};

const handleStopButton = () => {
  startColorSwitcher.removeAttribute('disabled');
  stopColorSwitcher.setAttribute('disabled', '');

  clearInterval(timerId);
};

startColorSwitcher.addEventListener('click', handleStartButton);
stopColorSwitcher.addEventListener('click', handleStopButton);
