import { archive, pen, trash } from "./icons.js";
import { createActionButton, createCell } from "./elements.js";
import { selectCategoryIcon } from "./categories.js";
import { showModal } from "./modal.js";

let showArchivedNotes = false;

function createNoteRow(note, index) {
  const row = document.createElement("tr");
  row.setAttribute("data-index", index);
  row.appendChild(createCell(selectCategoryIcon(note.noteCategory)));
  row.appendChild(createCell(note.name));
  row.appendChild(createCell(note.timeOfCreation));
  row.appendChild(createCell(note.noteCategory));
  row.appendChild(createCell(note.noteContent));
  row.appendChild(createCell(note.datesMentioned.join(", ")));
  row.appendChild(
    createActionButton(archive, () => showModal("Archive", note))
  );
  row.appendChild(createActionButton(pen, () => showModal("Edit", note)));
  row.appendChild(createActionButton(trash, () => showModal("Delete", note)));
  return row;
}

export function updateNotesTable(notes) {
  const tableBody = document.querySelector(".note-list");
  tableBody.innerHTML = "";
  notes.forEach((note, index) => {
    if (showArchivedNotes === note.archived) {
      const row = createNoteRow(note, index);
      tableBody.appendChild(row);
    }
  });
}
