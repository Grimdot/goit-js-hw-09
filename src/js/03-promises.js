import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const form = document.querySelector('form');
const submitButton = document.querySelector('button[type="submit"]');

let delay = null;
let delayStep = null;
let amount = null;

console.log(form.elements);

function onFormSubmit(e) {
  e.preventDefault();

  delay = Number(form.elements.delay.value);
  delayStep = Number(form.elements.step.value);
  amount = Number(form.elements.amount.value);

  let totalDelay = delay + delayStep * amount;

  submitButton.setAttribute('disabled', '');

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay);
    delay += delayStep;
  }

  setTimeout(() => {
    submitButton.removeAttribute('disabled');
  }, totalDelay);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  setTimeout(() => {
    const promise = new Promise((resolve, reject) => {
      if (shouldResolve) {
        resolve(`Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`Rejected promise ${position} in ${delay}ms`);
      }
    });

    promise.then(success).catch(error);
  }, delay);
}

const success = resolveValue => {
  Notiflix.Notify.success(resolveValue);
};

const error = errorValue => {
  Notiflix.Notify.failure(errorValue);
};

form.addEventListener('submit', onFormSubmit);
