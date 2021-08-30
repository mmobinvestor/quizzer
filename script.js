// ==UserScript==
// @name         Quiz Checker
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       Jonh Doe
// @match        https://coinlist.co/*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @updateURL    https://raw.githubusercontent.com/mmobinvestor/quizzer/main/script.js
// @downloadURL  https://raw.githubusercontent.com/mmobinvestor/quizzer/main/script.js
// @grant        GM_getResourceText
// @grant        GM_addStyle
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
            //$('.js-offerings_participant_form').trigger('submit');

            console.log($('.js-offerings_participant_form'));
        }, 500);
    }

    if (path.includes('/quiz')) {
        $.getJSON('https://www.seomax.info/answers?url=' + path, function(answers) {
            for (var i = 0; i < answers.length; ++i) {
                $('label:contains("'+answers[i]+'")').find('input').prop('checked', true).trigger('change');
            }
        });

        $('.js-submit')[0].click();
    }

})();