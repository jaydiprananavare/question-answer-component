import {html, PolymerElement} from '@polymer/polymer/polymer-element.js'
import {APIHelper} from "./APIHelper";

class QuestionElement extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host {
                display: block;
            }
        </style>
        <div hidden$="[[hide]]">
            <input value="{{question::input}}" type="string">
            <button on-click="_fetchAnswer">submit</button>
            <div id="AnswerDiv">
                <label>[[answer]]</label>
            </div>
            <button id="NextButton" hidden$="[[hideNextButton]]" on-click="_dispatchNextButtonClicked">Next</button>
        </div>
      `
    }

    _handleError(errorMessage) {
        this.dispatchEvent(new CustomEvent('api-error', {detail: errorMessage}));
    }

    _fetchAnswer() {
        var self = this;
        let requestOptions = {
            'method': 'post',
            'headers': {
                'Content-Type': 'text/plain'
            },
            'body': this.question
        };

        APIHelper.getJsonResponse('/query', requestOptions)
            .then(function (response) {
                self.answer = response.answer;
                self.hideNextButton = false;
            })
            .catch(function (err) {
                self._handleError(err);
            });
    }

    _dispatchNextButtonClicked() {
        this.dispatchEvent(new CustomEvent('next-button-clicked', {detail : "next button clicked"}));
    }

    init() {
       this.hide = true;
       this.hideNextButton = true;
       this.question = this.answer = "";
    }

    constructor() {
        super();
        this.init();
    }
}

window.customElements.define('question-element', QuestionElement);
