import { onSubmitProject } from "./project.js";
import { allowDrop, dragleave, drop } from "./dropfunction.js";
import {
  addTasktoDB,
  getAllTaskCurrentColumnAndProjectId,
  renderTasks,
} from "./task.js";

export let allColumnCurrentProjectId;
const formCreateColumn = document.querySelector(".form_create_column");
const container = document.querySelector(".row");
const formCreateProject = document.querySelector(".form_create_project");
const formAddTask = document.querySelector(".form_add_task");

//GET ALL COLUMNS WITH CURRENT PROJECT NAME////////////////////////////////////////////////////////////////////////////////////////////////
export const getAllColumnCurrentProjectId = async (projectId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/column/by-project/${projectId}`
    );
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Failed to fetch current project IDs:", error);
  }
};

//FUNCTION CREATE COLUMN///////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const renderColumn = (clmn) => {
  const newColumn = document.createElement("div");
  newColumn.classList.add("col", "kb_column", "droppable");

  // const newCard = document.createElement("div");
  // newCard.classList.add("droppable", "card", "kb_card");
  newColumn.innerHTML = `
    <div class="card-header ${clmn.color} text-white" data-colomn-id=${clmn._id}>
      <h3 class="kb_card_tile">${clmn.name}</h3>
    </div>
  `;
  container.classList.add("kb_row_container"); //// всі колонки в одному рядку

  container.appendChild(newColumn);
  // newColumn.appendChild(newCard);

  // Додавання обробників подій
  newColumn.addEventListener("dragover", allowDrop);
  newColumn.addEventListener("dragleave", dragleave);
  newColumn.addEventListener("drop", drop);
  let currentProject = JSON.parse(localStorage.getItem("project"));
  getAllTaskCurrentColumnAndProjectId(currentProject._id).then((data) =>
    console.log(data)
  );

  // renderTasks(tasks);
};

//ADD COLUMN TO DB//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const dbAddColumn = (clmn) => {
  fetch("http://localhost:3000/Api/column", {
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
