import { html, LitElement } from 'lit-element';

class TodoView extends LitElement {
    static get properties() {
        return {
            todos: { type: Array },
            task: { type: String }
        }
    }
    
    constructor() {
        super();
        this.todos = [];
        this.task = '';
    }

    _onTaskInsert(e) {
        this.task = e.target.value;
    }

    _onAddTodo() {
        if (this.task) {
            this.todos = [...this.todos, {
                task: this.task,
                complete: false
            }];
            this.task = '';
        }
    }

    _onHitEnter(e) {
        if (e.key === 'Enter') {
            this._onAddTodo();
        }
    }

    _onClearComplete() {
        this.todos = this.todos.filter(todo => !todo.complete);
    }

    _onTodoUpdate(updatedTodo, complete) {
        this.todos = this.todos.map(todo => (
            todo === updatedTodo ? {...todo, complete} : todo
        ));
    }

    render() {
        return html`
        <div @keyup="${this._onHitEnter}">
            <input .value="${this.task}" @change="${this._onTaskInsert}" />
            <button @click="${this._onAddTodo}">
                Add todo
            </button>
        </div>
        <div>
            ${this.todos.map(todo => {
                return html`
                    <div>
                        <span>${todo.task}</span>
                        <input
                            type="checkbox"
                            ?checked="${todo.complete}" 
                            @change="${(e) => this._onTodoUpdate(todo, e.target.checked)}"
                        />
                    </div>
                `
            })}
        </div>
        <div>
            <select>
                <option value="All">All</option>
                <option value="Complete">Complete</option>
                <option value="Incomplete">Incomplete</option>
            </select>
            <button @click="${this._onClearComplete}">Clear complete</button>
        </div>
        `
    };
}

customElements.define('todo-view', TodoView)