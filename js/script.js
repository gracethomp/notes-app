import { archive, pen, trash } from "./icons.js";
import { categories } from "./mockup.js";

import { selectActiveNotes, selectArchivedNotes } from "./noteTypes.js";

let notes = [
  {
    name: "Shopping list",
    timeOfCreation: "April 20, 2021, 12:00",
    noteCategory: "Task",
    noteContent: "Tomatoes, Bread",
    datesMentioned: [],
    archived: false,
  },
  {
    name: "The theory of evolution",
    timeOfCreation: "April 27, 2021, 14:30",
    noteCategory: "Random Thought",
    noteContent:
      "Life's journey is an unpredictable dance, where the steps we take shape the music we leave behind.",
    datesMentioned: [],
    archived: true,
  },
  {
    name: "New feature",
    timeOfCreation: "May 5, 2021, 15:36",
    noteCategory: "Idea",
    noteContent: "Implement new feature (3/5/2021, 5/5/2021)",
    datesMentioned: ["3/5/2021", "5/5/2021"],
    archived: false,
  },
  {
    name: "Sweet dream",
    timeOfCreation: "May 7, 2021, 17:54",
    noteCategory: "Random Thought",
    noteContent: "Had an interesting dream last night",
    datesMentioned: [],
    archived: false,
  },
  {
    name: "Birthday gift",
    timeOfCreation: "May 15, 2021, 10:03",
    noteCategory: "Task",
    noteContent:
      "Grace has a birthday on 17/05/2021. Don't forget to buy a gift.",
    datesMentioned: ["17/05/2021"],
    archived: false,
  },
  {
    name: "Trip",
    timeOfCreation: "May 17, 2021, 3:25",
    noteCategory: "Task",
    noteContent: "Plan a weekend trip",
    datesMentioned: [],
    archived: false,
  },
  {
    name: "Pet-project",
    timeOfCreation: "July 21, 2021, 20:45",
    noteCategory: "Idea",
    noteContent: "Idea for a new project: Create a recipe sharing app",
    datesMentioned: [],
    archived: false,
  },
];

let showArchivedNotes = false;

function selectCategoryIcon(category) {
  return categories.find((item) => item.name === category).icon;
}

function archiveNote(note) {
  notes.map((element) => {
    if (element === note) {
      note.archived = !note.archived;
    }
  });
  updateNotesTable();
  updateCategoriesTable();
}

function deleteNote(note) {
  notes = notes.filter((e) => e !== note);
  updateNotesTable();
  updateCategoriesTable();
}

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

function showModal(action, note) {
  const modal = document.getElementById("myModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");
  const acceptBtn = document.getElementById("acceptBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  switch (action) {
    case "Archive": {
      {
      }
      modalTitle.textContent = "Archive Note";
      modalContent.textContent = "Are you sure you want to archive this note?";
      acceptBtn.onclick = () => {
        archiveNote(note);
        closeModal();
      };
      break;
    }
    case "Delete": {
      modalTitle.textContent = "Delete Note";
      modalContent.textContent = "Are you sure you want to delete this note?";
      acceptBtn.onclick = () => {
        deleteNote(note);
        closeModal();
      };
      break;
    }
    case "Edit": {
      modalTitle.textContent = "Edit Note";
      modalContent.textContent = "You can edit the note here.";
      modalContent.appendChild(createInput("Note Name", note.name));
      modalContent.appendChild(createInput("Category", note.noteCategory));
      modalContent.appendChild(createTextarea("Content", note.noteContent));
      acceptBtn.onclick = () => {
        editNote();
        closeModal();
      };
      break;
    }
    default:
      modalTitle.textContent = "";
      modalContent.textContent = "";
  }
  modal.style.display = "block";

  cancelBtn.onclick = function () {
    closeModal();
  };
}

function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
  modalTitle.textContent = "";
  modalContent.textContent = "";
}

function createActionButton(icon, clickHandler) {
  const button = document.createElement("td");
  button.innerHTML = icon;
  button.addEventListener("click", clickHandler);
  return button;
}

function createNoteRow(note, index) {
  const row = document.createElement("tr");
  row.setAttribute("data-index", index);
  row.innerHTML =
    "<td>" +
    selectCategoryIcon(note.noteCategory) +
    `</td>
                <td>${note.name}</td>
                <td>${note.timeOfCreation}</td>
                <td>${note.noteCategory}</td>
                <td>${note.noteContent}</td>
                <td>${note.datesMentioned.join(", ")}</td>`;
  row.appendChild(
    createActionButton(archive, () => showModal("Archive", note))
  );
  // row.appendChild(
  //   createActionButton(pen, () => showModal("Edit", index, note))
  // );
  row.appendChild(createActionButton(trash, () => showModal("Delete", note)));
  return row;
}

function updateNotesTable() {
  const tableBody = document.querySelector(".note-list");
  tableBody.innerHTML = "";
  notes.forEach((note, index) => {
    if (showArchivedNotes == note.archived) {
      const row = createNoteRow(note, index);
      tableBody.appendChild(row);
    }
  });
}

function updateCategoriesTable() {
  const tableBody = document.querySelector(".category-list");
  tableBody.innerHTML = "";
  categories.forEach((category) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td class="category-cell">
                    ${category.icon}
                </td>
                <td>${category.name}</td>
                <td>${category.active}</td>
                <td>${category.archived}</td>`;
    tableBody.appendChild(row);
  });
}

const activeNotesSection = document.querySelector(".active-notes-option>a");
const archiveNotesSection = document.querySelector(".archived-notes-option>a");

activeNotesSection.addEventListener("click", () => {
  showArchivedNotes = selectActiveNotes(
    activeNotesSection,
    archiveNotesSection
  );
  updateNotesTable();
});

archiveNotesSection.addEventListener("click", () => {
  showArchivedNotes = selectArchivedNotes(
    activeNotesSection,
    archiveNotesSection
  );
  updateNotesTable();
});

updateNotesTable();
updateCategoriesTable();
