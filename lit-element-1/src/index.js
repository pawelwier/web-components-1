import { html, LitElement } from 'lit-element';
console.log(12)

class User extends LitElement {
    render() {
        return html`
            <div>User web component</div>
        `
    }
}

customElements.define('user-custom', User)