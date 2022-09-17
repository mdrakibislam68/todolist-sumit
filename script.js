// document.title = "Play with DOM";
// console.dir(document);
// const container = document.querySelector(".container");

// const divElement = document.createElement("div");
// divElement.classList = "red";

// divElement.setAttribute("id", "red");
// divElement.setAttribute("title", "red div");

// const taskContainer = container.querySelector(".new-task-container");

// container.appendChild(divElement);

// const todoForm = document.querySelector(".new-task-container");
// const todoInput = todoForm.querySelector("#new-task");
// const todoAdd = todoForm.querySelector("#addTask");
// const todoLists = document.querySelector("#items");

// const createTodo = (todoId, todoValue) => {
//   const todoElement = document.createElement("li");
//   todoElement.setAttribute("class", "item");
//   todoElement.id = todoId;
//   todoElement.innerHTML = `
//     <input type="checkbox" /><label for="">${todoValue}</label>
//     `;
//   todoLists.appendChild(todoElement);
// };

// const addTodo = (event) => {
//   event.preventDefault();
//   const todoValue = todoInput.value;

//   const todoId = Date.now().toString();
//   createTodo(todoId, todoValue);
// };

// todoForm.addEventListener("submit", addTodo);

const form = document.querySelector(".new-task-container");
const newTask = form.querySelector("#new-task");
const todoAdd = form.querySelector("#addTask");
const todoUl = document.querySelector("#items");
const completeUl = document.querySelector(".completet-list ul");
let editBtn = document.querySelector(".editBtn");
// editBtn.addEventListener("click", function (event) {
//   console.log("click");
// });

let createTask = function (uniqueId, newValue) {
  let listItem = document.createElement("li");
  listItem.className = "item";
  listItem.id = uniqueId;
  let checkBox = document.createElement("input");
  checkBox.setAttribute("id", "checkBox");
  let label = document.createElement("label");
  label.id = "labet-content";

  label.innerText = newValue;
  checkBox.type = "checkBox";

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  return listItem;
};

let completeTask = function (uniqueId, newValue) {
  let listItem = this.parentNode;
  listItem.className = "complete-span";
  let span = document.createElement("span");
  listItem.appendChild(span);

  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "delete";
  span.appendChild(deleteBtn);

  let editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.className = "editBtn";
  span.appendChild(editBtn);
  editBtn.addEventListener("click", editElement);

  let checkBox = listItem.querySelector("#checkBox");
  checkBox.remove();
  completeUl.appendChild(listItem);
  bindCompleteItems(listItem, deleteTask);
  // let ul = listItem.parentNode;
  // ul.removeChild(listItem);
};
function editElement(uniqueId, newValue) {
  const editBtn = document.querySelector(".editBtn");
  const li = completeUl.querySelector(".complete-span");
  const label = li.querySelector("label");
  let listedValue = label.textContent;

  console.log(label);
  if (editBtn.textContent === "Edit") {
    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("edit-input");
    input.value = listedValue;
    label.textContent = "";
    label.appendChild(input);
    li.removeAttribute(listedValue);
    editBtn.textContent = "save";
  } else if (editBtn.textContent === "save") {
    editBtn.textContent = "Edit";
    let input = document.querySelector(".edit-input");
    label.textContent = input.value;
    let inputValue = input.value;
    let newValue = listedValue;
    // Update edit item on localStorage
    // console.log(listedValue);
    const items = getItemFromLocalStorage();

    let item = items.map((el) => {
      if (el.uniqueId == uniqueId) {
        return {
          ...el,
          newValue: inputValue,
        };
      }
      return el;
    });
    // console.log(inputValue);
    localStorage.setItem("Items", JSON.stringify(item));
  }
}

let deleteTask = function () {
  let listItem = this.parentNode;
  let span = listItem.parentNode;
  let ul = span.parentNode;
  ul.removeChild(span);
};

let bindIncompleteItems = function (listItem, checkBoxClick) {
  let checkBox = listItem.querySelector("#checkBox");
  checkBox.onchange = checkBoxClick;
};

let bindCompleteItems = function (listItem, deleteButtonClick) {
  let deleteBtn = listItem.querySelector(".delete");
  deleteBtn.onclick = deleteButtonClick;
};

// getItemFromLocalStorage
getItemFromLocalStorage = () => {
  return localStorage.getItem("Items")
    ? JSON.parse(localStorage.getItem("Items"))
    : [];
};

let addTask = function (event) {
  event.preventDefault();

  // unique Id
  const uniqueId = Date.now().toString();
  const newValue = newTask.value;
  let listItem = createTask(uniqueId, newValue);
  todoUl.appendChild(listItem);
  bindIncompleteItems(listItem, completeTask);

  // addItemToLocalStorage
  const items = getItemFromLocalStorage();
  items.push({ uniqueId, newValue });
  localStorage.setItem("Items", JSON.stringify(items));

  newTask.value = "";
};

// completeTask();
form.addEventListener("submit", addTask);
