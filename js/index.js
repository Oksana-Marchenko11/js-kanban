import { renderProject } from "./project.js";
import { onSubmitProject } from "./project.js";
import { addTask } from "./task.js";
import { tasksFilter } from "./search.js";
const formAddTask = document.querySelector(".form_add_task");
const kb_input_search = document.querySelector(".kb_input_search");
const button_create_project = document.querySelector(".create_project");

button_create_project.addEventListener("click", about);

// const modalTask = document.getElementById("task_descroption_modal");
// const cards = document.querySelectorAll(".kb_card");
function about() {
  console.log("about");
}
const data = {
  name: "Your first project",
};

let currentProject = JSON.parse(localStorage.getItem("project"));
if (!currentProject) {
  // localStorage.setItem("project", JSON.stringify(data));
  about();
}

renderProject(currentProject?.name || "Your first project");

formAddTask.addEventListener("submit", addTask);
kb_input_search.addEventListener("input", tasksFilter);
