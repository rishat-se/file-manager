import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import isValidFileName from './validate-file-name.js';

const rename = async (workDir, cmdArgs) => {
    if (cmdArgs.length !== 2 || !isValidFileName(cmdArgs[1])) throw new Error('Invalid Input');
    const oldFilePath = path.resolve(workDir, cmdArgs[0]);
    const newFilePath = path.resolve(path.dirname(oldFilePath), cmdArgs[1]);
    try {
        //check if new file exists
        await new Promise((resolve, reject) => {
            fs.access(newFilePath, fs.constants.F_OK)
                .then(() => reject(new Error()))
                .catch(() => resolve())
        })
        //rename
        console.log('newfile doesnt exist');
        await fs.rename(oldFilePath, newFilePath);
    } catch {
        throw new Error('Operation failed');
    }
};

export default rename;