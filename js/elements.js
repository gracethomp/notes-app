import { categories } from "./mockup.js";

export function getValueBySelector(selector) {
  return document.querySelector(selector).value;
}

export function createInput(placeholder, value) {
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", placeholder ? placeholder : "");
  input.setAttribute("value", value ? value : "");
  input.classList.add("form-control");
  return input;
}

export function createTextarea(placeholder, value) {
  const textarea = document.createElement("textarea");
  textarea.classList.add("form-control");
  textarea.setAttribute("placeholder", placeholder);
  textarea.value = value ? value : "";
  return textarea;
}

export function createCategoriesSelect(category) {
  const select = document.createElement("select");
  select.classList.add("form-select");
  select.setAttribute("aria-label", "Default select example");
  categories.map((item) => {
    const option = document.createElement("option");
    option.setAttribute("value", item.name);
    if (item.name === category) {
      option.selected = true;
    }
    option.textContent = item.name;
    select.appendChild(option);
  });
  return select;
}

export function createWarningMessage() {
  const warningMessage = document.createElement("p");
  warningMessage.classList.add("warning-message");
  warningMessage.textContent = "Please fill all fields";
  return warningMessage;
}

export function createActionButton(icon, clickHandler) {
  const button = document.createElement("td");
  button.innerHTML = icon;
  button.addEventListener("click", clickHandler);
  return button;
}

export function createButton(textContent, ...classes) {
  const button = document.createElement("button");
  button.classList.add(...classes);
  button.textContent = textContent;
  return button;
}

export function createCell(innerHTML) {
  const cell = document.createElement("td");
  cell.innerHTML = innerHTML;
  return cell;
}