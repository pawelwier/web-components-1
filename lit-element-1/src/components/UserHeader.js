import { html, LitElement, css } from 'lit-element';

export class UserHeader extends LitElement {
    static get styles() {
        return css`
            h3 {
                font-size: 26px
            }

            .edit-username-info {
                padding-bottom:20px;
                font-size:0.9em
            }
        `
    }
    render() {
        return html`
            <h3>Users</h3>
            <div class="edit-username-info">(Click on username to edit)</div>
        `
    }
};