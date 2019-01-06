import { expect } from 'chai';
import 'mocha';
import { Validations } from '../src/utility/validations';
import { User } from '../src/models/user';
import { hashSync } from 'bcrypt';

let validations = new Validations();

describe('Validate Registration', () => {
    it('should return error for email required', function() {
        let user: User = {
            email: undefined,
            password: undefined
        };
        let value = validations.validateRegistration(user);
        expect(value).to.equal('"email" is required');
    });

    it('should return error for password required', function() {
        let user: User = {
            email: 'g@g.com',
            password: undefined
        };
        let value = validations.validateRegistration(user);
        expect(value).to.equal('"password" is required');
    });

    it('should return error for mimimum length for password', function() {
        let user: User = {
            email: 'g@g.com',
            password: 'sample'
        };
        let value = validations.validateRegistration(user);
        expect(value).to.equal('"password" length must be at least 7 characters long');
    });

    it('should return error for combination of lowercase, uppercase, numbers and special characters for password', function() {
        let user: User = {
            email: 'g@g.com',
            password: 'samplee'
        };
        let value = validations.validateRegistration(user);
        expect(value).to.equal('Password must be a combination of lowercase, uppercase, numbers and special characters');
    });

    it('should return empty string if all validation succeeds', function() {
        let user: User = {
            email: 'g@g.com',
            password: 'Arihant$90'
        };
        let value = validations.validateRegistration(user);
        expect(value).to.equal('');
    });
});

describe('Validate Login', () => {
    it('should return error for email required', function() {
        let user: User = {
            email: undefined,
            password: undefined
        };
        let value = validations.validateUser(user);
        expect(value).to.equal('"email" is required');
    });

    it('should return error for password required', function() {
        let user: User = {
            email: 'g@g.com',
            password: undefined
        };
        let value = validations.validateUser(user);
        expect(value).to.equal('"password" is required');
    });

    it('should return empty string if all validation succeeds', function() {
        let user: User = {
            email: 'g@g.com',
            password: 'Arihant$90'
        };
        let value = validations.validateUser(user);
        expect(value).to.equal('');
    });
});

describe('Validate Password', () => {
    it('should return error if password doesnt match', function() {
        let userPassword = hashSync('sample', 8);
        let value = validations.validatePassword('sample', userPassword);
        expect(value).to.equal(true);
    });
});