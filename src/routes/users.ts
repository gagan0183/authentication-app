import {Request, Response} from "express";

import users = require('../db.json'); //load our local database file

export class Users {

    public routes(app): void { //received the express instance from app.ts file

        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send(JSON.stringify({message: "Hello.Welcome to usgm"}));
        })

        app.route('/users')
        .get((req: Request, res: Response) => {
            res.status(200).send(users);
        })

        app.route('/users/:id')
        .get((req:Request, res: Response) => {
        let id = req.params.id;
        res.status(200).send(users[id]);
       })
    }
}
