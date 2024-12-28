import { getAllColumnCurrentProdId, createColumn } from "./column.js";
import { allColumnCurrentProdId } from "./column.js";
const navbarList = document.querySelector(".navbar-nav");
const container = document.querySelector(".row");
const projectsList = document.querySelector(".projects_list");
const formCreateProgect = document.querySelector(".form_create_project");

let currentIdProject = localStorage.getItem("id");

//GET ALL PROJECTS///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getAllProjects = async () => {
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
// FUNCTION RENDER PROGECT///////////////////////////////////////////////////////////////////////////////////////////////////
export const renderProject = async (progectName) => {
  if (!navbarList || !container) {
    console.error("Не знайдено необхідних елементів на сторінці.");
    return;
  }
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
};
// SUBMIT CREATE PROGECT//////////////////////////////////////////////////////////////////////////////////////////////////////////
export function onSubmitProject(e) {
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

//GET PROJECT BY NAME//////////////////////////////////////////////////////////////////////////////////////////////////////
export const projectByName = async (projectName) => {
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
