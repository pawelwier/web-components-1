import { html, LitElement, css } from 'lit-element';
import { v4 as uuidv4 } from 'uuid';

import { User } from './User';

customElements.define('user-record', User);

export class UserList extends LitElement {
    static get properties() {
        return {
            users: {type: Array},
            name: {type: String},
            age: {type: Number},
        }
    }

    static get styles() {
        return css`
            .add-user-form {
                display: grid;
                grid-template-columns: 2fr 2fr 1fr;
                width: 400px;
                margin-bottom: 10px;
                padding:3px;
            }
        `
    }

    constructor() {
        super();
        this.users = [
            {
                name: 'Jane',
                age: 62,
                id: uuidv4()
            },
            {
                name: 'John',
                age: 24,
                id: uuidv4()
            }, 
            {
                name: 'Bill',
                age: 39,
                id: uuidv4()
            }, 
        ];
        this.name = '';
        this.age = '';
        this.id = '';
    }

    _onAddUser(e) {
        if (!this.name || !this.age) {
            alert('Insert name and age'); 
            return;
        };
        this.users = [...this.users, {
                name: this.name,
                age: parseInt(this.age),
                id: this.id = uuidv4()
            }];
        this.name = '';
        this.age = '';
    }

    _onNameChange(e) {
        this.name = e.target.value
    }
    
    _onAgeChange(e) {
        this.age = e.target.value
    }

    _onHitEnter(e) {
        if (e.key === 'Enter') {
            this._onAddUser();
        }
    }

    _onDeleteUser(e) {
        this.users = this.users.filter(user => user.id !== e.detail.id);
    }

    render() {
        return html`
            <div @delete-event="${this._onDeleteUser}" class="user-list">
                ${this.users.map((user, index) =>
                    html`
                        <user-record 
                            fontColor=${index % 2 === 0 ? 'black' : '#e8e8e8'} 
                            backgroundColor=${index % 2 === 0 ? '#e8e8e8' : 'black'} 
                            username=${user.name} 
                            age=${user.age}
                            id=${user.id}
                            >
                        </user-record>
                    `
                )}
                <div class="add-user-form" @keyup="${this._onHitEnter}">
                    <div>
                        <input 
                            placeholder="Name:" 
                            type="text" 
                            size="10" 
                            .value="${this.name}" 
                            @change="${this._onNameChange}"
                        />
                    </div>
                    <div>
                        <input 
                            placeholder="Age:" 
                            type="text" size="10" 
                            .value="${this.age}"
                            @change="${this._onAgeChange}"
                        />
                    </div>
                    <button 
                        @click="${this._onAddUser}" 
                        class="add-user-button"
                    >
                    Add user
                    </button>
                </div>
                <div>Number of users: ${this.users.length}</div>
            </div>
        `
    }
}