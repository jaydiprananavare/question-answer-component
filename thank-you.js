import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';


class ThankYou extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <div hidden$="[[hide]]">
        <h2>Thank You</h2>
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
}

window.customElements.define('thank-you', ThankYou);