const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

let tasks = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (input.value) {
    const task = {
      id: Date.now(),
      text: input.value,
      completed: false,
    };

    tasks.push(task);

    input.value = "";
    input.focus();

    displayTasks();
    saveTasks();
  }
});

function toggleTaskCompletion(id) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index !== -1) {
    tasks[index].completed = !tasks[index].completed;

    displayTasks();
    saveTasks();
  }
}

function displayTasks() {
  list.innerHTML = "";

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.setAttribute("data-id", task.id);

    const text = document.createElement("span");
    text.innerText = task.text;
    if (task.completed) {
      text.style.textDecoration = "line-through";
    }
    text.addEventListener("click", () => {
      toggleTaskCompletion(task.id);
    });

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove");
    removeBtn.innerText = "Remove";
    removeBtn.addEventListener("click", () => {
      removeTask(task.id);
    });

    removeBtn.innerHTML = `<i class="fa-solid fa-xmark" style="color: #e70d0d;"></i>`;

    const statusBtn = document.createElement("button");
    statusBtn.classList.add("mark");
    if (task.completed) {
      statusBtn.classList.add("active");
    }
    statusBtn.addEventListener("click", () => {
      toggleTaskCompletion(task.id);
      statusBtn.classList.toggle("active");
    });

    statusBtn.innerHTML = `<i class="fa-solid fa-check" style="color: #00ff59;"></i>`;

    item.appendChild(text);
    item.appendChild(removeBtn);
    item.appendChild(statusBtn);

    list.appendChild(item);
  });
}

function removeTask(id) {
  // Show modal to confirm task removal
  const modal = document.getElementById("modal");
  const confirmBtn = document.getElementById("confirmBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  modal.classList.add("show");

  confirmBtn.addEventListener("click", () => {
    tasks = tasks.filter((task) => task.id !== id);
    displayTasks();

    // Remove task from local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    modal.classList.remove("show");
  });

  cancelBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }

  displayTasks();
}

loadTasks();
