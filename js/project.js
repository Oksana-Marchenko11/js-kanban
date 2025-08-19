import {
  getAllColumnCurrentProjectId,
  createColumn,
  dbAddColumn,
} from "./column.js";
const navbarList = document.querySelector(".navbar-nav");
const container = document.querySelector(".row");
const projectsList = document.querySelector(".projects_list");
const formCreateProject = document.querySelector(".form_create_project");

//GET ALL PROJECTS///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getAllProjects = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/project`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();
    data.forEach((project) => {
      projectsList.insertAdjacentHTML(
        "beforeend",
        `<li class="list-group-item list-group-item-primary"><button data-id=${project._id} class="btn btn-primary">${project.name}</button></li>`
      );
    });
  } catch (error) {
    console.error("Failed to fetch all projects", error);
  }
};
getAllProjects();

projectsList.addEventListener("click", (event) => {
  const projId = event.target.dataset.id;
  projectById(projId);
});
// FUNCTION RENDER PROJECT///////////////////////////////////////////////////////////////////////////////////////////////////
export const renderProject = async () => {
  const currentProject = JSON.parse(localStorage.getItem("project"));
  if (!currentProject || !currentProject._id) {
    console.warn("No project found in localStorage");
    return;
  }

  if (!navbarList || !container) {
    console.error("Не знайдено необхідних елементів на сторінці.");
    return;
  }

  navbarList.innerHTML = "";
  container.innerHTML = "";

  const allColumnCurrentProdId = await getAllColumnCurrentProjectId(
    currentProject._id
  );

  if (currentProject.name) {
    navbarList.insertAdjacentHTML(
      "beforeend",
      `<li class="nav-item navbar-brand">${currentProject.name}</li>`
    );
  }

  navbarList.insertAdjacentHTML(
    "beforeend",
    `<li class="nav-item navbar-brand">
       <button type="button" class="btn btn-primary create_project" data-bs-toggle="modal" data-bs-target="#create_project_modal">Create project</button>
     </li>`
  );

  navbarList.insertAdjacentHTML(
    "beforeend",
    `<li class="nav-item">
       <button class="btn btn-primary your_projects" data-bs-toggle="modal" data-bs-target="#my_projects_modal">Your projects</button>
     </li>`
  );

  navbarList.insertAdjacentHTML(
    "beforeend",
    `<li class="nav-item">
       <button class="btn btn-primary kb_add_column" data-bs-toggle="modal" data-bs-target="#create_column_modal">Add new column</button>
     </li>`
  );

  navbarList.insertAdjacentHTML(
    "beforeend",
    `<li class="nav-item">
       <button type="submit" class="btn btn-primary add_task" data-bs-toggle="modal" data-bs-target="#create_task_modal">Add new task</button>
     </li>`
  );

  if (allColumnCurrentProdId.length > 0) {
    allColumnCurrentProdId.forEach((column) => createColumn(column));
    const about = document.querySelector(".about");
    about.style.display = "none";
  } else {
    console.error("No columns found for the current project.");
  }
};

// SUBMIT CREATE PROJECT//////////////////////////////////////////////////////////////////////////////////////////////////////////
export function onSubmitProject(e) {
  e.preventDefault();
  const projectName = formCreateProject.elements.project_name.value;
  fetch("http://localhost:3000/api/project", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: projectName,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("project", JSON.stringify(data));
      Promise.all([
        dbAddColumn({
          name: "To Do",
          projectId: data._id,
          color: "bg-warning",
        }),
        dbAddColumn({
          name: "In progress",
          projectId: data._id,
          color: "bg-warning",
        }),
        dbAddColumn({ name: "Done", projectId: data._id, color: "bg-warning" }),
      ]).then(() => {
        renderProject();
        formCreateProject.reset();
      });
    })
    .catch((error) => console.log(error));
}

//GET PROJECT BY NAME//////////////////////////////////////////////////////////////////////////////////////////////////////
export const projectById = async (projectId) => {
  console.log(projectId);
  try {
    const response = await fetch(
      `http://localhost:3000/api/project/${projectId}`
    );
    const data = await response.json();
    console.log(data);
    localStorage.setItem("project", JSON.stringify(data));
    container.innerHTML = "";
    await renderProject();
  } catch (error) {
    console.error(error);
  }
};
