import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import app from "../src/app";
import { TokenGenerator } from '../src/utility/tokengenerator';
import { join } from 'path';
import { FileSystem } from '../src/utility/filesystem';
import *  as _ from 'lodash';

chai.use(chaiHttp);

let tokenGenerator = new TokenGenerator();
let fileSystem = new FileSystem();


describe('User api', () => {
    it('should return unauthorized for / endpoint', function() {
        chai.request(app).get('/').end(function(err, res) {
            chai.expect(res).to.have.status(401);
        });
    });

    it('should return unauthorized for /users', function() {
        chai.request(app).get('/users').end(function(err, res) {
            chai.expect(res).to.have.status(401);
        });
    });

    it('should return unauthorized for /users/1', function() {
        chai.request(app).get('/users').end(function(err, res) {
            chai.expect(res).to.have.status(401);
        });
    });

    it('should return success for / endpoint', function() {
        let user = {
            email: 'sample@gmail.com',
            password: 'Arihant$90'
        }
        let token = tokenGenerator.generateJWT(user);
        chai.request(app).get('/').set('x-auth-token', token).end(function(err, res) {
            chai.expect(res).to.have.status(200);
        });
    });

    it('should return success for /users endpoint', function() {
        let user = {
            email: 'sample@gmail.com',
            password: 'Arihant$90'
        }
        let token = tokenGenerator.generateJWT(user);
        chai.request(app).get('/').set('x-auth-token', token).end(function(err, res) {
            chai.expect(res).to.have.status(200);
        });
    });

    it('should return success for /users/1 endpoint', function() {
        let user = {
            email: 'sample@gmail.com',
            password: 'Arihant$90'
        }
        let token = tokenGenerator.generateJWT(user);
        chai.request(app).get('/').set('x-auth-token', token).end(function(err, res) {
            chai.expect(res).to.have.status(200);
        });
    });

    it('should return success and token for /v1/registration endpoint', function() {
        chai.request(app).post('/v1/registration').send({ email: 'acheive1@gmail.com', password: 'Acheive$90'}).end(function(err, res) {
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.have.header('x-auth-token');
            console.log(join(__dirname, '../../src/users.json'));
            fileSystem.readFile(join(__dirname, '../src/users.json'), (err, data) => {
                console.log('data ', data);
                let index = _.findIndex(data, function(o) { return o.email == 'acheive@gmail.com'; });
                data = JSON.parse(data);
                data.splice(index, 1);
                fileSystem.writeFile(join(__dirname, '../src/users.json'), JSON.stringify(data), err => {
                });
            });
        });
    });
});