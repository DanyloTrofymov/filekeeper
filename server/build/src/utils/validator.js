"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
require("livr");
const error_1 = require("./error");
const Validator = require('livr/lib/Validator');
const rules = require('livr-extra-rules');
Validator.registerDefaultRules({
    ...rules,
    ...Validator.getDefaultRules(),
});
function validate(data, validationRules) {
    const tempValidator = new Validator(validationRules);
    const validData = tempValidator.validate(data);
    if (validData) {
        return validData;
    }
    throw new error_1.HttpError(400, 'Validation error: ' + JSON.stringify(tempValidator.getErrors()), error_1.ERRORS.VALIDATION_ERROR, tempValidator.getErrors());
}
exports.default = validate;
//# sourceMappingURL=validator.js.map