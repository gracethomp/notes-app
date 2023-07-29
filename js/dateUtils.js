import { monthNames } from "./mockup.js";

const DATE_PATTERN =
  /^(0?[1-9]|[1-2][0-9]|30|31)\/(0?[1-9]|1[0-2])\/(19|20)\d{2}$/;
const DATE_EXTRACT_PATTERN = /\b(0?[1-9]|[1-2][0-9]|30|31)\/(0?[1-9]|1[0-2])\/(19|20)\d{2}\b/g;

const dateExtractRegExp = new RegExp(DATE_EXTRACT_PATTERN);


function isValidDate(dateString) {
  if (!DATE_PATTERN.test(dateString)) {
    return false;
  }
  const [day, month, year] = dateString.split("/").map(Number);
  const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  if (isLeapYear && month === 2) {
    daysInMonth[2] = 29;
  }
  if (day > daysInMonth[month]) {
    return false;
  }
  return true;
}

export function getCurrentTime() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = monthNames[currentDate.getMonth()];
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  return `${month} ${day}, ${year}, ${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

export function getDatesFromString(str) {
  const datesFound = str.match(dateExtractRegExp);

  if (datesFound) {
    const validDates = datesFound.filter(isValidDate);
    return validDates;
  } else {
    return [];
  }
}
