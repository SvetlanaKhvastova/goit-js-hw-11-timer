import refs from './refs.js';

const { timeSection, daysRef, hoursRef, minsRef, secsRef } = refs;

// let day = 'Dec 11 2020';
let day = 'Jan 01 2021';

start(day);

function timer(date) {
  let targetDate = new Date(date);
  let currentDate = Date.now();
  const timeDiff = targetDate - currentDate;
  updateClockface(timeDiff);
}

function start(day) {
  timer(day);

  let interval = setInterval(() => {
    timer(day);
  }, 1000);
}

function updateClockface(time) {
  /*
   * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
   * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
   */
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));

  /*
   * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
   * остатка % и делим его на количество миллисекунд в одном часе
   * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
   */
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );

  /*
   * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
   * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
   */
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

  /*
   * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
   * миллисекунд в одной секунде (1000)
   */
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  if (time > 0) {
    daysRef.textContent = days;
    hoursRef.textContent = hours;
    minsRef.textContent = mins;
    secsRef.textContent = secs;
  } else {
    daysRef.textContent = '00';
    hoursRef.textContent = '00';
    minsRef.textContent = '00';
    secsRef.textContent = '00';
  }
}

function pad(value) {
  return String(value).padStart(2, '0');
}
