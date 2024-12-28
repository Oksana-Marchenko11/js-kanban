//Search///////////////////////////////////////////////////////////////////////////////////////////////////
export function tasksFilter(e) {
  e.preventDefault();
  const input = document.querySelector(".kb_input_search");
  let filter = input.value.toUpperCase();
  const tasks = document.querySelectorAll(".kb_task_card");

  tasks.forEach(function (task) {
    const txtValue = task.textContent || task.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1 || filter.length < 3) {
      task.style.display = "";
    } else {
      task.style.display = "none";
    }
  });
}
