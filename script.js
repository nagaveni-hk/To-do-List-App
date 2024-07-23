const addButton = document.getElementById("addButton");
const completeAllButton = document.getElementById("completeAllButton");
const clearButton = document.getElementById("clearButton");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

//event listeners for add,deleteAll and completedAll
addButton.addEventListener("click", addTask);
completeAllButton.addEventListener("click", allCompleted);
clearButton.addEventListener("click", deleteAllTasks);

//event listeners for input
taskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

//add the tasks to the list 
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="check">&#10003;</span>
      <span>${taskText}</span>
      <span class="delete">X</span>
    `;
    taskList.appendChild(li);
    taskInput.value = "";
    addEventListeners(li);
    updateTaskCount();
  }
}

//event listeners for individual task for delete and completed button
function addEventListeners(li) {
  const check = li.querySelector(".check");
  const deleteBtn = li.querySelector(".delete");
  
  check.addEventListener("click", completeTodoTask);
  deleteBtn.addEventListener("click", deleteTask);
}

//mark completed task individually and update count 
function completeTodoTask(event) {
  const check = event.target;
  const task = check.parentElement;
  task.classList.toggle("completed");
  updateTaskCount();
}

//delete individual task and update all the list
function deleteTask(event) {
  const deleteBtn = event.target;
  const task = deleteBtn.parentElement;
  taskList.removeChild(task);
  updateTaskCount();
}

//mark all the completed task
function allCompleted() {
  const tasks = taskList.children;
  let allCompleted = true;

  for (const task of tasks) {
    const check = task.querySelector(".check");
    const completed = task.classList.contains("completed");

    if (!completed) {
      allCompleted = false;
      break;
    }
  }

  for (const task of tasks) {
    const check = task.querySelector(".check");
    const completed = task.classList.contains("completed");

    if (allCompleted) {
      task.classList.remove("completed");
      if (!completed) {
        check.textContent = "";
      }
    } else {
      task.classList.add("completed");
      if (!completed) {
        check.textContent = "✓";
      }
    }
  }
  updateTaskCount();
}

//delete all the tasks
function deleteAllTasks() {
  taskList.innerHTML = ""; 
  updateTaskCount();
}

//update all the remaining completed task in the list
function updateTaskCount() {
  const totalTasks = taskList.children.length;
  const completedTasks = taskList.querySelectorAll(".completed").length;
  taskCount.textContent = `${completedTasks} tasks completed out of ${totalTasks} total tasks`;
}
