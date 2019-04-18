import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';


class WelcomeGreeting extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <div hidden$="[[hide]]">
        <h2>[[greeting]]</h2>
        <button id="next-button" hidden$="[[hideNextButton]]" on-click="_dispatchNextButtonClicked">Next</button>
      </div>
    `;
  }

  _dispatchNextButtonClicked(e) {
    this.dispatchEvent(new CustomEvent('next-button-clicked'));
  }

  _status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  }

  _handleError(errorMessage) {
    this.dispatchEvent(new CustomEvent('api-error', {bubbles: true, composed: true}));
  }

  _handleError(errorMessage) {
    this.dispatchEvent(new CustomEvent('api-error', {bubbles: true, composed: true}));
  }

  greet() {
    var self = this;
    fetch("http://localhost:9000/welcome")
      .then( response => self._status(response) )
      .then( response => response.json() )
      .then(function(response) {
        self.greeting = response.message;
        self.hideNextButton = false;
      })
      .catch(function(err) {
        if(err) {
          self._handleError(err);
          self.hideNextButton = true;
          console.log('Fetch Error :-S', err);
        }
      });
  }

  constructor() {
    super();
    this.hide = false;
    this.hideNextButton = true;
  }
}

window.customElements.define('welcome-greeting', WelcomeGreeting);
