// ==UserScript==
// @name         Quiz Checker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       George
// @match        https://coinlist.co/*
// @icon         https://www.google.com/s2/favicons?domain=coinlist.co
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @updateURL    https://raw.githubusercontent.com/mmobinvestor/quizzer/main/script.js
// @downloadURL  https://raw.githubusercontent.com/mmobinvestor/quizzer/main/script.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    var path = location.pathname;

    if (path.includes('/onboarding')) {
        location.href = $('a.js-get_started_cta').prop('href');
    }

    if (path.includes('/new')) {
        setTimeout(function() {
            $('.js-submit_existing_entity')[0].click();
        }, 500);
    }

    if (path.includes('/residence')) {
        setTimeout(function() {
            $('.js-country option[value="RU"]').prop('selected', true).change();
            $('#forms_offerings_participants_residence_residence_signature').prop('checked', true).change();
            $('.js-submit')[0].click();
        }, 500);
    }

    // Мы на странице опроса
    if (path.includes('/quiz')) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'https://www.seomax.info/answers?url=/' + path.split('/')[1],
            onload: function (response) {
                var answers = JSON.parse(response.responseText);

                for (var i = 0; i < answers.length; ++i) {
                    $('label:contains("'+answers[i]+'")').find('input').prop('checked', true).trigger('change');
                }
                $('.js-submit')[0].click();
            }
        });
    }

})();