import { onSubmitProject } from "./project.js";
import { allowDrop, dragleave, drop } from "./dropfunction.js";
import { addTask } from "./task.js";

export const allColumnCurrentProdId = [];
const formCreateColumn = document.querySelector(".form_create_column");
const container = document.querySelector(".row");
const formCreateProgect = document.querySelector(".form_create_project");
const formAddTask = document.querySelector(".form_add_task");

let currentIdProject = localStorage.getItem("id");

//GET ALL COLUMNS WITH CURRENT PROJECT NAME////////////////////////////////////////////////////////////////////////////////////////////////
export const getAllColumnCurrentProdId = async (projectId) => {
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
//FUNCTION CREATE COLUMN///////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const createColumn = (
  columnHeader,
  headerColor,
  addRowContainer = false
) => {
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
formCreateProgect.addEventListener("submit", onSubmitProject);
