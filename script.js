const taskList = document.getElementById("taskList");

const task = {
  text: "テストタスク",
  subtasks: []
};

let selected = false;

function render() {
  taskList.innerHTML = "";

  const li = document.createElement("li");
  li.textContent = task.text;

  li.addEventListener("click", () => {
    selected = true;
    render();
  });

if (selected) {
  li.style.border = "2px solid blue";
  renderSubtasks(task, li);
}
  taskList.appendChild(li);
}

render();

function renderSubtasks(task, li) {
  const input = document.createElement("input");
  input.placeholder = "サブタスク（Enter）";

  input.addEventListener("click", e => e.stopPropagation());
  input.addEventListener("keydown", (e) => {
    e.stopPropagation();
    if (e.key === "Enter" && input.value !== "") {
      task.subtasks.push(input.value);
      render();
    }
  });

  const ul = document.createElement("ul");

  task.subtasks.forEach(text => {
    const subLi = document.createElement("li");
    subLi.textContent = text;
    ul.appendChild(subLi);
  });

  li.appendChild(input);
  li.appendChild(ul);
}





updateProgress();


