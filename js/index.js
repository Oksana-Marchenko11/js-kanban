console.log("start");

const form = document.querySelector(".form-modal");

function onSubmit(e) {
  console.log(e);
  e.preventDefault();
  value = form.elements.project_name.value;
  localStorage.setItem("projectName", value.toString());
}

form.addEventListener("submit", onSubmit);
