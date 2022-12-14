import * as path from 'node:path';
import { createReadStream } from 'node:fs';

const cat = async (workDir, cmdArgs) => {
    if (cmdArgs.length !== 1) throw new Error('Invalid Input');
    const fileName = path.resolve(workDir, cmdArgs[0]);
    try {
        await new Promise((resolve, reject) => {
            const readStream = createReadStream(fileName);
            readStream.setEncoding('utf8');
            readStream.on('data', chunk => console.log(chunk))
            readStream.on('end', () => resolve());
            readStream.on('error', err => reject(err));
        })
    } catch {
        throw new Error('Operation failed');
    }
};

export default cat;