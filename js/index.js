const navbarList = document.querySelector(".navbar-nav");
const formCreateProgect = document.querySelector(".form_create_project");
const formAddTask = document.querySelector(".form_add_task");
const container = document.querySelector(".row");
const modalTask = document.getElementById("task_descroption_modal");
const buttonCreateProject = document.querySelector(".create_prog");

//FUNCTIONS DRAG---GROP///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function allowDrop(event) {
  event.preventDefault();
  if (event.target.classList.contains("droppable")) {
    event.target.style.backgroundColor = "";
  }
  newCard.addEventListener("dragleave", dragleave);
}
function dragleave(event) {
  console.log("dragleave");
  if (event.target.classList.contains("droppable")) {
    event.target.style.backgroundColor = "grey";
  }
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text/plain");
  var draggedElement = document.getElementById(data);
  draggedElement.style.position = "static";
  event.target.appendChild(draggedElement);
  document.querySelectorAll(".droppable").forEach(function (element) {
    element.style.backgroundColor = "";
  });
}

//FUNCTION CREATE COLUMN///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const createColumStart = (columnHeader, headerColor) => {
  const newColumn = document.createElement("div");
  newColumn.classList.add("col", "kb_column");
  const newCard = document.createElement("div");
  newCard.classList.add("column", "droppable", "card", "kb_column");
  newCard.innerHTML = `<div class="card-header ${headerColor}\
     text-white"><h3 class="column_tile">${columnHeader}</h3></div>`;
  container.classList.add("kb_row_container");
  container.appendChild(newColumn);
  newColumn.appendChild(newCard);

  newCard.addEventListener("dragover", allowDrop);
  newCard.addEventListener("drop", drop);
};
const createColumNew = (columnHeader, headerColor) => {
  const newColumn = document.createElement("div");
  newColumn.classList.add("col");
  const newCard = document.createElement("div");
  newCard.classList.add("column", "droppable", "card");
  newCard.innerHTML = `<div class="card-header ${headerColor}\
     text-white"><h3 class="column_tile">${columnHeader}</h3></div>`;
  container.appendChild(newColumn);
  newColumn.appendChild(newCard);

  newCard.addEventListener("dragover", allowDrop);
  newCard.addEventListener("drop", drop);
};

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
  button_add_column.addEventListener("click", () => {
    createColumNew("New", "bg-warning");
  });
  createColumStart("toDo", "bg-warning");
  createColumStart("Doing", "bg-warning");
  createColumStart("Done", "bg-warning");
}
// FUNCTION ADD TASK//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addTask(e) {
  e.preventDefault();
  const taskName = e.target.elements.task_name.value;
  const task_area = document.getElementById("textaria");
  const taskDescription = task_area.value;
  const task = document.createElement("div");

  const column = document.querySelector(".column");

  task.classList.add("bg-primary", "text-white");
  task.textContent = taskName;
  column.append(task);
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
    // console.log(event.dataTransfer);
    document.querySelectorAll(".droppable").forEach(function (element) {
      element.style.backgroundColor = "grey";
    });
  }
  task.addEventListener("dragstart", dragstart_handler);
}
