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
            this.value.trim() === "" ? this.value = "https://" : null
        })
        _('#id-url-field').addEventListener('focusout', function() {
            // this.value = ''
            this.setAttribute('placeholder', 'Type or paste url to summarize')
        })
        _('[data-summary_field_trigger="url"]').addEventListener('click', function() {
            new SummaryForm(this).activateURLSummaryField()
        })
        _('[data-summary_field_trigger="text"]').addEventListener('click', function() {
            new SummaryForm(this).activateTextSummaryField()
        })
        _('[data-summary_field_trigger="search"]').addEventListener('click', function() {
            new SummaryForm(this).activateSearchSummaryField()
        })
        // _('[data-summary_field_trigger="news"]').addEventListener('click', function() {
        //     new SummaryForm(this).activateNewsSummaryField()
        // })
    }
}