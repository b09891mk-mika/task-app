/********************************
 * ① DOM取得（HTMLとつなぐ）
 ********************************/


const button = document.getElementById("addButton");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const clearButton = document.getElementById("clearCompleted");



/********************************
 * ② データ（タスクの中身）
 ********************************/

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let subtasks = JSON.parse(localStorage.getItem("subtasks")) || [];


/********************************
 * ③ 保存・読み込み
 ********************************/

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveSubtasks() {
  localStorage.setItem("subtasks", JSON.stringify(subtasks));
}



/********************************
 * ④ タスク表示（画面に描く）
 ********************************/

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



/********************************
 * ⑤ タスク追加
 ********************************/

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



/********************************
 * ⑥ イベント（クリック・Enter）
 ********************************/

// 追加ボタン
button.addEventListener("click", addTask);

// Enterキー
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});



/********************************
 * ⑦ 完了タスク削除
 ********************************/

clearButton.addEventListener("click", function () {
  tasks = tasks.filter(function (task) {
    return task.completed === false;
  });

  saveTasks();
  renderTasks();
});



/********************************
 * ⑧ 初期表示
 ********************************/

renderTasks();



const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");


/********************************
 * ⑨ サブタスク（実験中）
 ********************************/

const subtaskInput = document.querySelector(".subtask-input");
const subtaskList = document.querySelector(".subtask-list");
const progressText = document.querySelector("#progress");

function updateProgress() {
  const all = subtaskList.querySelectorAll("li").length;
  const done = subtaskList.querySelectorAll("input:checked").length;

  const percent = all === 0 ? 0 : Math.round((done / all) * 100);
  progressText.textContent = `進捗：${percent}%`;
}

subtaskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && subtaskInput.value !== "") {

    const li = document.createElement("li");

subtasks.push({
  text: subtaskInput.value,
  done: false
});

saveSubtasks();


    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", updateProgress);

    const span = document.createElement("span");
    span.textContent = subtaskInput.value;

    li.appendChild(checkbox);
    li.appendChild(span);
    subtaskList.appendChild(li);

    subtaskInput.value = "";
    updateProgress();
  }
});



subtasks.forEach(subtask => {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = subtask.done;

  checkbox.addEventListener("change", () => {
    subtask.done = checkbox.checked;
    saveSubtasks();
    updateProgress();
  });

  const span = document.createElement("span");
  span.textContent = subtask.text;

  li.appendChild(checkbox);
  li.appendChild(span);
  subtaskList.appendChild(li);
});

updateProgress();

