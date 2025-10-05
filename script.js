// --- Select Elements ---
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// --- Add Task Function ---
function addTask() {
  const taskText = taskInput.value.trim();

  // Prevent adding empty task
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  // Create new list item
  const li = document.createElement("li");

  // Add task text
  const textNode = document.createTextNode(taskText);
  li.appendChild(textNode);

  // Create delete button
  const deleteBtn = document.createElement("span");
  deleteBtn.textContent = "×";
  deleteBtn.classList.add("delete");

  // Append delete button to list item
  li.appendChild(deleteBtn);

  // Append list item to task list
  taskList.appendChild(li);

  // Clear input
  taskInput.value = "";

  // Save to localStorage
  saveTasks();
}

// --- Add Task with Button ---
addBtn.addEventListener("click", addTask);

// --- Add Task with Enter Key ---
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addTask();
  }
});

// --- Click Events: Delete / Mark Complete ---
taskList.addEventListener("click", function (e) {
  // --- Delete Task ---
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    saveTasks(); // update localStorage after delete
  }

  // --- Mark as Completed ---
  else if (e.target.tagName === "LI") {
    e.target.classList.toggle("completed");
    saveTasks(); // update localStorage after marking complete
  }
});

// --- Save Tasks to Local Storage ---
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// --- Load Tasks from Local Storage ---
function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add("completed");
    }

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "×";
    deleteBtn.classList.add("delete");

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// --- Load Tasks When Page Opens ---
loadTasks();
