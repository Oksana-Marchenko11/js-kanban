const navbarList = document.querySelector(".navbar-nav");
const formCreateProgect = document.querySelector(".form_create_project");
const formAddTask = document.querySelector(".form_add_task");
const container = document.querySelector(".container-main");
const modalTask = document.getElementById("task_descroption_modal");
const buttonCreateProject = document.querySelector(".create_prog");

const todo = document.createElement("div");
todo.classList.add("toDo", "droppable");
todo.setAttribute("ondrop", "drop(event)");
todo.setAttribute("ondragover", "allowDrop(event)");
todo.textContent = "ToDO";

const doing = document.createElement("div");
doing.classList.add("toDo", "droppable");
doing.setAttribute("ondrop", "drop(event)");
doing.setAttribute("ondragover", "allowDrop(event)");
doing.textContent = "In process";

const done = document.createElement("div");
done.classList.add("toDo", "droppable");
done.setAttribute("ondrop", "drop(event)");
done.setAttribute("ondragover", "allowDrop(event)");
done.textContent = "Done";

function allowDrop(event) {
  event.preventDefault();
  event.target.style.backgroundColor = "";
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text/plain");
  var draggedElement = document.getElementById(data);

  draggedElement.style.position = "static";
  event.target.appendChild(draggedElement);
}
// SUBMIT CREATE PROGECT/////////////////////////////////////////////////////////////////////////////////////////////////////////
formCreateProgect.addEventListener("submit", onSubmit);
function onSubmit(e) {
  e.preventDefault();
  value = formCreateProgect.elements.project_name.value;
  formCreateProgect.reset();
  buttonCreateProject.style.display = "none";
  const progectName = value;
  navbarList.insertAdjacentHTML(
    "beforeend",
    `<li class="nav-item, navbar-brand" >${progectName}</li>`
  );
  navbarList.insertAdjacentHTML(
    "beforeend",
    `<li class="nav-item"><button class="btn-primary add_column">Add new coloumn</button></li>`
  );
  navbarList.insertAdjacentHTML(
    "beforeend",
    `<li class="nav-item"><button type="submit" class="btn-primary add_task" data-bs-toggle="modal" data-bs-target="#create_task_modal">Add new task</button></li>`
  );
  button_add_column = document.querySelector(".add_column");
  button_add_task = document.querySelector(".add_task");
  formAddTask.addEventListener("submit", addTask);
  container.append(todo, doing, done);
}
// FUNCTION ADD TASK//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addTask(e) {
  e.preventDefault();
  const taskName = e.target.elements.task_name.value;
  const task_area = document.getElementById("textaria");
  const taskDescription = task_area.value;
  const task = document.createElement("div");

  task.classList.add("btn-secondary", "btn", "task");
  task.textContent = taskName;
  todo.append(task);
  task.setAttribute("data-bs-toggle", "modal");
  task.setAttribute("data-bs-target", "#task_descroption_modal");
  task.setAttribute("draggable", true);
  task.setAttribute("id", "task_id");

  const task_modal_name = document.getElementById("task_name_modal");
  task_modal_name.textContent = taskName;
  const task_modal_description = document.querySelector(
    ".task_description_modal"
  );
  task_modal_description.textContent = taskDescription;
  function dragstart_handler(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.effectAllowed = "move";
    console.log(event.dataTransfer);
    document.querySelectorAll(".droppable").forEach(function (element) {
      element.style.backgroundColor = "grey";
    });
  }
  task.addEventListener("dragstart", dragstart_handler);
}
