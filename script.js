const button = document.getElementById("addButton");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const clearButton = document.getElementById("clearCompleted");

// 保存されているタスクを読み込む
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 保存
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 画面に表示
function renderTasks() {
  list.innerHTML = "";

  const sortedTasks = tasks.slice().sort(function (a, b) {
  return a.completed - b.completed;
});

sortedTasks.forEach(function (task, index) {

    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add("completed");
    }

    li.addEventListener("click", function () {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    list.appendChild(li);
  });
}

// タスク追加
function addTask() {
  const taskText = input.value.trim();

  if (taskText === "") {
    return;
  }

  tasks.push({
    text: taskText,
    completed: false
  });

  saveTasks();
  renderTasks();
  input.value = "";
}

// 追加ボタン
button.addEventListener("click", addTask);

// Enterキー
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// 完了タスク削除
clearButton.addEventListener("click", function () {
  tasks = tasks.filter(function (task) {
    return task.completed === false;
  });

  saveTasks();
  renderTasks();
});

// 初回表示
renderTasks();
