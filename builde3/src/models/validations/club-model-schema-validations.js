'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var runClubModelValidations = function runClubModelValidations(ClubModelSchema) {

    ClubModelSchema.path('id').unique(true);

    ClubModelSchema.path('name').required(true, 'Name is required');

    ClubModelSchema.path('address').required(true, 'Address is required');

    ClubModelSchema.path('phoneNumber').required(true, 'Phone number is required');
};

exports.default = {
    runClubModelValidations: runClubModelValidations
};
//# sourceMappingURL=club-model-schema-validations.js.map
