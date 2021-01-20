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
        this.username = html`
            <form @submit="${e => this._onSubmitNewUsername(e)}">
                <input class="form-control mr-2" style="width: 50%;float:left" @change="${this._onEditedUsernameChange}" .value=${this.editedUsername} size="6" />
                <button class="btn btn-warning btn-sm" type="submit">
                    OK
                </button>
            </form>
        `
    }

    render() {
        return html`
        <head>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
        </head>
        <div class="main">
            <div @click=${() => this._onEditUsername(this.id)} class="username">Name: ${this.username}</div>
            <div class="age">Age: ${this.age}</div>
            <button @click=${this._hideShowAge} class="btn btn-warning btn-sm mr-4 age-button">Hide age</button>
            <button @click=${() => this._deleteUser(this.id)} class="btn btn-danger btn-sm delete-user-button">Delete</button>
        </div>
        <style>
            .main {
                display: grid;
                grid-template-columns: 2fr 1fr 1fr 1fr;
                width: 70%;
                border-bottom: 2px black solid;
                margin-bottom: 10px;
                background-color: ${this.backgroundColor};
                color: ${this.fontColor};
                padding:3px;
            }
            .username:hover {
                cursor:pointer
            }
        </style>
        `
    }
};