'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var runCustomerValidations = function runCustomerValidations(CustomerSchema) {

    CustomerSchema.path('id').unique(true);

    CustomerSchema.path('firstName').required(true, 'First name is required');

    CustomerSchema.path('lastName').required(true, 'Last name is required');

    CustomerSchema.path('password').required(true, 'Password is required').validate(function (pswdValue) {
        return pswdValue.length > 6;
    }, 'Minimum six characters');

    CustomerSchema.path('email').validate(function (emailValue) {
        return (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(emailValue)
        );
    }, 'Email is invalid').required(true, 'Email is required').unique(true);

    CustomerSchema.path('phoneNumber').required(true, 'Last name is required');

    CustomerSchema.path('birthday').required(true, 'Birthday is required');
};

exports.default = {
    runCustomerValidations: runCustomerValidations
};
//# sourceMappingURL=user-schema-validations.js.map
