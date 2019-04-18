import {html, PolymerElement} from '@polymer/polymer/polymer-element.js'

class QuestionElement extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host {
                display: block;
            }
        </style>
        <div hidden$="[[hide]]">
            <input name="question" value="{{question::input}}" type="string">
            <button name="submit" on-click="_fetchAnswer">submit</button>
            <div>
                <label id="answer">[[answer]]</label>
            </div>
            <button id="next-button" hidden$="[[hideNextButton]]" on-click="_dispatchNextButtonClicked">Next</button>
        </div>
      `
    }

    _status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    }

    _handleError() {
        this.dispatchEvent(new CustomEvent('api-error'));
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
        fetch('http://localhost:9000/query', requestOptions)
            .then(response => self._status(response))
            .then(response => response.json())
            .then(function (response) {
                self.answer = response.answer;
                self.hideNextButton = false;
            })
            .catch(function (err) {
                self._handleError(err);
            });
    }

    _dispatchNextButtonClicked() {
        this.dispatchEvent(new CustomEvent('next-button-clicked'));
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
