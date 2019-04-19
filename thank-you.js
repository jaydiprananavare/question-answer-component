import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';


class ThankYou extends PolymerElement {
  static get template() {
    return html`
      <div hidden$="[[hide]]">
        <h2>[[message]]</h2>
      </div>
    `
  }

  static get properties() {
    return {
      message: {
        type: String,
        value: 'Thank You'
      },
      hide: {
        type: Boolean,
        value: true
      }
    };
  }

  init() {
    this.hide = true;
  }
}

window.customElements.define('thank-you', ThankYou);