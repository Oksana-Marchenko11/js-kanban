const navbarList = document.querySelector(".navbar-nav");
const form = document.querySelector(".form-modal");
const container = document.querySelector(".container-main");
const modal = document.getElementById("#exampleModal");
const itemCreateProject = document.querySelector(".create_prog");
const todo = document.createElement("div");
todo.classList.add("toDo");
todo.textContent = "ToDO";

const doing = document.createElement("div");
doing.classList.add("toDo");
doing.textContent = "In process";

const done = document.createElement("div");
done.classList.add("toDo");
done.textContent = "Done";

const button_create_task = document.createElement("button");
button_create_task.classList.add("btn-primary", "btn");
button_create_task.textContent = "New task";

function onSubmit(e) {
  e.preventDefault();
  value = form.elements.project_name.value;
  localStorage.setItem("projectName", value.toString());
  form.reset();
  itemCreateProject.innerHTML = `<li >${localStorage.getItem(
    "projectName"
  )}</li>`;
  navbarList.append(button_create_task);
  container.append(todo, doing, done);
}

function onclick() {
  const task = document.createElement("div");
  task.classList.add("btn-secondary", "btn");
  task.textContent = "TASK";
  todo.append(task);
  console.log("its works");
}

form.addEventListener("submit", onSubmit);
button_create_task.addEventListener("click", onclick);
