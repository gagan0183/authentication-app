import {Request, Response} from "express";
import *  as _ from 'lodash';
import { LoginController } from '../controllers/login';

import users = require('../db.json'); //load our local database file

export class Users {

    private login: LoginController;

    constructor() {
        this.login = new LoginController();
    }

    public routes(app): void { //received the express instance from app.ts file
        //registration endpoint - open for access
        var self = this;
        app.route('/v1/registration')
        .post((req, res) => this.login.registrationPost(req, res))

        //login endpoint - open for access
        app.route('/v1/login')
        .post((req, res) => this.login.loginPost(req, res));

        // endpoints for which authentication is required
        app.get('/', this.login.auth.authenticate, (req: Request, res: Response) => {
            res.status(200).send(JSON.stringify({message: "Hello.Welcome to usgm"}));
        })

        app.get('/users', this.login.auth.authenticate, (req: Request, res: Response) => {
            res.status(200).send(users);
        })

        app.get('/users/:id', this.login.auth.authenticate, (req:Request, res: Response) => {
        let id = req.params.id;
        res.status(200).send(users[id]);
       })
    }
}
