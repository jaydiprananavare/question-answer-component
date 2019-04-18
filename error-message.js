import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

class ErrorMessage extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2 hidden$="[[hideErrorMessage]]">[[message]]!</h2>
    `;
  }

  static get properties() {
    return {
      message: {
        type: String,
        value: 'something went wrong'
      },
      hideErrorMessage: {
        type: Boolean,
        value: false
      }
    };
  }
}

window.customElements.define('error-message', ErrorMessage);