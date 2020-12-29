const userTemplate = document.createElement('template');
userTemplate.innerHTML = `
    <div class="main">
        <div class="user-name"></div>
        <div class="user-age"></div>
        <button class="age-button">Hide age</button>
    </div>
    <style>
        .main {
            display: grid;
            grid-template-columns: 2fr 1fr 2fr;
            width: 300px;
            border-bottom: 2px black solid;
            margin-bottom: 10px;
            background-color: #e8e8e8;
            padding:3px;
        }
    </style>
`

const allUsers = [
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
]

class UserCard extends HTMLElement {
    constructor() {
        super();

        this.showAge = true;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(userTemplate.content.cloneNode(true));
        this.shadowRoot.querySelector('.user-name').innerHTML = this.getAttribute('username');
        this.shadowRoot.querySelector('.user-age').innerHTML = this.getAttribute('age');
    }
    
    toggleAge() {
        const age = this.shadowRoot.querySelector('.user-age');
        const buttonText = this.shadowRoot.querySelector('.age-button');
        age.style.visibility = this.showAge ? 'hidden' : 'visible';
        buttonText.innerHTML = this.showAge ? 'Show age' : 'Hide age';
        this.showAge = !this.showAge;
    }
    
    connectedCallback() {
        this.shadowRoot.querySelector('.age-button').addEventListener('click', () => this.toggleAge());
    }
    
    disconnectedCallback() {
        this.shadowRoot.querySelector('.age-button').removeEventListener();
    }
    
}
window.customElements.define('user-card', UserCard);

const cardsTemplate = document.createElement('template');
cardsTemplate.innerHTML = allUsers.map((user) => (
        `<user-card username=${user.name} age=${user.age}> </user-card>`
    )).join('');

class Cards extends HTMLElement {
    constructor() {
        super();

        this.attachShadow( {mode: 'open'} );
        this.shadowRoot.appendChild(cardsTemplate.content.cloneNode(true))
    }
}

window.customElements.define('all-cards', Cards);