/*
MAYOWA OBISESAN
SUMMARY - JAVASCRIPT FILE
NOVEMBER 9, 2022.
*/

'use strict'
import {_, _all, processTemplate, StyleProcessor} from "./helpers.js";
import {EventHandler} from "./event_handler.js";

// Call the EventHandler Class to listen for all event during the program's lifecycle loop
new EventHandler().Listen()

window.SummaryView = class {
    constructor(elem) {
        this.elem = elem;
    }

    displayAboutView() {
        const aboutContainer = _('#id-summary-about-container');
        aboutContainer.innerHTML !== ""
            ? new StyleProcessor('#id-summary-about-container').removeClass('vh:h-0').addClass('vh:h-100')
            : new Promise((resolve, reject) => {
                resolve(processTemplate('id-summary-about-content-template', 'id-summary-about-container'))
                reject(new Error("Internal JavaScript Error occured within processTemplate function"))
            }).then((_res) => {
                // set the height of the about-container to 100vh.
                new StyleProcessor('#id-summary-about-container').removeClass('vh:h-0').addClass('vh:h-100')
            }).catch((err) => {
                alert(`Error occurred: ${err}`)
            })
    }

    closeAboutView() {
        new StyleProcessor('#id-summary-about-container').addClass('vh:h-0').removeClass('vh:h-100')
    }
}

// Fetch the summary of the urllink
class UrlSummary {
    constructor() {
    }

    summarize() {
        fetch()
    }
}

window.submitSummaryForm = (self, evt) => {
    console.log(evt)
    let summaryFormData = new FormData(document.querySelector('#id-search-form'));
    // console.log(summaryFormData)
    new StyleProcessor('#id-summary-result-container').addManyClass('vh:h-96 transition:height_400ms_ease-in-out|width_200ms_ease_800ms');
    new StyleProcessor('.header-container').removeClass('neg:top-4').addClass('lg:h-10');
    new StyleProcessor('#id-search-field').addClass('vh:h-6').addClass('md:h-8').addClass('lg:h-9').addManyClass('font-15');
    new StyleProcessor('.header-container > header').addClass('font-24').addClass('lg:font-36').addClass('transition:font-size_200ms_ease');
    _('#id-footer-container').classList.add('d-none');
    const summary_loading_display_timeout = setTimeout(
        () => {
            processTemplate('id-summary-loading-content-template', 'id-summary-result-container')
            /* Update the background of the form-content-container */
            new StyleProcessor('.header-container').addManyClass('vh:h-6 transition:height_400ms_ease').removeClass('mg-b1');
            new StyleProcessor('.header-container > header').addManyClass('color-FFFFFF');
            new StyleProcessor('#id-form-content-container').addManyClass('bg-27CE8E')
            // new StyleProcessor('#id-form-content-container').addManyClass('bg-a7ecc0 radius')
            new StyleProcessor('#id-url-field-container').addManyClass('bg-FFFFFF pct:w-96')
            new StyleProcessor('#id-summary-type-container').addManyClass('bg-FFFFFF vh:h-6 pad-x1 transition:height_400ms_ease|padding_400ms_ease_800ms').removeClass('pad-x4')
            // new StyleProcessor('#id-float-help-container .fa').addManyClass('color-FFFFFF')
        },
        400
    )

    // Get the summary_type that triggers the form
    let summary_type = evt.submitter.getAttribute('data-summary_field_submit_type')
    console.log(summary_type)

    const API_ADDRESS = "http://143.110.168.169/summary"
    let summary_api_address;
    if (summary_type === "url") {
        let url_input_value = self.querySelector(`[name=${summary_type}_summary_name]`).value
        let url_queries = `url_input=${url_input_value}`
        summary_api_address = `${API_ADDRESS}?${url_queries}`
    } else if (summary_type === "") {
        let text_input_value = self.querySelector(`[name="${summary_type}_summary_name"]`).value
        const text_queries = `text_input=${text_input_value}`
        summary_api_address = `${API_ADDRESS}?${text_queries}`
    }

    // const summary_api_url = `http://localhost:5000/summary?search_input=${self.querySelector('[name="search-field"]').value}`;
    // const summary_api_url = `https://summary.deta.dev/summary?search_input=${self.querySelector('[name="search-field"]').value}`;
    // const summary_api_url = `http://143.110.168.169/summary?search_input=${self.querySelector('[name="search-field"]').value}`;
    // const summary_api_url = `http://44.202.121.157/summary?search_input=${self.querySelector('[name="search-field"]').value}`;
    const summary_fetch_init = {
        method: "GET",
        headers: {
            "Accept": "*/*",
            "Origin": "*",
        },
        modes: "no-cors",
    }
    fetch(summary_api_address, summary_fetch_init)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP Error! Status ${response.status}`);
            }
            new Promise((resolve, reject) => {
                resolve(processTemplate('id-summary-result-content-template', 'id-summary-result-container', 'overwrite'));
                reject(new Error("Internal JavaScript Error. Error occurred within processTemplate function."));
            })
                .then((_res) => {
                    new StyleProcessor('.header-container').addClass('relative').addClass('lg:top-0');
                }).catch((err) => {
                console.error(err);
            });
            self.querySelector('#id-search-field').blur();
            return response.json();
        })
        .then((data) => {
            // clear the timeout of the loading display incase it hasn't loaded because of the setTimeout.
            clearTimeout(summary_loading_display_timeout)

            let summary_url = self.querySelector('[name="search-field"]').value;
            let summary_title = data['summary_title'].toString();
            let summary_text = data['summary_text'].toString() || "No content";

            document.querySelector('#id-summary-result-url') != null ? document.querySelector('#id-summary-result-url').innerHTML = summary_url : '';
            _('#id-summary-result-title') != null ? _('#id-summary-result-title').innerHTML = summary_title : '';

            summary_text = summary_text.replaceAll('. ', '. <br>');
            console.log(summary_text);
            document.querySelector('#id-summary-result-content') != null ? document.querySelector('#id-summary-result-content').innerHTML = summary_text : '';
            console.log(data)
            // reset the search form and focus the input field.
            _('#id-search-field').form.reset();
            _('#id-search-field').focus();

        })
        .catch((err) => {
            console.error(err)
            // alert(err)
            self.querySelector('#id-search-field').focus();
            processTemplate('id-summary-error-content-template', 'id-summary-result-container', 'overwrite');
        });
};

window.SummaryForm = class {
    constructor(elem) {
        this.elem = elem
    }

    submitForm(evt) {
        // Get the summary_type that triggers the form
        let summary_type = evt.submitter.getAttribute('data-summary_field_submit_type')
        console.log(summary_type)

        // const API_ADDRESS = "http://143.110.168.169/summary"
        const API_ADDRESS = "http://127.0.0.1:5000/summary"
        let summary_api_address;
        if (summary_type === "url") {
            let url_input_value = this.elem.querySelector(`[name=${summary_type}_input_summary_name]`).value
            let url_queries = `url_input=${url_input_value}`
            /* Validate the url queries before sending to the server. */
            if (['http', 'https', 'http:', 'https:', 'https:/', 'https:/', 'https://', 'http://'].includes(url_input_value)) {
                // return new Error("You haven't typed a url")
                alert("You haven't typed a url")
                return
            }
            summary_api_address = `${API_ADDRESS}?${url_queries}`
            this.fetchURLSummary(summary_api_address)
        } else if (summary_type === "text") {
            let text_input_value = this.elem.querySelector(`[name="${summary_type}_input_summary_name"]`).value
            console.log(text_input_value)
            const text_queries = `text_input=${text_input_value}`
            summary_api_address = `${API_ADDRESS}?${text_queries}`
            this.fetchTextSummary(summary_api_address)
        }

        console.log(evt)
        let summaryFormData = new FormData(document.querySelector('#id-summary-form'));
        // console.log(summaryFormData)
        new StyleProcessor('#id-summary-result-container').addManyClass('vh:h-96 transition:height_400ms_ease-in-out|width_200ms_ease_800ms');
        new StyleProcessor('.header-container').removeClass('neg:top-4').addClass('lg:h-10');
        new StyleProcessor('#id-url-field').addClass('vh:h-6').addClass('md:h-8').addClass('lg:h-9').addManyClass('font-15');
        new StyleProcessor('#id-text-field-container').addManyClass('vh:h-7 md:vh:h-8 lg:vh:h-9').addClass('font-15');
        new StyleProcessor('.header-container > header').addClass('font-24').addClass('lg:font-36').addClass('transition:font-size_200ms_ease');
        _('#id-footer-container').classList.add('d-none');
        this.summary_loading_display_timeout = setTimeout(
            () => {
                processTemplate('id-summary-loading-content-template', 'id-summary-result-container')
                /* Update the background of the form-content-container */
                new StyleProcessor('.header-container').addManyClass('vh:h-6 transition:height_400ms_ease').removeClass('mg-b1');
                new StyleProcessor('.header-container > header').addManyClass('color-FFFFFF');
                new StyleProcessor('#id-form-content-container').addManyClass('bg-27CE8E')
                // new StyleProcessor('#id-form-content-container').addManyClass('bg-a7ecc0 radius')
                new StyleProcessor('#id-url-field-container').addManyClass('bg-FFFFFF pct:w-96')
                new StyleProcessor('#id-text-field-container').addManyClass('pct:w-96 transition:width_400ms_ease_400ms')
                new StyleProcessor('#id-summary-type-container').addManyClass('bg-FFFFFF vh:h-6 pad-x1 transition:height_400ms_ease|padding_400ms_ease_800ms').removeClass('pad-x4')
                // new StyleProcessor('#id-float-help-container .fa').addManyClass('color-FFFFFF')
            },
            400
        )
    }

    fetchURLSummary(query_string) {
        const summary_fetch_init = {
            method: "GET",
            headers: {
                "Accept": "*/*",
                "Origin": "*",
            },
            modes: "no-cors",
        }
        fetch(query_string, summary_fetch_init)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP Error! Status ${response.status}`);
                }
                new Promise((resolve, reject) => {
                    resolve(processTemplate('id-summary-url-result-content-template', 'id-summary-result-container', 'overwrite'));
                    reject(new Error("Internal JavaScript Error. Error occurred within processTemplate function."));
                })
                    .then((_res) => {
                        new StyleProcessor('.header-container').addClass('relative').addClass('lg:top-0');
                    }).catch((err) => {
                    console.error(err);
                });
                this.elem.querySelector('#id-url-field').blur();
                return response.json();
            })
            .then((data) => {
                // clear the timeout of the loading display incase it hasn't loaded because of the setTimeout.
                clearTimeout(this.summary_loading_display_timeout)

                // let summary_url = this.elem.querySelector('[name="url_input_summary_name"]').value;
                let summary_url = data['url'].toString();
                let summary_title = data['summary_title'].toString();
                let summary_text = data['summary_text'].toString() || "No content";

                document.querySelector('#id-summary-url-result-url') != null ? document.querySelector('#id-summary-url-result-url').innerHTML = summary_url : '';
                _('#id-summary-url-result-title') != null ? _('#id-summary-url-result-title').innerHTML = summary_title : '';

                summary_text = summary_text.replaceAll('. ', '. <br>');
                console.log(summary_text);
                document.querySelector('#id-summary-url-result-content') != null ? document.querySelector('#id-summary-url-result-content').innerHTML = summary_text : '';
                console.log(data)
                // reset the url field and focus the input field.
                _('#id-url-field').form.reset();
                _('#id-url-field').focus();

            })
            .catch((err) => {
                console.error(err)
                // alert(err)
                this.elem.querySelector('#id-url-field').focus();
                processTemplate('id-summary-error-content-template', 'id-summary-result-container', 'overwrite');
            });
    }

    fetchTextSummary(query_string) {
        const summary_fetch_init = {
            method: "GET",
            headers: {
                "Accept": "*/*",
                "Origin": "*",
            },
            modes: "no-cors",
        }
        fetch(query_string, summary_fetch_init)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP Error! Status ${response.status}`);
                }
                new Promise((resolve, reject) => {
                    resolve(processTemplate('id-summary-text-result-content-template', 'id-summary-result-container', 'overwrite'));
                    reject(new Error("Internal JavaScript Error. Error occurred within processTemplate function."));
                })
                    .then((_res) => {
                        new StyleProcessor('.header-container').addClass('relative').addClass('lg:top-0');
                    }).catch((err) => {
                    console.error(err);
                });
                this.elem.querySelector('#id-text-field').blur();
                return response.json();
            })
            .then((data) => {
                // clear the timeout of the loading display incase it hasn't loaded because of the setTimeout.
                clearTimeout(this.summary_loading_display_timeout)

                // let summary_url = this.elem.querySelector('[name="text_input_summary_name"]').value;
                // let summary_title = data['summary_title'].toString();
                let summary_text = data['summary_text'].toString() || "No content";

                // document.querySelector('#id-summary-text-result-url') != null ? document.querySelector('#id-summary-text-result-url').innerHTML = summary_url : '';
                // _('#id-summary-text-result-title') != null ? _('#id-summary-text-result-title').innerHTML = summary_title : '';

                summary_text = summary_text.replaceAll('. ', '. <br>');
                console.log(summary_text);
                document.querySelector('#id-summary-text-result-content') != null ? document.querySelector('#id-summary-text-result-content').innerHTML = summary_text : '';
                console.log(data)
                // reset the url field and focus the input field.
                _('#id-text-field').form.reset();
                // _('#id-text-field').focus();

            })
            .catch((err) => {
                console.error(err)
                // alert(err)
                this.elem.querySelector('#id-text-field').focus();
                processTemplate('id-summary-error-content-template', 'id-summary-result-container', 'overwrite');
            });

    }

    focusURLSummaryField() {
        this.elem.innerHTML = "https://"
    }

    activateURLSummaryField() {
        _all('[data-summary_field_input]').forEach((each_elem) => {
            each_elem.classList.add('d-none')
        })
        new StyleProcessor('#id-url-field-container').removeClass('d-none')
        _('#id-url-field-container input').focus()

        _all('[data-summary_field_trigger]').forEach((each_elem) => {
            new StyleProcessor(each_elem).removeManyClass('bg-27CE8E color-white')
        })
        new StyleProcessor(this.elem).addManyClass('bg-27CE8E color-white')
    }

    activateTextSummaryField() {
        _all('[data-summary_field_input]').forEach((each_elem) => {
            each_elem.classList.add('d-none')
        })
        new StyleProcessor('#id-text-field-container').removeClass('d-none')
        _('#id-text-field-container textarea').focus()

        _all('[data-summary_field_trigger]').forEach((each_elem) => {
            new StyleProcessor(each_elem).removeManyClass('bg-27CE8E color-white')
        })
        new StyleProcessor(this.elem).addManyClass('bg-27CE8E color-white')
    }

    blurTextSummaryField() {
        console.log('blurring')
        // new StyleProcessor('#id-text-field-container button').addClass('d-none')
        // _('textarea#id-text-field').focus()
        // _('textarea#id-text-field').blur()
    }
}

{/* <body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Submit" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
      let response = await fetch('/article/fetch/post/image', {
        method: 'POST',
        body: blob
      });

      // the server responds with confirmation and the image size
      let result = await response.json();
      alert(result.message);
    }

  </script>

  function submit() {
    canvasElem.toBlob(function(blob) {
        fetch('/article/fetch/post/image', {
        method: 'POST',
        body: blob
        })
        .then(response => response.json())
        .then(result => alert(JSON.stringify(result, null, 2)))
    }, 'image/png');
  }
</body> */
}

