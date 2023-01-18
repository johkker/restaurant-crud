import { OpenTimes } from '../interfaces';

const currentDayString = new Date()
  .toLocaleString('en-us', { weekday: 'long' })
  .toLowerCase();
const currentTimeString = new Date().toLocaleTimeString();

const currentDay = currentDayString as keyof OpenTimes;

export { currentDay };
