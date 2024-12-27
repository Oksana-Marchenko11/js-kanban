const navbarList = document.querySelector(".navbar-nav");
const formCreateProgect = document.querySelector(".form_create_project");
const projectsList = document.querySelector(".projects_list");
const formAddTask = document.querySelector(".form_add_task");
const formCreateColumn = document.querySelector(".form_create_column");
const container = document.querySelector(".row");
const modalTask = document.getElementById("task_descroption_modal");
const kb_input_search = document.querySelector(".kb_input_search");
const cards = document.querySelectorAll(".kb_card");

//ЗМІННІ/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let currentNameProject = localStorage.getItem("name");
let currentIdProject = localStorage.getItem("id");
const allColumnCurrentProdId = [];
const allProjects = [];

//GET ALL COLUMNS WITH CURRENT PROJECT NAME////////////////////////////////////////////////////////////////////////////////////////////////
const getAllColumnCurrentProdId = async (projectId) => {
  try {
    allColumnCurrentProdId.length = 0;
    const response = await fetch(
      `http://localhost:3000/api/column/by-project/${projectId}`
    );
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();
    const columnName = data.map((data) => data.name);
    columnName.forEach((column) => allColumnCurrentProdId.push(column));
    console.log(allColumnCurrentProdId);
  } catch (error) {
    console.error("Failed to fetch current project IDs:", error);
  }
};

//GET PROJECT BY NAME//////////////////////////////////////////////////////////////////////////////////////////////////////
const projectByName = async (projectName) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/project/name/${projectName}`
    );
    const data = await response.json();
    const nameOfProject = data[0].name;
    const idOfProject = data[0]._id;
    console.log(idOfProject);
    localStorage.setItem("name", `${nameOfProject}`);
    localStorage.setItem("id", `${idOfProject}`);
    currentIdProject = localStorage.getItem("id");
    container.innerHTML = "";
    renderProject(nameOfProject);
  } catch (error) {
    console.error(error);
  }
};

//MY PROJECTS///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getAllProjects = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/project`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();
    const projectsName = data.map((data) => data.name);
    projectsName.forEach((project) => {
      projectsList.insertAdjacentHTML(
        "beforeend",
        `<li class="list-group-item list-group-item-primary"><button class="btn btn-primary">${project}</button></li>`
      );
    });
  } catch (error) {
    console.error("Failed to fetch all projects", error);
  }
};
getAllProjects();

projectsList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const buttonText = event.target.textContent;
    projectByName(buttonText);
  }
});

//FUNCTION CREATE COLUMN///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const createColumn = (columnHeader, headerColor, addRowContainer = false) => {
  const newColumn = document.createElement("div");
  newColumn.classList.add("col", "kb_column");

  const newCard = document.createElement("div");
  newCard.classList.add("droppable", "card", "kb_card");
  newCard.innerHTML = `
    <div class="card-header ${headerColor} text-white">
      <h3 class="kb_card_tile">${columnHeader}</h3>
    </div>
  `;

  if (addRowContainer) {
    container.classList.add("kb_row_container");
  }

  container.appendChild(newColumn);
  newColumn.appendChild(newCard);

  // Додавання обробників подій
  newCard.addEventListener("dragover", allowDrop);
  newCard.addEventListener("dragleave", dragleave);
  newCard.addEventListener("drop", drop);
};

//SUBMIT NEW COLUMN////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const onSubmitCreateColumn = (e) => {
  e.preventDefault();
  const columnName = e.target.elements.column_name.value;
  createColumn(columnName, "bg-warning");
  fetch("http://localhost:3000/Api/column", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: columnName,
      projectId: currentIdProject,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

formCreateColumn.addEventListener("submit", onSubmitCreateColumn);
// FUNCTION RENDER PROGECT///////////////////////////////////////////////////////////////////////////////////////////////////
async function renderProject(progectName) {
  navbarList.innerHTML = "";
  container.innerHTML = "";

  await getAllColumnCurrentProdId(currentIdProject);

  navbarList.insertAdjacentHTML(
    "beforeend",
    `<li class="nav-item, navbar-brand" >${progectName}</li>`
  );
  navbarList.insertAdjacentHTML(
    "beforeend",
    `<li class="nav-item, navbar-brand"><button type="button" class="btn btn-primary create_prog" data-bs-toggle="modal" data-bs-target="#create_progect_modal">
                            Create progect
                        </button></li>`
  );
  navbarList.insertAdjacentHTML(
    "beforeend",
    `<li class="nav-item"><button class="btn-primary your_projects" data-bs-toggle="modal" data-bs-target="#my_projects_modal">Your projects</button></li>`
  );
  navbarList.insertAdjacentHTML(
    "beforeend",
    `<li class="nav-item"><button class="btn-primary kb_add_column" data-bs-toggle="modal" data-bs-target="#create_column_modal">Add new coloumn</button></li>`
  );
  navbarList.insertAdjacentHTML(
    "beforeend",
    `<li class="nav-item"><button type="submit" class="btn-primary add_task" data-bs-toggle="modal" data-bs-target="#create_task_modal">Add new task</button></li>`
  );
  createColumn("To Do", "bg-warning", true);
  createColumn("In progress", "bg-warning", true);
  createColumn("Done", "bg-warning", true);

  if (allColumnCurrentProdId.length > 0) {
    allColumnCurrentProdId.forEach((column) =>
      createColumn(column, "bg-warning")
    );
  } else {
    console.error("No columns found for the current project.");
  }
}

// SUBMIT CREATE PROGECT//////////////////////////////////////////////////////////////////////////////////////////////////////////
formCreateProgect.addEventListener("submit", onSubmitProject);
function onSubmitProject(e) {
  e.preventDefault();
  const progectName = formCreateProgect.elements.project_name.value;
  localStorage.setItem("projectName", `${progectName}`);
  fetch("http://localhost:3000/Api/project", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: progectName,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));

  formCreateProgect.reset();
  navbarList.innerHTML = "";
  renderProject(progectName);
}

// FUNCTION ADD TASK//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addTask(e) {
  e.preventDefault();
  const taskName = e.target.elements.task_name.value;
  fetch("http://localhost:3000/Api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: taskName,
      projectId: currentIdProject,
      columnId: "8",
    }),
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
  const task_area = document.getElementById("textaria");
  const taskDescription = task_area.value;
  const task = document.createElement("div");

  const card = document.querySelector(".kb_card");

  task.classList.add("bg-primary", "text-white", "card", "kb_task_card");
  task.textContent = taskName;
  card.append(task);
  task.setAttribute("data-bs-toggle", "modal");
  task.setAttribute("data-bs-target", "#task_description_modal");
  task.setAttribute("draggable", true);
  task.setAttribute("id", "task_id");

  const task_modal_name = document.querySelector(".kb_task_name_modal");
  task_modal_name.textContent = taskName;
  const task_modal_description = document.querySelector(
    ".task_description_modal"
  );
  task_modal_description.textContent = taskDescription;

  function dragstart_handler(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.effectAllowed = "move";
    document.querySelectorAll(".droppable").forEach(function (element) {
      element.style.backgroundColor = "grey";
    });
  }
  task.addEventListener("dragstart", dragstart_handler);
}
formAddTask.addEventListener("submit", addTask);
//Search///////////////////////////////////////////////////////////////////////////////////////////////////
function tasksFilter(e) {
  e.preventDefault();
  const input = document.querySelector(".kb_input_search");
  let filter = input.value.toUpperCase();
  tasks = document.querySelectorAll(".kb_task_card");

  tasks.forEach(function (task) {
    txtValue = task.textContent || task.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1 || filter.length < 3) {
      task.style.display = "";
    } else {
      task.style.display = "none";
    }
  });
}
kb_input_search.addEventListener("input", tasksFilter);

//FUNCTIONS DRAG---GROP///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function allowDrop(event) {
  event.preventDefault();
  if (event.target.classList.contains("droppable")) {
    event.target.style.backgroundColor = "";
  }
}
function dragleave(event) {
  event.target.style.backgroundColor = "grey";
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

renderProject(currentNameProject);
