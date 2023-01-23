import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import { createHash } from 'node:crypto';

const calculateHash = async (workDir, cmdArgs) => {
    if (cmdArgs.length !== 1) throw new Error('Invalid Input');
    const filePath = path.resolve(workDir, cmdArgs[0]);
    try {
        const content = await fs.readFile(filePath, { encoding: 'utf8' });
        const hash = createHash('sha256').update(content);
        console.log(`\x1b[34m${hash.digest('hex')}\x1b[0m`);
    } catch {
        throw new Error('Operation failed');
    }
};

export default calculateHash;