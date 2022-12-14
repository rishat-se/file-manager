import * as fs from 'node:fs/promises';
import * as path from 'node:path';

const create = async (workDir, cmdArgs) => {
    //throw error if wrong argument number or invalid file name 
    if (cmdArgs.length !== 1 || /[\\/:\*\?"<>\|]+/.test(cmdArgs[0])) throw new Error('Invalid Input');
    const fileName = path.resolve(workDir, cmdArgs[0]);
    console.log(fileName);
    try {
        await fs.writeFile(fileName, '', { flag: 'wx' });
    } catch {
        throw new Error('Operation failed');
    }
};

export default create;