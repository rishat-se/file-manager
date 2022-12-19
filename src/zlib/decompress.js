import * as path from 'node:path';
import * as fs from 'node:fs/promises'
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createBrotliDecompress } from 'node:zlib';
import isValidFileName from '../fs/validate-file-name.js';

const decompress = async (workDir, cmdArgs) => {
    if (cmdArgs.length !== 2 || !isValidFileName(path.basename(cmdArgs[1]))) throw new Error('Invalid Input');
    const BROTLI_EXT = '.br';
    const inFilePath = path.resolve(workDir, cmdArgs[0]);
    let outFilePath = path.resolve(workDir, cmdArgs[1]);
    try {
        //if outFilePath is directory, then derive filename from inFilePath and remove
        //brotli extension if present
        try {
            const fstat = await fs.stat(outFilePath);
            if (!fstat.isDirectory()) throw new Error();
            outFilePath = path.join(outFilePath, path.basename(inFilePath).replace(/\.br$/i, ''));
        } catch {
        }

        //check if input file exist
        await fs.access(inFilePath, fs.constants.F_OK);

        // throw Error if outfile exists
        await new Promise((resolve, reject) => {
            fs.access(outFilePath, fs.constants.F_OK)
                .then(() => reject(new Error()))
                .catch(() => resolve())
        });

        const readStream = createReadStream(inFilePath);
        const writeStream = createWriteStream(outFilePath);
        const brotliDecompress = createBrotliDecompress();
        await pipeline(
            readStream,
            brotliDecompress,
            writeStream
        )
    } catch {
        throw new Error('Operation failed');
    }
};

export default decompress;