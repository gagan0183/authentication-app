import { User } from "../models/user";
import {Request, Response} from "express";
import { Validations } from "../utility/validations";
import { CommonFunctions } from "../utility/common";
import { TokenGenerator } from "../utility/tokengenerator";
import { FileSystem } from "../utility/filesystem";
import { Auth } from "../middleware/auth";
import { join } from 'path';
import *  as _ from 'lodash';

export class LoginController {

    private validations: Validations;
    private commonFunctions: CommonFunctions;
    private tokenGenerator: TokenGenerator;
    private fileSystem: FileSystem;
    public auth: Auth;
    constructor() {
        this.validations = new Validations();
        this.commonFunctions = new CommonFunctions();
        this.tokenGenerator = new TokenGenerator();
        this.fileSystem = new FileSystem();
        this.auth = new Auth();
    }

    public registrationPost(req: Request, res: Response) {
            let user: User = {
                email: req.body.email,
                password: req.body.password
            };
            //validating user input
            console.log(this.commonFunctions);
            const message = this.validations.validateRegistration(user);
            //if validation fails sending error message
            if(message) return res.status(422).send(
                {
                    error: true,
                    message: message
                }
            );
            //reading data
            this.fileSystem.readFile(join(__dirname, '../../src/users.json'), (err, data) => {
                if(err) res.send(500);
                let userdata = JSON.parse(data);
                //validating duplicate user
                let emailAlreadyExist = _.find(userdata, (o) => {
                    return o.email === user.email;
                });
                if(emailAlreadyExist) {
                    res.status(422).send(
                        {
                            error: true,
                            message: 'User already registered'
                        }
                    )
                }
                else {
                    //creating hash password
                    user.password = this.commonFunctions.createHashPassword(user.password);
                    //pushing new user to array
                    userdata.push(user);
                    let token = this.tokenGenerator.generateJWT(user);
                    this.fileSystem.writeFile(join(__dirname, '../../src/users.json'), JSON.stringify(userdata), err => {
                        if(err) res.status(500).send(err);
                        res.header('x-auth-token', token).status(200).send({
                            'email': user.email,
                            'message': 'User registered successfully'
                        });
                    });
                }
            });
    }

    public loginPost(req: Request, res: Response) {
        let user: User = {
            email: req.body.email,
            password: req.body.password
        };
        //validating user input
        const message = this.validations.validateUser(user);
        //if validation fails sending error message
        if(message) return res.status(422).send(
            {
                error: true,
                message: message
            }
        );
        //reading data
        this.fileSystem.readFile(join(__dirname, '../../src/users.json'), (err, data) => {
            if(err) res.send(500);
            //validating duplicate user
            let userdata = _.find(JSON.parse(data), (o) => {
                return o.email === user.email;
            });
            if(!userdata) {
                res.status(204).send({
                    error: true,
                    message: 'Please register'
                });
            }
            else {
                let isPasswordSame = this.validations.validatePassword(user.password, userdata.password);
                if(!isPasswordSame) return res.json({
                    error: true,
                    message: 'Invalid username or password'
                });
                let token = this.tokenGenerator.generateJWT(user);
                res.header('x-auth-token', token).status(200).send({
                    'email': user.email,
                    'message': 'User authenticated successfully'
                });
            }
        });
    }
}