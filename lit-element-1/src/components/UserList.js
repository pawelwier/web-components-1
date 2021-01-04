import { html, LitElement } from 'lit-element';

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

    constructor() {
        super();
        this.users = [
            {
                name: 'Jane',
                age: 62
            },
            {
                name: 'John',
                age: 24
            }, 
            {
                name: 'Bill',
                age: 39
            }, 
        ];
    }

    _onAddUser(e) {
        e.preventDefault();
        this.users = [...this.users, {
                name: this.name,
                age: this.age
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

    render() {
        return html`
            <div class="user-list">
                ${this.users.map(user =>
                    html`<user-record username=${user.name} age=${user.age}> </user-record>`
                )}
                <form class="add-user-form">
                    <div><input placeholder="Name:" type="text" size="10" value=${this.name ? this.name : ''} @change=${this._onNameChange} /></div>
                    <div><input placeholder="Age:" type="text" size="10" value=${this.age ? this.age : ''} @change=${this._onAgeChange} /></div>
                    <button @click="${this._onAddUser}" class="add-user-button" type="submit">Add user</button>
                </form>
                <div>Number of users: ${this.users.length}</div>
            </div>
            <style>
                .add-user-form {
                    display: grid;
                    grid-template-columns: 2fr 2fr 1fr;
                    width: 400px;
                    margin-bottom: 10px;
                    padding:3px;
                }
            </style>
        `
    }
}