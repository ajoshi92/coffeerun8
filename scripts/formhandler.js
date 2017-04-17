(function(window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        this.$formElement.on('submit', function(event) {
            event.preventDefault();
            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
            });
            data.id = data.emailAddress;
            fn(data)
                .then(function() {
                    this.reset();
                    this.elements[0].focus();
                }.bind(this));
        });
    };

    FormHandler.prototype.addInputHandler = function(fn) {
        this.$formElement.on('change', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var message = '';
            var isEmailValid = fn(emailAddress);
            console.log(isEmailValid);
            if (isEmailValid === 'NO_ERROR') {
                event.target.setCustomValidity('');
            } else if (isEmailValid === 'REGEX_ERROR') {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            } else if (isEmailValid === 'EMAIL_DUPLICATE') {
                message = emailAddress + ' is been used before!';
                event.target.setCustomValidity(message);
            }
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
