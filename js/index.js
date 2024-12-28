import { renderProject } from "./project.js";
import { addTask } from "./task.js";
import { tasksFilter } from "./search.js";
const formAddTask = document.querySelector(".form_add_task");
const kb_input_search = document.querySelector(".kb_input_search");

// const modalTask = document.getElementById("task_descroption_modal");
// const cards = document.querySelectorAll(".kb_card");

let currentNameProject = localStorage.getItem("name");

renderProject(currentNameProject);

formAddTask.addEventListener("submit", addTask);
kb_input_search.addEventListener("input", tasksFilter);
