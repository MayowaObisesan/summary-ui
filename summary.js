/*
MAYOWA OBISESAN
SUMMARY - JAVASCRIPT FILE
NOVEMBER 9, 2022.
*/

// 'use strict'
import {_, processTemplate, StyleProcessor} from "./helpers.js";

window.SummaryView = class {
    constructor(elem) {
        this.elem = elem;
    }

    displayAboutView() {
        const aboutContainer = _('#id-summary-about-container');
        aboutContainer.innerHTML !== ""
            ? new StyleProcessor('#id-summary-about-container').remove('vh:h-0').add('vh:h-100')
            : new Promise((resolve, reject) => {
                resolve(processTemplate('id-summary-about-content-template', 'id-summary-about-container'))
                reject(new Error("Internal JavaScript Error occured within processTemplate function"))
            }).then((_res) => {
                // set the height of the about-container to 100vh.
                // _('#id-summary-about-container').classList.remove('vh:h-0')
                // _('#id-summary-about-container').classList.add('vh:h-100')
                new StyleProcessor('#id-summary-about-container').remove('vh:h-0').add('vh:h-100')
            }).catch((err) => {
                alert(`Error occurred: ${err}`)
            })
    }

    closeAboutView() {
        new StyleProcessor('#id-summary-about-container').add('vh:h-0').remove('vh:h-100')
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
    console.log(summaryFormData)
    // _('#id-summary-result-container').innerHTML = `<span class='fa fa-spinner fa-spin'></span> Loading summary`;
    /*_('#id-summary-result-container').classList.add('vh:h-96');
    _('#id-summary-result-container').classList.add('transition:height_400ms_ease-in-out|width_200ms_ease_800ms');*/
    new StyleProcessor('#id-summary-result-container').addMany('vh:h-96 transition:height_400ms_ease-in-out|width_200ms_ease_800ms');
    /*_('.header-container').classList.remove('neg:top-4');
    _('.header-container').classList.add('lg:h-10');*/
    new StyleProcessor('.header-container').remove('neg:top-4').add('lg:h-10');
    /*_('#id-search-field').classList.add('h-7');
    _('#id-search-field').classList.add('md:h-8');
    _('#id-search-field').classList.add('lg:h-9');*/
    new StyleProcessor('#id-search-field').add('h-7').add('md:h-8').add('lg:h-9');
    /*_('.header-container > header').classList.add('font-24');
    _('.header-container > header').classList.add('lg:font-36');
    _('.header-container > header').classList.add('transition:font-size_200ms_ease');*/
    new StyleProcessor('.header-container > header').add('font-24').add('lg:font-36').add('transition:font-size_200ms_ease');
    _('#id-footer-container').classList.add('d-none');
    setTimeout(
        () => {
            processTemplate('id-summary-loading-content-template', 'id-summary-result-container')
        },
        400
    )

    // const summary_api_url = `http://localhost:5000/summary?search_input=${self.querySelector('[name="search-field"]').value}`;
    const summary_api_url = `https://summary.deta.dev/summary?search_input=${self.querySelector('[name="search-field"]').value}`;
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
                    /*_('.header-container').classList.add('relative');
                    _('.header-container').classList.add('lg:top-0');*/
                    new StyleProcessor('.header-container').add('relative').add('lg:top-0');
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
            alert(err)
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

