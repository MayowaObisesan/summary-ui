import {_} from "./helpers.js";

export class EventHandler {
    /**
     * This class houses all eventListeners to be used within the Summary page.
     * Date: December 28, 2022.
     */
    constructor() {
    }

    Listen() {
        /* URL FIELD FOCUS IN EVENT */
        _('#id-url-field').addEventListener('focusin', function() {
            this.setAttribute('placeholder', 'https://')
            this.value = "https://"
        })
        _('#id-url-field').addEventListener('focusout', function() {
            // this.value = ''
            this.setAttribute('placeholder', 'Type or paste url to summarize')
        })
    }
}