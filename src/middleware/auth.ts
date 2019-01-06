import * as jwt from 'jsonwebtoken';
import userdata = require('../users.json');

export class Auth {

     authenticate = (req, res, next) => {
        // get token from header
        const token = req.header('x-auth-token');
        if(!token) return res.status(401).send({
            auth: false,
            message: 'Access denied. No token provided.'
        });

        try {
            //verify token and set to user object
            const decoded = jwt.verify(token, 'secret');
            req.user = decoded;
            next();
        }
        catch(ex) {
            res.status(401).send({
                auth: false,
                message: 'Invalid token'
            });
        }
    }
}