import checkConnectivity from "/js/connection.js";
import { openDB } from "idb";
import AppTodo from "/js/components/todo.js";
import AppAddTodo from "./components/inptodo";

(async function(document) {
  const app = document.querySelector("#app");
  const skeleton = app.querySelector(".skeleton");
  const listPage = app.querySelector("[page=list]");
  const title = app.querySelector("#title");
  let id_value = 0;

  skeleton.removeAttribute("active");
  listPage.setAttribute("active", "");

  // Network connection
  checkConnectivity();
  document.addEventListener("connection-changed", ({ detail }) => {
    console.log(detail);
    if (detail == false) {
      title.textContent = "TODO List - OFFLINE";
    } else {
      title.textContent = "TODO List";
    }
  });

  // DB Initialize
  const database = await openDB("app-todo", 1, {
    upgrade(db) {
      db.createObjectStore("todos");
    }
  });

  // Get data
  let json = await database.get("todos", "todos");

  // Rendering add Component
  const addTodo = new AppAddTodo();
  listPage.appendChild(addTodo);

  // Rendering todos
  if (json) {
    const todos = json.map(todo => {
      const todoElement = new AppTodo();
      todoElement.init(todo.id, todo.label, todo.checked);
      listPage.appendChild(todoElement);
      if (todo.id > id_value) id_value = todo.id;
    });
  } else {
    json = [];
  }

  // New todo event
  document.addEventListener("new-todo", ({ detail }) => {
    const todoElement = new AppTodo();
    id_value += 1;
    todoElement.init(id_value, detail, false);
    listPage.appendChild(todoElement);
    json.push({ id: id_value, label: detail, checked: false });
    database.put("todos", json, "todos");
  });

  // Checked todo event
  document.addEventListener("checked-todo", ({ detail }) => {
    const todo = json.filter(data => {
      return data.id == detail.id;
    })[0];
    json[json.indexOf(todo)].checked = detail.checked;
    database.put("todos", json, "todos");
  });

  // Checked todo event
  document.addEventListener("supress-todo", ({ detail }) => {
    json = json.filter(e => {
      return e.id != detail.id;
    });
    database.put("todos", json, "todos");
  });
})(document);
