import { renderProject, onSubmitProject } from "./project.js";
import { addTasktoDB } from "./task.js";
import { tasksFilter } from "./search.js";
const formAddTask = document.querySelector(".form_add_task");
const kb_input_search = document.querySelector(".kb_input_search");
const formCreateProject = document.querySelector(".form_create_project");

let currentProject = JSON.parse(localStorage.getItem("project"));
if (currentProject) {
  renderProject();
} else {
  const about = document.querySelector(".about");
  about.style.display = "flex";
}
formAddTask.addEventListener("submit", addTasktoDB);
kb_input_search.addEventListener("input", tasksFilter);
formCreateProject.addEventListener("submit", onSubmitProject);
