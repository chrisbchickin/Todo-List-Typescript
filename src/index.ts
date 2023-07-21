import { v4 as uuidV4 } from "uuid";


type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector<HTMLFormElement>('#new-task-form');
const input = document.querySelector<HTMLInputElement>('#new-task-title');
const tasks: Task[] = loadTasks();

tasks.forEach(addListItem);

form?.addEventListener('submit', e => {
  e.preventDefault();

  if (input?.value == "" || input?.value == null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }

  addListItem(newTask);
  tasks.push(newTask);
  saveTasks();
  input.value = '';
})




function addListItem (task: Task) {
    const item = document.createElement("li");
    const label = document.createElement("label");
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = task.completed;
    checkBox.addEventListener('change', () => {
      task.completed = checkBox.checked;
      saveTasks();
    })
    label.append(checkBox, task.title);
    item.append(label);
    list?.append(item);
}

function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem('TASKS');
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}