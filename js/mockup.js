import { task, idea, randomThoughts } from "./icons.js";

export const categories = [
  {
    name: "Task",
    active: 3,
    archived: 0,
    icon: task,
  },
  {
    name: "Random Thought",
    active: 1, 
    archived: 1,
    icon: randomThoughts,
  },
  {
    name: "Idea",
    active: 2, 
    archived: 0,
    icon: idea,
  },
];

export const initialNotes = [
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

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
