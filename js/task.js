import { API_URL } from "./config.js";
let currentProject = JSON.parse(localStorage.getItem("project"));

// FUNCTION ADD TASK//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function addTasktoDB(e) {
  e.preventDefault();
  const taskName = e.target.elements.task_name.value;
  console.log(taskName);
  const taskDescription = e.target.elements.task_description.value;
  fetch(`${API_URL}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: taskName,
      description: taskDescription,
      projectId: currentProject._id,
      columnId: "9",
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderOneTask(data.name);
      e.target.reset();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

//GET ALL TASK WITH CURRENT PROJECT NAME////////////////////////////////////////////////////////////////////////////////////////////////
export const getAllTaskCurrentColumnAndProjectId = async (projectId) => {
  try {
    const response = await fetch(`${API_URL}/api/tasks/projectId/${projectId}`);
    console.log(response.status);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch current project IDs:", error);
  }
};
export function renderOneTask(taskName) {
  const column = document.querySelector(".kb_column");
  const newTask = document.createElement("div");
  newTask.classList.add("bg-primary", "text-white", "card", "kb_task_card");
  newTask.textContent = taskName;
  column.append(newTask);
  newTask.setAttribute("data-bs-toggle", "modal");
  newTask.setAttribute("data-bs-target", "#task_description_modal");
  newTask.setAttribute("draggable", true);
  newTask.setAttribute("id", "task_id");
}

// FUNCTION RENDER ALL TASK//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function renderAllTasks(currentProjectId) {
  getAllTaskCurrentColumnAndProjectId(currentProjectId).then((data) => {
    console.log(data);
    data.forEach((task) => {
      const taskElement = document.createElement("div");
      const column = document.querySelector(".kb_column");
      taskElement.textContent = task.name;
      taskElement.classList.add(
        "bg-primary",
        "text-white",
        "card",
        "kb_task_card"
      );
      taskElement.setAttribute("data-bs-toggle", "modal");
      taskElement.setAttribute("data-bs-target", "#task_description_modal");
      taskElement.setAttribute("draggable", true);
      taskElement.setAttribute("id", "task_id");
      column.append(taskElement);
      const task_modal_name = document.querySelector(".kb_task_name_modal");
      task_modal_name.textContent = task.name;
      const task_modal_description = document.querySelector(
        ".task_description_modal"
      );
      task_modal_description.textContent = task.description;
      taskElement.addEventListener("dragstart", dragstart_handler);
    });
  });
}
// FUNCTION DRAG---GROP///////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function dragstart_handler(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  document.querySelectorAll(".droppable").forEach(function (element) {
    element.style.backgroundColor = "grey";
  });
}
