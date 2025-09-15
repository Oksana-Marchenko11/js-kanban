import { API_URL } from "./config.js";

// FUNCTION ADD TASK//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function addTasktoDB(e) {
  let currentProject = JSON.parse(localStorage.getItem("project"));
  e.preventDefault();
  const taskName = e.target.elements.task_name.value;
  fetch(`${API_URL}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: taskName,
      projectId: currentProject._id,
      columnId: "9",
    }),
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}
export function renderTasks() {
  const task_area = document.getElementById("textaria");
  const taskDescription = task_area.value;
  const task = document.createElement("div");

  const column = document.querySelector(".kb_column");

  task.classList.add("bg-primary", "text-white", "card", "kb_task_card");
  task.textContent = taskName;
  column.append(task);
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

//GET ALL TASK WITH CURRENT PROJECT NAME////////////////////////////////////////////////////////////////////////////////////////////////
export const getAllTaskCurrentColumnAndProjectId = async (projectId) => {
  try {
    const response = await fetch(`${API_URL}/api/tasks/projectId/${projectId}`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Failed to fetch current project IDs:", error);
  }
};
