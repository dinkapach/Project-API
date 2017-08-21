'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var runManagerValidations = function runManagerValidations(ManagerSchema) {

    ManagerSchema.path('id').unique(true);

    ManagerSchema.path('firstName').required(true, 'First name is required');

    ManagerSchema.path('lastName').required(true, 'Last name is required');

    ManagerSchema.path('password').required(true, 'Password is required').validate(function (pswdValue) {
        return pswdValue.length > 6;
    }, 'Minimum six characters');

    ManagerSchema.path('email').required(true, 'Email is required').unique(true).validate(function (emailValue) {
        return (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(emailValue)
        );
    }, 'Email is invalid');
};

exports.default = {
    runManagerValidations: runManagerValidations
};
//# sourceMappingURL=manager-schema-validations.js.map
