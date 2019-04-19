export class APIHelper {

    static getJsonResponse(uri, requestOption) {
        return fetch('http://localhost:9000' + uri, requestOption)
            .then(response => this._status(response))
            .then(response => response.json())

    }

    static _status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    }
}

