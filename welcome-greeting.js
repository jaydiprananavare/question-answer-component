import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {APIHelper} from './APIHelper.js'


class WelcomeGreeting extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <div hidden$="[[hide]]">
        <h2 id="GreetingMessage" hidden$="[[hideGreeting]]">[[greeting]]</h2>
        <button id="NextButton" hidden$="[[hideNextButton]]" on-click="_dispatchNextButtonClicked">Next</button>
      </div>
    `;
  }

  _dispatchNextButtonClicked() {
    this.dispatchEvent(new CustomEvent('next-button-clicked', {detail : "next button clicked"}));
  }

  _handleError(errorMessage) {
    this.hideGreeting = true;
    this.dispatchEvent(new CustomEvent('api-error', {detail: errorMessage}));
  }

  greet() {
    var self = this;
      APIHelper.getJsonResponse('/welcome')
      .then(function(response) {
        self.greeting = response.message;
        self.hideGreeting = false;
        self.hideNextButton = false;
        self.hide = false;
      })
      .catch(function(err) {
        if(err) {
          self.hideNextButton = true;
          self._handleError(err);
          console.log('Fetch Error :-S', err);
        }
      });
  }

  init() {
    this.hide = true;
    this.hideGreeting = true;
    this.hideNextButton = true;
    this.greeting = '';
  }

  constructor() {
    super();
    this.init();
  }
}

window.customElements.define('welcome-greeting', WelcomeGreeting);
