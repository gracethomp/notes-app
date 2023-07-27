function createInput(placeholder, value) {
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", placeholder);
  input.setAttribute("value", value);
  input.classList.add("form-control");
  return input;
}

function createTextarea(placeholder, value) {
  const textarea = document.createElement("textarea");
  textarea.classList.add("form-control");
  textarea.setAttribute("placeholder", placeholder);
  textarea.value = value;
  return textarea;
}

function createCategoriesSelect(category) {
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
