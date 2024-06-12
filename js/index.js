const navbarList = document.querySelector(".navbar-nav");
const form = document.querySelector(".form-modal");
const form2 = document.querySelector(".form-modal2");
const container = document.querySelector(".container-main");
const modalColumn = document.getElementById("exampleModal");
const modalProject = document.getElementById("exampleModal");
const buttonCreateProject = document.querySelector(".create_prog");
const todo = document.createElement("div");
todo.classList.add("toDo");
todo.textContent = "ToDO";

const doing = document.createElement("div");
doing.classList.add("toDo");
doing.textContent = "In process";

const done = document.createElement("div");
done.classList.add("toDo");
done.textContent = "Done";

function onSubmit(e) {
  e.preventDefault();
  value = form.elements.project_name.value;
  localStorage.setItem("projectName", value.toString());
  form.reset();
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
    `<li class="nav-item"><button type="submit" class="btn-primary add_task" data-bs-toggle="modal" data-bs-target="#exampleModal2">Add new task</button></li>`
  );
  button_add_column = document.querySelector(".add_column");
  button_add_task = document.querySelector(".add_task");
  //   button_add_column.addEventListener("click", addColumn);
  button_add_task;
  form2.addEventListener("submit", addTask);
  container.append(todo, doing, done);
}

function addTask(e) {
  e.preventDefault();
  const taskName = e.target.elements.task_name.value;
  localStorage.setItem("taskName", taskName.toString());
  const task = document.createElement("div");
  task.classList.add("btn-secondary", "btn");
  task.textContent = taskName;
  todo.append(task);
  console.log("its works");
}

form.addEventListener("submit", onSubmit);
