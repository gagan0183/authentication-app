import * as express from 'express';
import * as bodyParser from 'body-parser';//used to parse the form data that you pass in the request
import * as cors from 'cors';
import * as errorHandler from 'errorhandler';

import { Users } from "./routes/users";
import { TokenGenerator } from './utility/tokengenerator';
import { Validations } from './utility/validations';
import { CommonFunctions } from './utility/common';
import { FileSystem } from './utility/filesystem';
import { Auth } from './middleware/auth';
import config = require('./config/default.json');
import { LoginController } from './controllers/login';

class App {

public app: express.Application;
public userRoutes: Users = new Users();

constructor() {
        this.app = express(); //run the express instance and store in app
        this.config();
        this.userRoutes.routes(this.app);
    }

    private config(): void {

        if(!config.jwtPrivateKey) {
            console.error('FATAL ERROR, JWT key is not defined');
            process.exit(0);
        }

        //Configure isProduction variable
        const isProduction = process.env.NODE_ENV === 'production';

        //use cors
        this.app.use(cors());
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
        if(!isProduction) {
            this.app.use(errorHandler());
        }
    }

}

export default new App().app;
