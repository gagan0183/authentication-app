import *  as jwt from 'jsonwebtoken';
import config = require('../config/default.json');

export class TokenGenerator {

    //generate JWT token
    public generateJWT(user) {
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 1);
        return jwt.sign({
            email: user.email,
            password: user.password,
            exp: expirationDate.getTime() / 1000,           
        }, config.jwtPrivateKey);
    }
}