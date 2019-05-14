import { LitElement, html, css } from "lit-element";

export default class AppAddTodo extends LitElement {
  // --- Constructor ---
  constructor() {
    super();
    this.label = "";
  }

  // Properties
  static get properties() {
    return {
      label: { type: String }
    };
  }

  // GET styles
  static get styles() {
    return css`
      .todo {
        padding: 5px;
        position: relative;
        margin-bottom: 10px;
        overflow: hidden;
        margin: 1rem;
      }

      .todo .addtodo {
        min-width: 70%;
        padding: 10px;
        display: inline;
        border-color: var(--app-bg-component-color);
        border-bottom-width: 2px;
        border-top-width: 0px;
        border-left-width: 0px;
        border-right-width: 0px;
        color: var(--app-text-color);
        text-overflow: clip;
        background: rgba(0, 0, 0, 0);
        outline: none;
        -webkit-transition: 0.5s;
        transition: 0.2s;
      }

      .btn {
        min-width: 10%;
        -webkit-border-radius: 5;
        -moz-border-radius: 5;
        border-radius: 5px;
        font-family: Arial;
        color: var(--app-text-color);
        font-size: 20px;
        background: var(--app-bg-component-color);
        padding: 5px 5px 5px 5px;
        border: solid var(--app-bg-component-color) 0px;
        text-decoration: none;
        outline: none;
      }

      .btn:hover {
        text-decoration: none;
      }

      .todo .addtodo:focus {
        border-bottom: 2px solid #555;
      }
    `;
  }

  // Event listener on the btn
  firstUpdated(_changeProperty) {
    const btn = this.shadowRoot.querySelector(".btn");
    btn.addEventListener("click", () => {
      this.addTodo();
    });
  }

  // Dispatch event for the new todo
  addTodo() {
    let inp = this.shadowRoot.querySelector("#addtodo");
    const event = new CustomEvent("new-todo", {
      detail: inp.value
    });
    document.dispatchEvent(event);
    inp.value = "";
  }

  // Rendering
  render() {
    return html`
      <div class="todo">
        <input
          type="text"
          title="Add todo"
          class="addtodo"
          id="addtodo"
          placeholder="Entrez votre tâche ici"
        />
        <button class="btn">Save</button>
      </div>
    `;
  }
}

customElements.define("app-addtodo", AppAddTodo);
