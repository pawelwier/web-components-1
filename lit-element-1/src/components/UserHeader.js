import { html, LitElement, css } from 'lit-element';

export class UserHeader extends LitElement {
    static get styles() {
        return css`
            h3 {
                font-size: 32px;
                text-align:center
            }
        `
    }
    render() {
        return html`
            <head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
            </head>

            <div style="width:70%">
                <h3 class="mb-4">Users</h3>
                <div class="alert alert-secondary">(Click on username to edit)</div>
            </div>
        `
    }
};