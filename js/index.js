const navbarList = document.querySelector(".navbar-nav");
const formCreateProgect = document.querySelector(".form_create_project");
const formAddTask = document.querySelector(".form_add_task");
const container = document.querySelector(".container-main");
const modalTask = document.getElementById("task_descroption_modal");
const buttonCreateProject = document.querySelector(".create_prog");

const todo = document.createElement("div");
todo.classList.add("toDo", "droppable");
todo.textContent = "ToDO";

const doing = document.createElement("div");
doing.classList.add("toDo", "droppable");
doing.textContent = "In process";

const done = document.createElement("div");
done.classList.add("toDo", "droppable");
done.textContent = "Done";

// SUBMIT CREATE PROGECT/////////////////////////////////////////////////////////////////////////////////////////////////////////
formCreateProgect.addEventListener("submit", onSubmit);
function onSubmit(e) {
  e.preventDefault();
  value = formCreateProgect.elements.project_name.value;
  formCreateProgect.reset();
  buttonCreateProject.style.display = "none";
  const progectName = value;
  navbarList.insertAdjacentHTML(
    "beforeend",
    `<li class="nav-item, navbar-brand" >${progectName}</li>`
  );
  navbarList.insertAdjacentHTML(
    "beforeend",
    `<li class="nav-item"><button class="btn-primary add_column">Add new coloumn</button></li>`
  );
  navbarList.insertAdjacentHTML(
    "beforeend",
    `<li class="nav-item"><button type="submit" class="btn-primary add_task" data-bs-toggle="modal" data-bs-target="#create_task_modal">Add new task</button></li>`
  );
  button_add_column = document.querySelector(".add_column");
  button_add_task = document.querySelector(".add_task");
  formAddTask.addEventListener("submit", addTask);
  container.append(todo, doing, done);
}
// FUNCTION ADD TASK//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addTask(e) {
  e.preventDefault();
  const taskName = e.target.elements.task_name.value;
  const task_area = document.getElementById("textaria");
  const taskDescription = task_area.value;
  const task = document.createElement("div");

  task.classList.add("btn-secondary", "btn", "task");
  task.textContent = taskName;
  todo.append(task);
  task.setAttribute("data-bs-toggle", "modal");
  task.setAttribute("data-bs-target", "#task_descroption_modal");

  const task_modal_name = document.getElementById("task_name_modal");
  task_modal_name.textContent = taskName;
  const task_modal_description = document.querySelector(
    ".task_description_modal"
  );
  task_modal_description.textContent = taskDescription;

  let currentDroppable;

  // task.addEventListener("click", modalTask.show());

  //MOUSE DOWN////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  task.addEventListener("mousedown", onmousedown);
  function onmousedown(event) {
    let shiftX = event.clientX - task.getBoundingClientRect().left;
    let shiftY = event.clientY - task.getBoundingClientRect().top;
    task.style.position = "absolute";
    task.style.zIndex = 1000;
    document.body.append(task);

    function moveAt(pageX, pageY) {
      task.style.left = pageX - shiftX + "px";
      task.style.top = pageY - shiftY + "px";
    }
    //MOUSE MOVE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    document.addEventListener("mousemove", onMouseMove);
    function onMouseMove(event) {
      todo.classList.add("grey");
      doing.classList.add("grey");
      done.classList.add("grey");
      moveAt(event.pageX, event.pageY);
      task.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      task.hidden = false;

      let droppableBelow = elemBelow.closest(".droppable") || undefined;
      if (droppableBelow) {
        droppableBelow.classList.remove("grey");
        //MOUSE UP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        task.addEventListener("mouseup", function () {
          console.log("Mouse up event fired");
          task.style.position = "static";
          droppableBelow.append(task);
          currentDroppable = droppableBelow;
        });
      }
    }

    // if (!elemBelow) return;

    // let droppableBelow = elemBelow.closest(".droppable");

    // if (currentDroppable !== droppableBelow) {
    //   if (currentDroppable) {
    //     leaveDroppable(currentDroppable);
    //   }
    //   currentDroppable = droppableBelow;
    //   if (currentDroppable) {
    //     enterDroppable(currentDroppable);
    //   }
    // }
    // doing.onmouseover = function () {
    //   console.log("a");
    //   doing.classList.add("red");
    // };
    // doing.onmouseout = function () {
    //   console.log("b");
    //   doing.classList.remove("red");
    // };
  }

  // task.onmouseup = function () {
  //   document.removeEventListener("mousemove", onMouseMove);
  //   task.onmouseup = null;
  // };
}
