import { CommonFunctions } from '../src/utility/common';
import { expect } from 'chai';
import 'mocha';

let commonFunctions = new CommonFunctions();

describe('Hash password', () => {
    it('should return hashed password', function() {
        let password = 'this';
        let hashedPassword = commonFunctions.createHashPassword(password);
        expect(hashedPassword).to.be.an('string');
    });
});