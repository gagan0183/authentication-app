import { expect } from 'chai';
import 'mocha';
import { TokenGenerator } from '../src/utility/tokengenerator';

let tokenGenerator = new TokenGenerator();

describe('Token Generator', () => {
    it('should return generated token', function() {
        let user = {
            email: 'g@gmail.com',
            password: 'sample'
        };
        let jwtToken = tokenGenerator.generateJWT(user);
        expect(jwtToken).to.be.an('string');
    });
});