"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var errorMessages = [];

exports.default = {
    getErrorMsg: function getErrorMsg() {
        switch (errorObj) {

            case errorObj.errors.FirstName:
                errorMessages.push(errorObj.errors.FirstName.message);
                break;
            case errorObj.errors.LastName:
                errorMessages.push(errorObj.errors.LastName.message);
                break;
            case errorObj.errors.Password:
                errorMessages.push(errorObj.errors.Password.message);
                break;

            case errorObj.errors.Email:
                errorMessages.push(errorObj.errors.Email.message);
                break;
            case errorObj.errors.PhoneNumber:
                errorMessages.push(errorObj.errors.PhoneNumber.message);
                break;

            case errorObj.errors.BirthDay:
                errorMessages.push(errorObj.errors.BirthDay.message);
                break;
        }
    }
};
//# sourceMappingURL=errorMasseges.functions.js.map
