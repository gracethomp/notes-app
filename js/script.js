import { actions, task, idea, randomThoughts } from "./icons.js";

const categories = [
  {
    name: "Task",
    active: 3,
    archived: 0,
    icon: task,
  },
  {
    name: "Random Thought",
    active: 2,
    archived: 0,
    icon: randomThoughts,
  },
  {
    name: "Idea",
    active: 2,
    archived: 0,
    icon: idea,
  },
];

let notesData = [
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

function updateNotesTable() {
  const tableBody = document.querySelector(".note-list");
  tableBody.innerHTML = "";
  notesData.forEach((note, index) => {
    if (showArchivedNotes == note.archived) {
      const row = document.createElement("tr");
      row.innerHTML =
        "<td>" +
        selectCategoryIcon(note.noteCategory) +
        `</td>
                <td>${note.name}</td>
                <td>${note.timeOfCreation}</td>
                <td>${note.noteCategory}</td>
                <td>${note.noteContent}</td>
                <td>${note.datesMentioned.join(", ")}</td>` +
        actions(index);
      tableBody.appendChild(row);
    }
  });
}

function updateCategoriesTable() {
  const tableBody = document.querySelector(".category-list");
  categories.forEach((category) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                <td class="category-cell">
                    ${category.icon}
                </td>
                <td>${category.name}</td>
                <td>${category.active}</td>
                <td>${category.archived}</td>
            `;
    tableBody.appendChild(row);
  });
}

const activeNotesSection = document.querySelector(".active-notes-option>a");
const archiveNotesSection = document.querySelector(".archived-notes-option>a");

function changeHeading(heading) {
  const h2 = document.querySelector(".notes-title");
  h2.innerText = heading;
}

function selectActiveNotes() {
  showArchivedNotes = false;
  activeNotesSection.classList.remove("link-body-emphasis");
  activeNotesSection.classList.add("link-secondary");
  archiveNotesSection.classList.remove("link-secondary");
  archiveNotesSection.classList.add("link-body-emphasis");
  changeHeading("My Notes");
  updateNotesTable();
}

function selectArchivedNotes() {
  showArchivedNotes = true;
  archiveNotesSection.classList.add("link-secondary");
  archiveNotesSection.classList.remove("link-body-emphasis");
  activeNotesSection.classList.add("link-body-emphasis");
  activeNotesSection.classList.remove("link-secondary");
  changeHeading("Archive");
  updateNotesTable();
}

activeNotesSection.addEventListener("click", selectActiveNotes);
archiveNotesSection.addEventListener("click", selectArchivedNotes);

updateNotesTable();
updateCategoriesTable();
