import { hashSync } from 'bcrypt';

export class CommonFunctions {

    // use to create hash password
    public createHashPassword(password): string {
        //creating hash password
        console.log(password);
        return hashSync(password, 8);
    }
}