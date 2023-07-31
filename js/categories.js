import { categories } from "./mockup.js";

export function changeTypesCounting(name, activeNumber, archivedNumber) {
  categories.map(category => {
    if(category.name === name) {
      category.active += activeNumber;
      category.archived += archivedNumber;
    }
  })
}

export function selectCategoryIcon(category) {
  return categories.find((item) => item.name === category).icon;
}
