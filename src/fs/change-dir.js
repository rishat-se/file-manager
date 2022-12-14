import * as path from 'node:path';
import { stat } from 'node:fs/promises';

const changeDir = async (workDir, cmdArgs) => {
    if (cmdArgs.length !== 1) throw new Error('Invalid Input');
    let newPath = path.resolve(workDir, cmdArgs[0]);
    if (cmdArgs[0].match(/^[A-Za-z]:$/)) newPath = path.join(cmdArgs[0], path.sep);
    //    console.log(newPath);
    try {
        const fstat = await stat(newPath);
        if (!fstat.isDirectory()) throw new Error();
        return newPath;
    } catch {
        throw new Error('Operation failed');
    }
}

export default changeDir;