import { readFile, writeFile } from 'fs';

export class FileSystem {
    public readFile(path, callback) {
        readFile(path, 'utf8', (err, data) => {
            callback(err, data);
        });
    }
    public writeFile(path, data, callback) {
        writeFile(path, data, 'utf8', err => {
            callback(err);
        });
    }   
}