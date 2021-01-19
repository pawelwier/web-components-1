import { html, LitElement } from 'lit-element';

export class User extends LitElement {
    static get properties() {
        return {
            id: {type: String},
            username: {type: String},
            editedUsername: {type: String},
            age: {type: Number},
            showAge: {type: Boolean},
            backgroundColor: {type: String},
            fontColor: {type: String}
        }
    }

    constructor() {
        super();
        this.editedUsername = ''
    }

    _hideShowAge(e) {
        this.showAge = !this.showAge;
        const age = e.target.parentNode.querySelector('.age');
        const ageButton = e.target.parentNode.querySelector('.age-button');
        age.style.visibility = !this.showAge ? 'visible' : 'hidden';
        ageButton.innerHTML = !this.showAge ? 'Hide age' : 'Show age';
    }

    _deleteUser(id) {
        const event = new CustomEvent('delete-event', {
            detail: {
                id 
            },
            bubbles: true,
            cancelable: true
        });
        this.dispatchEvent(event);

        return event.detail.userRecord;
    }

    _onSubmitNewUsername(e) {
        e.preventDefault();
        if (!this.editedUsername) {
            alert("Insert new username")
            return;
        };
        this.username = this.editedUsername;
        this.editedUsername = '';
    }

    _onEditedUsernameChange(e) {
        this.editedUsername = e.target.value
    }

    _onEditUsername(id) {
        this.username = html`<form @submit="${e => this._onSubmitNewUsername(e)}"><input @change="${this._onEditedUsernameChange}" .value=${this.editedUsername} size="6" /><button type="submit">OK</button></form>`
    }

    render() {
        return html`
        <div class="main">
            <div @click=${() => this._onEditUsername(this.id)}>Name: ${this.username}</div>
            <div class="age">Age: ${this.age}</div>
            <button @click=${this._hideShowAge} class="age-button">Hide age</button>
            <button @click=${() => this._deleteUser(this.id)} class="delete-user-button">Delete</button>
        </div>
        <style>
            .main {
                display: grid;
                grid-template-columns: 2fr 1fr 1fr 1fr;
                width: 500px;
                border-bottom: 2px black solid;
                margin-bottom: 10px;
                background-color: ${this.backgroundColor};
                color: ${this.fontColor};
                padding:3px;
            }
        </style>
        `
    }
};