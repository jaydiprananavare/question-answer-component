import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './welcome-greeting.js'
import './error-message.js'
import './question-element.js'
import './thank-you.js'

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
        <thank-you id="thankYou"></thank-you>
        <error-message id="errorMessage"  hide-error-message="[[hideErrorMessage]]"></error-message>
      </div>
    `;
  }

  start() {
    this.init();
    this.hide = false;
    this.$.welcomeGreeting.init();
    this.$.welcomeGreeting.greet();
    this.$.welcomeGreeting.hide = false;
  }

  close() {
    this.hide = true;
    this.hideErrorMessage = true;
    this.$.welcomeGreeting.hide = true;
  }

  _changeToAskQuestionStep() {
    this.$.welcomeGreeting.hide = true;
    this.$.questionElement.init();
    this.$.questionElement.hide = false;
  }

  _changeToThankYouStep() {
     this.$.questionElement.hide = true;
     this.$.thankYou.hide = false;
  }

  _handleApiError() {
    this.hideErrorMessage = false;
  }

  init() {
    this.hide = true;
    this.$.welcomeGreeting.init();
    this.$.questionElement.init();
    this.$.thankYou.hide = true;
    this.hideErrorMessage = true;
  }

  ready() {
    super.ready();
    this.init();
  }
}

window.customElements.define('question-answer', QuestionAnswer);
