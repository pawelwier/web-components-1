import { html, LitElement } from 'lit-element';

export class User extends LitElement {
    static get properties() {
        return {
            username: {type: String},
            age: {type: Number},
            backgroundColor: {type: String},
            fontColor: {type: String}
        }
    }

    constructor() {
        super();
    }

    render() {
        return html`
        <div class="main">
            <div>Name: ${this.username}</div>
            <div>Age: ${this.age}</div>
            <button class="age-button">Hide age</button>
        </div>
        <style>
            .main {
                display: grid;
                grid-template-columns: 2fr 1fr 1fr;
                width: 400px;
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