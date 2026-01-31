const taskList = document.getElementById("taskList");

const tasks = []; // ←タスクの集合
let selectedIndex = null;

const addButton = document.getElementById("addButton");
const taskInput = document.getElementById("taskInput");

addButton.addEventListener("click", () => {

  taskInput.style.display = "block";
  taskInput.focus();
});


taskInput.addEventListener("keydown", e => {
  if (e.key !== "Enter") return;
  if (taskInput.value === "") return;


  // タスク追加
  tasks.push({
    text: taskInput.value,
    subtasks: []
  });

  // 追加したタスクを選択状態に
  selectedIndex = tasks.length - 1;

  // 入力欄リセット
  taskInput.value = "";
  taskInput.style.display = "none";

  render();
});


let selected = false;

function render() {
  taskList.innerHTML = "";

 tasks.forEach((task, index) => {
  const li = document.createElement("li");
  li.textContent = task.text;

  // --- 進捗バー ---
  const progressBar = document.createElement("div");
  progressBar.style.height = "8px";
  progressBar.style.background = "#ddd";
  progressBar.style.borderRadius = "4px";
  progressBar.style.marginTop = "8px";
  progressBar.style.position = "relative";

const progressInner = document.createElement("div");

const percent = calcProgress(task);

if (percent >= 100) { // ←きらっと
  progressInner.classList.add("shine");
} else {
  progressInner.classList.remove("shine");
}

  progressInner.className = "progress-inner";
  progressInner.style.height = "100%";
  progressInner.style.width = percent.toFixed(1) + "%";

if (percent >= 100) {
  progressInner.style.background = "#4CAF50"; // 緑（完了）
  progressInner.classList.add("progress-inner"); // 光ON
} else {
  progressInner.style.background = "#4a90e2"; // 青（途中）
}
  progressInner.style.borderRadius = "4px";

  progressBar.appendChild(progressInner);


  const progressText = document.createElement("div");
  progressText.textContent = calcProgress(task).toFixed(1) + "%";
  progressText.style.position = "absolute";
  progressText.style.top = "0";
  progressText.style.left = "0";
  progressText.style.width = "100%";
  progressText.style.height = "100%";
  progressText.style.display = "flex";
  progressText.style.alignItems = "center";
  progressText.style.justifyContent = "center";
  progressText.style.fontSize = "12px";
  progressText.style.fontWeight = "bold";
  progressText.style.color = "#333";


  progressBar.appendChild(progressText);

  li.appendChild(progressBar);



  // クリックで選択
  li.addEventListener("click", () => {
      selectedIndex = index;
      render();
    });

    if (selectedIndex === index) {
      li.style.border = "2px solid blue";
      renderSubtasks(task, li);
    }

    taskList.appendChild(li);
  });

}

render();

function renderSubtasks(task, li) {
  const input = document.createElement("input");
  input.placeholder = "サブタスク（Enter）";

  input.addEventListener("click", e => e.stopPropagation());
  input.addEventListener("keydown", e => {
    e.stopPropagation();
    if (e.key === "Enter" && input.value !== "") {

      task.subtasks.push({ // ←サブタスクを追加
        text: input.value,
        done: false,
        weight: Math.random() < 0.5 ? 1 : 3
});

console.log(task.subtasks);
console.log(calcProgress(task));

      render();
    }
  });

  const ul = document.createElement("ul");

  task.subtasks.forEach(subtask => {
    const subLi = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = subtask.done;

    checkbox.addEventListener("click", e => {
      e.stopPropagation();
      subtask.done = checkbox.checked;
      render();
    });

    subLi.appendChild(checkbox);
    subLi.appendChild(document.createTextNode(subtask.text));
    ul.appendChild(subLi);
  });

  li.appendChild(input);
  li.appendChild(ul);
}

function calcProgress(task) {
  const total = task.subtasks.reduce((sum, s) => sum + s.weight, 0);
  const done = task.subtasks
    .filter(s => s.done)
    .reduce((sum, s) => sum + s.weight, 0);


  if (total === 0) return 0; // ← 先にガード

  return (done / total) * 100;

}
  return (done / total) * 100;

}


