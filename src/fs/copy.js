import * as fs from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import * as path from 'node:path';
import { pipeline } from 'node:stream/promises';

const copy = async (workDir, cmdArgs) => {
    if (cmdArgs.length !== 2) throw new Error('Invalid Input');
    const fileOldPath = path.resolve(workDir, cmdArgs[0]);
    let fileNewPath = path.resolve(workDir, cmdArgs[1]);
    fileNewPath = path.join(fileNewPath, path.basename(fileOldPath));
    try {
        //check if file exist
        await fs.access(fileOldPath, fs.constants.F_OK);
        //check if destination file exist
        await new Promise((resolve, reject) => {
            fs.access(fileNewPath, fs.constants.F_OK)
                .then(() => reject(new Error()))
                .catch(() => resolve())
        })
        await pipeline(
            createReadStream(fileOldPath),
            createWriteStream(fileNewPath)
        )
    } catch {
        throw new Error('Operation failed');
    }
};

export default copy;