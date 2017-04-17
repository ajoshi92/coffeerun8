var isDuplicateEmailBoolean = null;
(function(window) {
    'use strict';
    var App = window.App || {};

    var Validation = {
        isCompanyEmailValid: function(email) {
            if (/.+@bignerdranch\.com$/.test(email)) {
                isDuplicateEmail(email);
                if (!isDuplicateEmailBoolean) {
                    return 'NO_ERROR';
                } else {
                    return 'EMAIL_DUPLICATE';
                }
            } else {
                return 'REGEX_ERROR';
            }
        }
    };

    App.Validation = Validation;
    window.App = App;
})(window);

function isDuplicateEmail(email) {
    window.jQuery.ajax({
        type: 'GET',
        url: window.myTruck.db.serverUrl + '/' + email,
        async: false,
        success: function(response) {
            if (response.emailAddress === email) {
                isDuplicateEmailBoolean = true;
            }
        },
        error: function(error) {
            if (error.status === 404) {
                isDuplicateEmailBoolean = false;
            }
        }
    });
}
