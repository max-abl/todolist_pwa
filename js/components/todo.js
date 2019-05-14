import { LitElement, html, css, query } from "lit-element";

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

      .close {
        float: right;
        background: rgba(255, 255, 255, 0);
        border-color: rgba(255, 255, 255, 0);
        cursor: pointer;
      }
    `;
  }

  // template
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
        <button type="button" class="close" id="closeBtn" data-id="${this.id}">
          <span>&times;</span>
        </button>
      </div>
    `;
  }

  // Init rendering and event listener
  firstUpdated(changedProperties) {
    this.shadowRoot
      .getElementById("closeBtn")
      .addEventListener("click", this.handleSupress);
    this.shadowRoot
      .getElementById(this.id)
      .addEventListener("click", this.handleClick);

    // SET checked
    const inp = this.shadowRoot.getElementById(this.id);
    if (this.checked) inp.setAttribute("checked", "checked");
    else inp.removeAttribute("checked");
  }

  // Event checked
  handleClick() {
    // Maj graphique
    if (this.checked) this.setAttribute("checked", "checked");
    else this.removeAttribute("checked");

    // Création d'un evenement
    const event = new CustomEvent("checked-todo", {
      detail: { id: this.id, checked: this.checked }
    });
    document.dispatchEvent(event);
  }

  // Event supress
  handleSupress() {
    const event = new CustomEvent("supress-todo", {
      detail: { id: this.dataset.id }
    });
    document.dispatchEvent(event);

    // Suppression temporaire jusqu'au rechargement de page
    this.parentNode.style.display = "none";
  }

  // Initialisation des valeurs
  init(id, label, checked) {
    this.id = id;
    this.label = label;
    this.checked = checked;
  }
}

customElements.define("app-todo", AppTodo);
