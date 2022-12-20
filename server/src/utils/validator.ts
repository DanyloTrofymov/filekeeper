/* eslint-disable @typescript-eslint/no-var-requires */
import 'livr';
import { ERRORS, HttpError } from './error';

const Validator = require('livr/lib/Validator');
const rules = require('livr-extra-rules');

Validator.registerDefaultRules({
    ...rules,
    ...Validator.getDefaultRules(),
});

export default function validate(data: any, validationRules: any) {
    const tempValidator = new Validator(validationRules);
    const validData = tempValidator.validate(data);

    if (validData) {
        return validData;
    }

    throw new HttpError(
        400,
        'Validation error',
        ERRORS.VALIDATION_ERROR,
        tempValidator.getErrors(),
    );
}
