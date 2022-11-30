/*
MAYOWA OBISESAN
SUMMARY - JAVASCRIPT FILE
NOVEMBER 9, 2022.
*/


function _(selector) {
    return document.querySelector(selector)
}

// Fetch the summary of the urllink
class UrlSummary {
    constructor() { }

    summarize() {
        fetch()
    }
}

function submitSummaryForm(self, evt) {
    let summaryFormData = new FormData(document.querySelector('#id-search-form'));
    console.log(summaryFormData)
    _('#id-summary-result-container').innerHTML = `<span class='fa fa-spinner fa-spin'></span> Loading summary`;
    _('#id-summary-result-container').classList.add('vh:h-96');
    _('#id-summary-result-container').classList.add('transition:height_400ms_ease-in-out|width_200ms_ease_800ms');
    _('.header-container').classList.remove('neg:top-4');
    _('.header-container').classList.add('lg:h-10');
    _('#id-search-field').classList.add('h-7');
    _('#id-search-field').classList.add('md:h-8');
    _('#id-search-field').classList.add('lg:h-9');
    _('.header-container > header').classList.add('font-24');
    _('.header-container > header').classList.add('lg:font-36');
    _('.header-container > header').classList.add('transition:font-size_200ms_ease');
    _('#id-footer-container').classList.add('d-none');

    const summary_api_url = `http://localhost:4500/summary?search_input=${self.querySelector('[name="search-field"]').value}`;
    // const summary_api_url = `http://summary.deta.dev/summary?search_input=${self.querySelector('[name="search-field"]').value}`;
    const summary_fetch_init = {
        method: "GET",
        headers: {
            "Accept": "*/*",
            "Origin": "*",
        },
        modes: "no-cors",
    }
    fetch(summary_api_url, summary_fetch_init)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP Error! Status ${response.status}`);
            }
            new Promise((resolve, reject) => {
                resolve(processTemplate('id-summary-result-content-template', 'id-summary-result-container', 'overwrite'));
                reject(new Error("Internal JavaScript Error. Error occured within processTemplate function."));
            })
                .then((_res) => {
                    // _('#id-summary-result-container').classList.remove('d-none');
                    // _('.header-container').classList.add('transition:top_400ms_ease-in');
                    // _('.header-container').classList.add('top-0');
                    _('.header-container').classList.add('relative');
                    _('.header-container').classList.add('lg:top-0');
                }).catch((err) => { console.error(err); });
            self.querySelector('#id-search-field').blur();
            return response.json();
        })
        .then((data) => {
            let summary_url = self.querySelector('[name="search-field"]').value;
            let summary_title = data['summary_title'].toString();
            let summary_text = data['summary_text'].toString();

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
            // _('#id-summary-result-content').innerHTML = `Error occured: ${err}`;
            console.error(err)
            alert(err)
            self.querySelector('#id-search-field').focus();
            processTemplate('id-summary-error-content-template', 'id-summary-error-container', action = 'overwrite');
        });
}


function processTemplate(template_id, to_element_id, action = "overwrite") {
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

            if (action == "overwrite") {
                to_element[0].innerHTML = "";
            }
            to_element[0].appendChild(template_content);
        } catch (err) {
            console.log(err);
            alert(err);
        }
    } else {
        alert("Cannot use a required feature. Kindly upgrade your browser or use a newer browser version.");
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
</body> */}

