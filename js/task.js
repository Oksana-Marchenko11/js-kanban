let currentIdProject = localStorage.getItem("id");

// FUNCTION ADD TASK//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function addTask(e) {
  e.preventDefault();
  const taskName = e.target.elements.task_name.value;
  fetch("http://kbapi.oksi.pp.ua/Api/tasks", {
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
