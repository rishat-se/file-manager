import * as fs from 'node:fs/promises';
import * as path from 'node:path'

const remove = async (workDir, cmdArgs) => {
    if (cmdArgs.length !== 1) throw new Error('Invalid Input');
    const fileName = path.resolve(workDir, cmdArgs[0]);
    console.log(fileName);
    try {
        await fs.rm(fileName);
    } catch {
        throw new Error('Operation failed');
    }
};

export default remove;