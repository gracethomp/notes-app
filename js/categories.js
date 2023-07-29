import { categories } from "./mockup.js";
import { createCell } from "./elements.js";

function getActiveNotesCountByCategory(category, notes) {
  return notes.reduce((accumulator, note) =>
    note.noteCategory === category && !note.archived ? ++accumulator : accumulator,
    0
  );
}

function getArchivedNotesCountByCategory(category, notes) {
  return notes.reduce((accumulator, note) =>
    note.noteCategory === category && note.archived ? ++accumulator : accumulator,
    0
  );
}

export function updateCategoriesTable(notes) {
  const tableBody = document.querySelector(".category-list");
  tableBody.innerHTML = "";
  categories.forEach((category) => {
    const row = document.createElement("tr");
    row.appendChild(createCell(category.icon));
    row.appendChild(createCell(category.name));
    row.appendChild(
      createCell(getActiveNotesCountByCategory(category.name, notes))
    );
    row.appendChild(
      createCell(getArchivedNotesCountByCategory(category.name, notes))
    );
    tableBody.appendChild(row);
  });
}

export function selectCategoryIcon(category) {
  return categories.find((item) => item.name === category).icon;
}
