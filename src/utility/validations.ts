import * as Joi from 'joi';
import { compareSync } from 'bcrypt';
import { User } from '../models/user';
import { CommonFunctions } from './common';

export class Validations {

    commonFunctions: CommonFunctions = new CommonFunctions();

    public validateRegistration(user: User): string {
        //validating input using Joi
        const schema = Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().min(7).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/)
                        .required()
        });
        let { error } = Joi.validate(user, schema);
        //sending custom error message for email validation
        if(error) {
            if(error.details[0].path[0] === 'password' && error.details[0].type === 'string.regex.base') {
                error.details[0].message = 'Password must be a combination of lowercase, uppercase, numbers and special characters'
            }
        }
        return error ? error.details[0].message : ''; 
    }

    public validateUser(user: User): string {
        //validating input using Joi
        const schema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
        });
        let { error } = Joi.validate(user, schema);
        return error ? error.details[0].message : ''; 
    }

    public validatePassword(enteredPassword, userPassword): boolean {
        //validating password
        return compareSync(enteredPassword, userPassword);
    }
}