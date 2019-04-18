import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './welcome-greeting.js'
import './error-message.js'

class QuestionAnswer extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <div hidden$="[[hide]]">
        <welcome-greeting id="welcomeGreeting" on-api-error="_handleApiError" on-next-button-clicked="_changeToAskQuestionStep"></welcome-greeting>
        <error-message id="errorMessage"  hide-error-message="[[hideErrorMessage]]"></error-message>
      </div>
    `;
  }

  start() {
    this.hide = false;
    this.hideErrorMessage = true;
    this.$.welcomeGreeting.greet();
    this.$.welcomeGreeting.hide = false;
  }

  close() {
    this.hide = true;
  }

  _changeToAskQuestionStep() {
    this.$.welcomeGreeting.hide = true;
  }

  _handleApiError(e) {
    this.hideErrorMessage = false;
  }


}

window.customElements.define('question-answer', QuestionAnswer);
