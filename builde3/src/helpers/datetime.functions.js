"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    calculateAge: function calculateAge(dateString) {
        var newFormatDate = this.changeDateFortmat(dateString); // dateString.slice(3, 5) + '/' + dateString.slice(0, 2) + '/' + dateString.slice(6, 10);
        var today = new Date();
        var birthDate = new Date(newFormatDate);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || m === 0 && today.getDate() < birthDate.getDate()) {
            age--;
        }
        return age;
    },
    calculateOpeningHours: function calculateOpeningHours(hourString) {
        var hourOpen = hourString.split(":")[0];
        var minutesOpen = hourString.split(":")[1];

        return new Date(0, 0, 0, hourOpen, minutesOpen);
    },
    changeDateFortmat: function changeDateFortmat(dateString) {
        return dateString.slice(3, 5) + '/' + dateString.slice(0, 2) + '/' + dateString.slice(6, 10);
    }
};
//# sourceMappingURL=datetime.functions.js.map
