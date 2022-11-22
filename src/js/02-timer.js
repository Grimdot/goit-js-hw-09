import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  startTimerButton: document.querySelector('button[data-start]'),
  daysValue: document.querySelector('span[data-days]'),
  hoursValue: document.querySelector('span[data-hours]'),
  minutesValue: document.querySelector('span[data-minutes]'),
  secondsValue: document.querySelector('span[data-seconds]'),
};

let timerId = null;
let selectedDate = null;

refs.startTimerButton.setAttribute('disabled', true);

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (timerId) {
      clearInterval(timerId);
    }
    if (selectedDate < new Date()) {
      refs.startTimerButton.setAttribute('disabled', true);
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startTimerButton.removeAttribute('disabled', true);
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

function onClickTimerStart() {
  timerId = setInterval(() => {
    const deltaDay = selectedDate.getTime() - Date.now();

    const convertedTime = convertMs(deltaDay);

    refs.daysValue.textContent = addLeadingZero(convertedTime.days);
    refs.hoursValue.textContent = addLeadingZero(convertedTime.hours);
    refs.minutesValue.textContent = addLeadingZero(convertedTime.minutes);
    refs.secondsValue.textContent = addLeadingZero(convertedTime.seconds);
  }, 1000);
}

refs.startTimerButton.addEventListener('click', onClickTimerStart);
