import { monthNames } from "./mockup.js";

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
  const datePattern = /\d{1,2}\/\d{1,2}\/\d{4}/g;
  const dates = str.match(datePattern) || [];
  return dates ? dates : [];
}
