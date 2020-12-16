import refs from './refs.js';

const { timeSection, daysRef, hoursRef, minsRef, secsRef } = refs;

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }

  start() {
    this.timer();

    this.interval = setInterval(() => {
      this.timer();
    }, 1000);
  }

  timer() {
    let currentDate = Date.now();
    const timeDiff = this.targetDate - currentDate;
    this.updateClockface(timeDiff);
  }

  updateClockface(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

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

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const newTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jan 01 2021'),
  // targetDate: new Date('Dec 11 2020'),
});

// Вызываем таймер, чтобы при загрузке страницы сразу было видно отсчёт
newTimer.start();
