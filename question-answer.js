import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './welcome-greeting.js'
import './error-message.js'
import './question-element.js'

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
        <question-element id="questionElement" on-api-error="_handleApiError" on-next-button-clicked="_changeToThankYouStep"></question-element>
        <error-message id="errorMessage"  hide-error-message="[[hideErrorMessage]]"></error-message>
      </div>
    `;
  }

  start() {
    this.hide = false;
    this.hideErrorMessage = true;
    this.$.welcomeGreeting.greet();
    this.$.welcomeGreeting.hide = false;
    this.$.questionElement.hide = true;
  }

  close() {
    this.hide = true;
    this.hideErrorMessage = true;
    this.$.welcomeGreeting.hide = true;
  }

  _changeToAskQuestionStep() {
    this.$.welcomeGreeting.hide = true;
    this.$.questionElement.hide = false;
  }

  _handleApiError() {
    this.hideErrorMessage = false;
  }

  ready() {
    super.ready();
    this.hideErrorMessage = true;
  }
}

window.customElements.define('question-answer', QuestionAnswer);
