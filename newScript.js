const form = document.querySelector(".new-task-container");
const newTask = form.querySelector("#new-task");
// const todoAdd = form.querySelector("#addTask");
const incompleteUl = document.querySelector("#items");
const completeUl = document.querySelector(".completet-list ul");
let editBtn = document.querySelector(".editBtn");
let search = document.querySelector("#search");
let searchInput = document.querySelector("#search-input");

// console.log(incompleteUl);
// search.addEventListener("click", showInput);
function showInput() {
  if (searchInput.style.display === "inline-block") {
    searchInput.style.display = "none";
  } else {
    searchInput.style.display = "inline-block";
  }
}

function searchItem() {
  let input = document.querySelector("#search-input");
  let filter = input.value.toUpperCase();
  let ul = document.querySelector("#items");
  let li = ul.getElementsByTagName("li");

  for (let i = 0; i < li.length; i++) {
    let label = li[i].getElementsByTagName("label")[0];
    let txtValue = label.textContent || label.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
  //   console.log(li);
}

const createTask = (uniqueId, newValue) => {
  let listItem = document.createElement("li");
  listItem.className = "item";
  listItem.id = uniqueId;
  incompleteUl.appendChild(listItem);
  let checkBox = document.createElement("input");
  checkBox.setAttribute("id", "checkBox");
  let label = document.createElement("label");
  //   label.id = "labet-content";

  label.innerText = newValue;
  checkBox.type = "checkBox";

  listItem.appendChild(checkBox);
  listItem.appendChild(label);

  let span = document.createElement("span");
  span.className = "incom-span";
  listItem.appendChild(span);

  let editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.className = "editBtn";
  span.appendChild(editBtn);

  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "delete";
  span.appendChild(deleteBtn);

  editBtn.addEventListener("click", function () {
    let listedValue = label.textContent;
    label.id = uniqueId;

    // console.log(completeUl);
    if (editBtn.textContent === "Edit") {
      const input = document.createElement("input");
      input.type = "text";
      input.classList.add("edit-input");
      input.value = listedValue;
      label.textContent = "";
      label.appendChild(input);
      listItem.removeAttribute(listedValue);
      editBtn.textContent = "save";
    } else if (editBtn.textContent === "save") {
      editBtn.textContent = "Edit";
      let input = document.querySelector(".edit-input");
      label.textContent = input.value;
      let inputValue = input.value;

      // Update edit item on localStorage
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
      // console.log(newValue);
      localStorage.setItem("Items", JSON.stringify(item));
    }
  });
  return listItem;
};

let completeTask = function () {
  let listItem = this.parentNode;
  listItem.className = "complete-span";

  let checkBox = listItem.querySelector("#checkBox");
  checkBox.remove();

  completeUl.appendChild(listItem);
};

// delete task
let deleteTask = function () {
  let span = this.parentNode;
  let li = span.parentNode;
  let ul = li.parentNode;
  ul.removeChild(li);
  console.log(span);

  let items = getItemFromLocalStorage();

  items = items.filter((item) => item.uniqueId !== li.id);
  localStorage.setItem("Items", JSON.stringify(items));
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

  bindIncompleteItems(listItem, completeTask);
  bindCompleteItems(listItem, deleteTask);

  // addItemToLocalStorage
  const items = getItemFromLocalStorage();
  items.push({ uniqueId, newValue });
  localStorage.setItem("Items", JSON.stringify(items));

  newTask.value = "";
};

// const uniqueId = Date.now().toString();
// const newValue = newTask.value;
// let listItem = createTask(uniqueId, newValue);

const loadItems = () => {
  const items = getItemFromLocalStorage();
  //   console.log(items);

  items.map((item) => createTask(item.uniqueId, item.newValue));
  //   console.log(item);
};

// completeTask();
form.addEventListener("submit", addTask);
window.addEventListener("DOMContentLoaded", loadItems);
