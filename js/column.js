import { onSubmitProject } from "./project.js";
import { allowDrop, dragleave, drop } from "./dropfunction.js";
import { renderAllTasks } from "./task.js";
import { API_URL } from "./config.js";

export let allColumnCurrentProjectId;
const formCreateColumn = document.querySelector(".form_create_column");
const container = document.querySelector(".row");
const formCreateProject = document.querySelector(".form_create_project");

//GET ALL COLUMNS WITH CURRENT PROJECT NAME////////////////////////////////////////////////////////////////////////////////////////////////
export const getAllColumnCurrentProjectId = async (projectId) => {
  try {
    const response = await fetch(
      `${API_URL}/api/column/by-project/${projectId}`
    );
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Failed to fetch current project IDs:", error);
  }
};

//FUNCTION RENDER COLUMN///////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const renderColumn = (clmn) => {
  const newColumn = document.createElement("div");
  newColumn.classList.add("col", "kb_column", "droppable");
  newColumn.setAttribute("draggable", true);

  newColumn.innerHTML = `
    <div class="card-header ${clmn.color} text-white" data-colomn-id=${clmn._id}>
      <h3 class="kb_card_tile">${clmn.name}</h3>
    </div>
  `;
  container.classList.add("kb_row_container");

  container.appendChild(newColumn);
  // newColumn.appendChild(newCard);

  // Додавання обробників подій
  newColumn.addEventListener("dragover", allowDrop);
  newColumn.addEventListener("dragleave", dragleave);
  newColumn.addEventListener("drop", drop);
  let currentProject = JSON.parse(localStorage.getItem("project"));
  renderAllTasks(currentProject._id, clmn._id);
};

//ADD COLUMN TO DB//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const dbAddColumn = (clmn) => {
  fetch(`${API_URL}/api/column`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clmn),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

//SUBMIT NEW COLUMN////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const onSubmitCreateColumn = (e) => {
  e.preventDefault();
  const columnName = e.target.elements.column_name.value;
  let currentProject = JSON.parse(localStorage.getItem("project"));

  const clmn = {
    name: columnName,
    projectId: currentProject._id,
    color: "bg-warning",
  };

  dbAddColumn(clmn);
  renderColumn(clmn);
};

formCreateColumn.addEventListener("submit", onSubmitCreateColumn);
formCreateProject.addEventListener("submit", onSubmitProject);
