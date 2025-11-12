const taskForm = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

let total = 0;
let completed = 0;

// Add task on form submit
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});

function addTask() {
  const taskText = input.value.trim();
  if (!taskText) return alert("Please enter a task!");

  total++;
  const li = document.createElement("li");
  li.className = "task";
  li.innerHTML = `
    <input type="checkbox" />
    <span>${taskText}</span>
    <div class="task-buttons">
      <button class="complete-btn">Complete</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  taskList.appendChild(li);
  input.value = "";
  updateFooter();

  const checkbox = li.querySelector("input[type='checkbox']");
  const span = li.querySelector("span");

  // Checkbox logic
  checkbox.addEventListener("change", (e) => {
    if (e.target.checked) {
      span.style.textDecoration = "line-through";
      completed++;
    } else {
      span.style.textDecoration = "none";
      completed--;
    }
    updateFooter();
  });

  // Complete button
  li.querySelector(".complete-btn").addEventListener("click", () => {
    if (!checkbox.checked) {
      checkbox.checked = true;
      span.style.textDecoration = "line-through";
      completed++;
      updateFooter();
    }
  });

  // Delete button
  li.querySelector(".delete-btn").addEventListener("click", () => {
    if (checkbox.checked) completed--;
    li.remove();
    total--;
    updateFooter();
  });
}

function updateFooter() {
  totalTasks.textContent = `Total Tasks: ${total}`;
  completedTasks.textContent = `Completed: ${completed}`;
}
