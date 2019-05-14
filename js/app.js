import checkConnectivity from "/js/connection.js";
import { openDB } from "idb";
import AppTodo from "/js/components/todo.js";
import AppAddTodo from "./components/inptodo";

(async function(document) {
  const app = document.querySelector("#app");
  const skeleton = app.querySelector(".skeleton");
  const listPage = app.querySelector("[page=list]");
  const title = app.querySelector("#title");
  const data = await fetch("/data/todos.json");
  const json = await data.json();
  let id_value = 0;

  skeleton.removeAttribute("active");
  listPage.setAttribute("active", "");

  // Network connection
  checkConnectivity();
  document.addEventListener("connection-changed", ({ detail }) => {
    console.log(detail);
    if (detail == false) {
      title.textContent = "TODO List - offline";
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

  // Put
  await database.put("todos", json, "todos");
  database.get("todos", "todos");

  const addTodo = new AppAddTodo();
  listPage.appendChild(addTodo);

  // App
  const todos = json.map(todo => {
    const todoElement = new AppTodo();
    todoElement.init(todo.id, todo.label, todo.checked);
    listPage.appendChild(todoElement);

    if (todo.id > id_value) id_value = todo.id;
  });

  document.addEventListener("new-todo", ({ detail }) => {
    const todoElement = new AppTodo();
    id_value += 1;
    todoElement.init(id_value, detail, false);
    listPage.appendChild(todoElement);

    json.push({ id: id_value, label: detail, checked: false });
    database.put("todos", json, "todos");
  });
})(document);
