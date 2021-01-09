import { html, LitElement } from 'lit-element';

export class User extends LitElement {
    static get properties() {
        return {
            username: {type: String},
            age: {type: Number},
            showAge: {type: Boolean},
            backgroundColor: {type: String},
            fontColor: {type: String}
        }
    }

    constructor() {
        super();
    }

    _hideShowAge(e) {
        this.showAge = !this.showAge;
        const age = e.target.parentNode.querySelector('.age');
        const ageButton = e.target.parentNode.querySelector('.age-button');
        age.style.visibility = !this.showAge ? 'visible' : 'hidden';
        ageButton.innerHTML = !this.showAge ? 'Hide age' : 'Show age';
    }

    _deleteUser(e) {
        const event = new CustomEvent('delete-event', {
            detail: {
                userRecord: e.target.parentNode
            },
            bubbles: true,
            cancelable: true
        });
        
        this.dispatchEvent(event);
        console.log(event.detail.userRecord)

        return event.detail.userRecord;
    }

    render() {
        return html`
        <div class="main">
            <div>Name: ${this.username}</div>
            <div class="age">Age: ${this.age}</div>
            <button @click=${this._hideShowAge} class="age-button">Hide age</button>
            <button @click=${this._deleteUser} class="delete-user-button">Delete</button>
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