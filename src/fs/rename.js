import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import isValidFileName from './validate-file-name.js';

const rename = async (workDir, cmdArgs) => {
    if (cmdArgs.length !== 2 || !isValidFileName(cmdArgs[1])) throw new Error('Invalid Input');
    const oldFilePath = path.resolve(workDir, cmdArgs[0]);

    const NEW_FILENAME = __dirname + '/files/properFilename.md';
    let isNewFileExists = true;
    //Check if FILE exists
    try {
        try {
            await fs.access(NEW_FILENAME, fs.constants.F_OK);
        } catch {
            isNewFileExists = false;
        }
        //throw Error if NewFile exists or rename file
        if (isNewFileExists) {
            throw Error('FS operation failed');
        } else {
            //rename or throw Error if failed
            try {
                await fs.rename(OLD_FILENAME, NEW_FILENAME);
            } catch {
                throw Error('FS operation failed');
            }
        }
    } catch (err) {
        //rethrow Error
        throw (err);
    }
};

await rename();