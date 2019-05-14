import { LitElement, html, css } from "lit-element";

export default class AppTodo extends LitElement {
  // --- Constructor ---
  constructor() {
    super();
    this.id = "";
    this.label = "";
    this.checked = false;
  }

  // Properties
  static get properties() {
    return {
      id: { type: Number },
      label: { type: String },
      checked: { type: Boolean }
    };
  }

  // GET styles
  static get styles() {
    return css`
      .todo {
        background: var(--app-bg-component-color);
        padding: 10px;
        position: relative;
        margin-bottom: 10px;
        overflow: hidden;
        border-radius: 5px;
        box-shadow: var(--app-header-shadow);
        margin: 1rem;
      }

      .todo label {
        margin-left: 5px;
      }
    `;
  }

  // Rendering
  render() {
    return html`
      <style></style>
      <div class="todo">
        <input
          type="checkbox"
          title="TODO Checkbox"
          name="${this.id}"
          id="${this.id}"
          class="todocheckbox"
        /><label for="${this.id}">${this.label}</label>
      </div>
    `;
  }

  // Initialisation des valeurs
  init(id, label, checked) {
    this.id = id;
    this.label = label;
    this.checked = checked;
  }
}

customElements.define("app-todo", AppTodo);
