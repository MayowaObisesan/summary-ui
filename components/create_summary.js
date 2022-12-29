class CreateSummary extends HTMLElement {
    constructor() {
        super();
        if (document.querySelectorAll(this.nodeName).length > 1) {
            console.log("Cannot have two create-summary tag.")
            this.error_occured = true
        }
        if (this.innerText.length > 500) {
            console.log("Summary cannot be more than 200 characters")
            this.error_occured = true
        }
    }

    _renderElement() {
        /*let attr = this.attributes.getNamedItem('meta');
        console.log(attr)
        if (attr) {
            console.log("attr")
            this.style.display = 'none'
        } else {
            this.style.removeProperty('style')
        }*/
    }

    connectedCallback() {
        if (this.error_occured) {
            this.attachShadow({mode: 'open'})
            return
        }
        let attr = this.attributes.getNamedItem('meta') ? this.attachShadow({mode: 'open'}) : null;
        /*if (attr) {
            const shadow = this.attachShadow({mode: 'open'})
        }
        if (!this.rendered) {
            this._renderElement()
            this.rendered = true
        }*/
    }

    static get observedAttributes() {
        return ['meta']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this._renderElement()
    }
}

customElements.define('create-summary', CreateSummary)