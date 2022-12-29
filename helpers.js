export function _(selector) {
    return document.querySelector(selector)
}

export function _all(selector) {
    return document.querySelectorAll(selector)
}

export function processTemplate(template_id, to_element_id, action = "overwrite") {
    /**
     * Function to process SummaryView Templates
     */
    if ('content' in document.createElement('template')) {
        try {
            // get the template from the template_id
            const template = document.querySelectorAll(`#${template_id}`);
            const to_element = document.querySelectorAll(`#${to_element_id}`);
            const action_options = ['overwrite', 'append'];
            if (template.length < 1) {
                throw "Template is not valid.";
            } else if (template.length > 1) {
                throw "Multiple template with same name found."
            } else if (to_element.length < 1) {
                throw "Template must be written to an existing element."
            } else if (to_element.length > 1) {
                throw "Template can only be written to a unique element. Multiple destination element found."
            } else if (!action_options.includes(action)) {
                throw "Invalid write action.";
            }
            const template_content = template[0].content.cloneNode(true);

            if (action === "overwrite") {
                to_element[0].innerHTML = "";
            }
            to_element[0].appendChild(template_content);
        } catch (err) {
            console.log(err);
            alert(err);
        }
        return true
    } else {
        alert("Cannot use a required feature. Kindly upgrade your browser or use a newer browser version.");
        return false
    }
}

export class StyleProcessor {
    /**
     * A Class to Process Custom Styles to be used in Summary using a chaining method.
     */
    constructor(selector) {
        if (typeof selector === "string") {
            this.elem_style = _(selector).classList
        } else {
            this.elem_style = selector.classList
        }
    }

    removeClass(styles) {
        this.elem_style.remove(styles)
        return this
    }

    removeManyClass(styles) {
        const styles_array = styles.split(' ')
        styles_array.forEach((each_style) => {
            this.elem_style.remove(each_style)
        })
        return this
    }

    addClass(styles) {
        this.elem_style.add(styles)
        return this
    }

    addManyClass(styles) {
        const styles_array = styles.split(' ')
        styles_array.forEach((each_style) => {
            this.elem_style.add(each_style)
        })
        return this
    }

    toggleClass(styles) {
        this.elem_style.toggle(styles)
        // this.elem_style.contains(styles) ? this.elem_style.add(styles) : this.elem_style.remove(styles)
        return this
    }

    replaceClass(styles) {
        /**
         * Function to use regex to find if the style specified exists in the calling element
         * e.g., this.elem_style.find(r"styles.split('-')[0]").replace("".join(styles.split('-')), styles)
         * Date: December 23, 2022.
         */
    }
}

export class EventTriggers {
    constructor(selector_or_elem) {
        if (typeof selector_or_elem === "string") {
            this.elem = _(selector_or_elem)
        } else {
            this.elem = selector_or_elem
        }
    }

    Listen(event_name) {
        this.elem.addEventListener(event_name)
    }

    Remove(event_name) {
        this.elem.removeEventListener(event_name)
    }
}