import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const TIMER_DELAY = 1000;

const refs = {
  startTimerButton: document.querySelector('button[data-start]'),
  daysValue: document.querySelector('span[data-days]'),
  hoursValue: document.querySelector('span[data-hours]'),
  minutesValue: document.querySelector('span[data-minutes]'),
  secondsValue: document.querySelector('span[data-seconds]'),
};

let timerId = null;
let selectedDateMs = null;

refs.startTimerButton.setAttribute('disabled', '');

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDateMs = selectedDates[0].getTime();

    if (timerId) {
      clearInterval(timerId);
    }
    if (selectedDateMs < Date.now()) {
      refs.startTimerButton.setAttribute('disabled', '');
      Notiflix.Notify.failure('Please choose a date in the future');
      render(0);
    } else {
      refs.startTimerButton.removeAttribute('disabled', '');
    }
  },
};

flatpickr('#datetime-picker', flatpickrOptions);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function render(timeInMS) {
  const convertedTime = convertMs(timeInMS);

  refs.daysValue.textContent = addLeadingZero(convertedTime.days);
  refs.hoursValue.textContent = addLeadingZero(convertedTime.hours);
  refs.minutesValue.textContent = addLeadingZero(convertedTime.minutes);
  refs.secondsValue.textContent = addLeadingZero(convertedTime.seconds);
}

function onClickTimerStart() {
  refs.startTimerButton.setAttribute('disabled', '');

  timerId = setInterval(() => {
    const deltaTime = selectedDateMs - Date.now();

    render(deltaTime);

    if (deltaTime <= 0) {
      clearInterval(timerId);
      Notiflix.Notify.info('The timer has expired!!!');
      render(0);
    }
  }, TIMER_DELAY);
}

refs.startTimerButton.addEventListener('click', onClickTimerStart);
