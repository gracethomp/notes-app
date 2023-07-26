const categories = ["Task", "Random Thought", "Idea"];

let notesData = [
  {
    name: "Shopping list",
    timeOfCreation: "April 20, 2021, 12:00",
    noteCategory: "Task",
    noteContent: "Tomatoes, Bread",
    datesMentioned: [],
  },
  {
    name: "The theory of evolution",
    timeOfCreation: "April 27, 2021, 14:30",
    noteCategory: "Random Thought",
    noteContent: "Life's journey is an unpredictable dance, where the steps we take shape the music we leave behind.",
    datesMentioned: [],
  },
  {
    name: "New feature",
    timeOfCreation: "May 5, 2021, 15:36",
    noteCategory: "Idea",
    noteContent: "Implement new feature (3/5/2021, 5/5/2021)",
    datesMentioned: ["3/5/2021", "5/5/2021"],
  },
  {
    name: "Sweet dream",
    timeOfCreation: "May 7, 2021, 17:54",
    noteCategory: "Random Thought",
    noteContent: "Had an interesting dream last night",
    datesMentioned: [],
  },
  {
    name: "Birthday gift",
    timeOfCreation: "May 15, 2021, 10:03",
    noteCategory: "Task",
    noteContent: "Grace has a birthday on 17/05/2021. Don't forget to buy a gift.",
    datesMentioned: ["17/05/2021"],
  },
  {
    name: "Trip",
    timeOfCreation: "May 17, 2021, 3:25",
    noteCategory: "Task",
    noteContent: "Plan a weekend trip",
    datesMentioned: [],
  },
  {
    name: "Pet-project",
    timeOfCreation: "July 21, 2021, 20:45",
    noteCategory: "Idea",
    noteContent: "Idea for a new project: Create a recipe sharing app",
    datesMentioned: [],
  },
];

function updateNotesTable() {
  const tableBody = document.querySelector("tbody#notes");
  console.log(tableBody);
  notesData.forEach((note, index) => {
    if (!note.archived) {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${note.name}</td>
                <td>${note.timeOfCreation}</td>
                <td>${note.noteCategory}</td>
                <td>${note.noteContent}</td>
                <td>${note.datesMentioned.join(", ")}</td>
                <td></td>
            `;
      tableBody.appendChild(row);
    }
  });
}

updateNotesTable();
