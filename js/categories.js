import { categories } from "./mockup.js";

function getActiveNotesCount(category, notes) {
  return notes.reduce((accumulator, note) => {
    if (note.noteCategory === category && !note.archived) {
      return ++accumulator;
    }
    return accumulator;
  }, 0);
}

function getArchivedNotesCount(category, notes) {
  return notes.reduce((accumulator, note) => {
    if (note.noteCategory === category && note.archived) {
      return ++accumulator;
    }
    return accumulator;
  }, 0);
}

export function updateCategoriesTable(notes) {
  const tableBody = document.querySelector(".category-list");
  tableBody.innerHTML = "";
  categories.forEach((category) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td class="category-cell">
                      ${category.icon}
                  </td>
                  <td>${category.name}</td>
                  <td>${getActiveNotesCount(category.name, notes)}</td>
                  <td>${getArchivedNotesCount(category.name, notes)}</td>`;
    tableBody.appendChild(row);
  });
}

export function selectCategoryIcon(category) {
  return categories.find((item) => item.name === category).icon;
}
