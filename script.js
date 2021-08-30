// ==UserScript==
// @name         [LOCAL] Coinlist Quiz Checker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Jonh Doe
// @match        https://coinlist.co/qredo-option-1-sale*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @grant        none
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

    // /qredo-option-1-sale/506388c5-7b77-4ef8-8e34-2a2d7d338eeb/quiz

    // Мы на странице опроса
    if (path.includes('/quiz')) {
        $.getJSON('https://www.seomax.info/answers?url=' + path, function(answers) {
            for (var i = 0; i < answers.length; ++i) {
                $('label:contains("'+answers[i]+'")').find('input').prop('checked', true).trigger('change');
            }
        });

        $('.js-submit')[0].click();
    }

})();