export const transformPressure = (value, scale) => {
  if (!scale) {
    return (value * 100 / 101325).toFixed(2) + ' atm';
  }

  if (value && !isNaN(value)) {
    if (scale === 'metric') {
      return (value * 100 / 133.32).toFixed(1) + ' mmHg';
    }
    if (scale === 'imperial') {
      return (value * 100 / 3386.38).toFixed(2) + ' inHg';
    }
  }
};


export const transformSpeed = (value, scale) => {
  if (!scale) {
    return value + ' meter/s';
  }

  if (value && !isNaN(value)) {
    if (scale === 'metric') {
      return value.toFixed(1) + ' meter/s';
    }
    if (scale === 'imperial') {
      return (value * 2.237).toFixed(1) + ' miles/h';
    }
  }
};


export const transformTemp = (value, scale) => {
  const K = 273.15;

  if (!scale) {
    return value + '°K';
  }

  if (value && !isNaN(value)) {
    if (scale === 'metric') {
      let t = value - K;
      return t.toFixed(1) + '°C';
    }
    if (scale === 'imperial') {
      let t = ((value - K) * 1.8) + 32;
      return t.toFixed(1) + '°F';
    }
  }
};


export const parseDate = (d) => {
  const date = new Date(d);
  const newYear = date.getFullYear();
  const newMonth = numbTo2Digits(date.getMonth() + 1);
  const newDay = numbTo2Digits(date.getDate());

  return `${newYear}-${newMonth}-${newDay}`;
};

export const parseTime = (d) => {
  const date = new Date(d);
  const hours = numbTo2Digits(date.getHours());
  const minutes = numbTo2Digits(date.getMinutes());
  return `${hours}:${minutes}`;
};

export const parseDay = (d) => {
  const date = new Date(d);
  const idx = date.getDay();

  const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return week[idx];
};

const numbTo2Digits = (num) => {
  return (num < 10 ? `0${num}` : num);
};
