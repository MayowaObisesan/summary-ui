/*
MAYOWA OBISESAN
SUMMARY - JAVASCRIPT FILE
NOVEMBER 9, 2022.
*/

'use strict'
import {_, processTemplate, StyleProcessor} from "./helpers.js";

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
    let summaryFormData = new FormData(document.querySelector('#id-search-form'));
    // console.log(summaryFormData)
    new StyleProcessor('#id-summary-result-container').addManyClass('vh:h-96 transition:height_400ms_ease-in-out|width_200ms_ease_800ms');
    new StyleProcessor('.header-container').removeClass('neg:top-4').addClass('lg:h-10');
    new StyleProcessor('#id-search-field').addClass('h-7').addClass('md:h-8').addClass('lg:h-9');
    new StyleProcessor('.header-container > header').addClass('font-24').addClass('lg:font-36').addClass('transition:font-size_200ms_ease');
    _('#id-footer-container').classList.add('d-none');
    setTimeout(
        () => {
            processTemplate('id-summary-loading-content-template', 'id-summary-result-container')
        },
        400
    )

    // const summary_api_url = `http://localhost:5000/summary?search_input=${self.querySelector('[name="search-field"]').value}`;
    // const summary_api_url = `https://summary.deta.dev/summary?search_input=${self.querySelector('[name="search-field"]').value}`;
    const summary_api_url = `http://143.110.168.169/summary?search_input=${self.querySelector('[name="search-field"]').value}`;
    // const summary_api_url = `http://44.202.121.157/summary?search_input=${self.querySelector('[name="search-field"]').value}`;
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
            console.error(err)
            // alert(err)
            self.querySelector('#id-search-field').focus();
            processTemplate('id-summary-error-content-template', 'id-summary-result-container', 'overwrite');
        });
};


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

