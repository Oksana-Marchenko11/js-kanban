import { API_URL } from "./config.js";
let currentProject = JSON.parse(localStorage.getItem("project"));

// FUNCTION ADD TASK//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function addTasktoDB(e) {
  e.preventDefault();
  const taskName = e.target.elements.task_name.value;
  console.log(taskName);
  const taskDescription = e.target.elements.task_description.value;
  receiveColumnId(currentProject._id).then((columnId) => {
    fetch(`${API_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: taskName,
        description: taskDescription,
        projectId: currentProject._id,
        columnId: columnId,
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
        renderOneTask(data);
        e.target.reset();
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  });
}

//GET ALL TASK WITH CURRENT PROJECT NAME////////////////////////////////////////////////////////////////////////////////////////////////
export const getAllTaskCurrentColumnAndProjectId = async (
  projectId,
  columnId
) => {
  try {
    const response = await fetch(
      `${API_URL}/api/tasks/projectId/${projectId}/${columnId}`
    );
    console.log(response.status);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch current project IDs:", error);
  }
};
export function renderOneTask(task) {
  const column = document.querySelector(`[data-column-id="${task.columnId}"]`);
  const newTask = document.createElement("div");

  newTask.classList.add("bg-primary", "text-white", "card", "kb_task_card");
  newTask.textContent = task.name;

  newTask.setAttribute("draggable", true);
  newTask.setAttribute("id", task._id);
  newTask.addEventListener("dragstart", dragstart_handler);

  newTask.setAttribute("data-bs-toggle", "modal");
  newTask.setAttribute("data-bs-target", "#task_description_modal");
  newTask.addEventListener("click", () => {
    document.querySelector(".kb_task_name_modal").textContent = task.name;
    document.querySelector(".task_description_modal").textContent =
      task.description || "No description";
  });
  column.append(newTask);
}

// FUNCTION RENDER ALL TASK//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function renderAllTasks(currentProjectId, columnId) {
  getAllTaskCurrentColumnAndProjectId(currentProjectId, columnId).then(
    (data) => {
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

        taskElement.addEventListener("click", () => {
          const task_modal_name = document.querySelector(".kb_task_name_modal");
          task_modal_name.textContent = task.name;

          const task_modal_description = document.querySelector(
            ".task_description_modal"
          );
          task_modal_description.textContent =
            task.description || "No description";
        });
        column.append(taskElement);

        taskElement.addEventListener("dragstart", dragstart_handler);
      });
    }
  );
}
// FUNCTION DRAG---DROP///////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function dragstart_handler(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  document.querySelectorAll(".droppable").forEach(function (element) {
    element.style.backgroundColor = "grey";
  });
}
// FUNCTION RECEIVE COLUMN ID/////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function receiveColumnId(currentProjectId) {
  try {
    const res = await fetch(
      `${API_URL}/api/column/todo-by-project/${currentProjectId}`
    );
    if (!res.ok) throw new Error(`Error fetching column: ${res.status}`);
    const data = await res.json();

    const todoColumn = data.find((column) => column.name === "To Do");
    if (!todoColumn) throw new Error("Todo column not found");

    console.log("Todo columnId:", todoColumn._id);
    return todoColumn._id;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
