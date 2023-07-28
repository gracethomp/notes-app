import { categories } from "./mockup.js";
import { createCell } from "./elements.js";

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
    row.appendChild(createCell(category.icon));
    row.appendChild(createCell(category.name));
    row.appendChild(createCell(getActiveNotesCount(category.name, notes)));
    row.appendChild(createCell(getArchivedNotesCount(category.name, notes)));
    tableBody.appendChild(row);
  });
}

export function selectCategoryIcon(category) {
  return categories.find((item) => item.name === category).icon;
}
