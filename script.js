

document.addEventListener("DOMContentLoaded", () => {

console.log("JS loaded", document.body.innerHTML);
console.log("JS loaded");


// ① DOM取得
const taskList = document.getElementById("taskList");
const addButton = document.getElementById("addButton");
const taskInput = document.getElementById("taskInput");
const phaseContainer = document.getElementById("phaseContainer");

console.log("taskList:", taskList);
console.log("phaseContainer:", document.getElementById("phaseContainer"));


// ② 状態
const tasks = []; 
let selectedIndex = null;

const phases = [
  { title: "フェーズ1", tasks: [] },
  { title: "フェーズ2", tasks: [] },
  { title: "フェーズ3", tasks: [] }
];

let activePhaseIndex = 0;

//③イベント
addButton.addEventListener("click", () => {
  taskInput.classList.add("active");
  taskInput.focus();
});

taskInput.addEventListener("keydown", e => {
  if (e.key !== "Enter") return;

const text = taskInput.value.trim();
  if (text === "") return;


  tasks.push({ text, subtasks: [] });

  selectedIndex = tasks.length - 1;

  taskInput.value = "";
  taskInput.classList.remove("active");




  render();
});


taskInput.addEventListener("focus", () => {
  document.body.classList.add("quiet");
});

taskInput.addEventListener("blur", () => {
  document.body.classList.remove("quiet");
});


// ③ 関数
console.log("renderPhases fired");

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

input.focus();

}

function calcProgress(task) {
  const total = task.subtasks.reduce((sum, s) => sum + s.weight, 0);
  const done = task.subtasks
    .filter(s => s.done)
    .reduce((sum, s) => sum + s.weight, 0);


  if (total === 0) return 0; // ← 先にガード

  return (done / total) * 100;

}


function renderPhases() {
  console.log("renderPhases fired");

  phaseContainer.innerHTML = "";

  phases.forEach((phase, index) => {
    const box = document.createElement("div");
    box.className = "phase-card";

    if (index === activePhaseIndex) box.classList.add("active");
    else if (index < activePhaseIndex) box.classList.add("left");
    else box.classList.add("right");

    box.textContent = phase.title;

    phaseContainer.appendChild(box);
  });
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") {
    if (activePhaseIndex < phases.length - 1) {
      activePhaseIndex++;
      renderPhases();
    }
  }

  if (e.key === "ArrowLeft") {
    if (activePhaseIndex > 0) {
      activePhaseIndex--;
      renderPhases();
    }
  }
});

console.log("最終行 到達");

render();
renderPhases();
