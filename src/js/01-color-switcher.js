const startColorSwitcher = document.querySelector('button[data-start]');
const stopColorSwitcher = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let intervalId = null;

stopColorSwitcher.setAttribute('disabled', true);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyColorChanger = () => {
  body.style.backgroundColor = getRandomHexColor();
};

const handleStartButton = () => {
  startColorSwitcher.setAttribute('disabled', true);
  stopColorSwitcher.removeAttribute('disabled');

  intervalId = setInterval(bodyColorChanger, 1000);
};
const handleStopButton = () => {
  startColorSwitcher.removeAttribute('disabled');
  stopColorSwitcher.setAttribute('disabled', true);

  clearInterval(intervalId);
};

startColorSwitcher.addEventListener('click', handleStartButton);
stopColorSwitcher.addEventListener('click', handleStopButton);
