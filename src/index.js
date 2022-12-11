import * as  readline from 'node:readline';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import list from './fs/list.js';
import parseArgs from './cli/args.js';
import getHomeDir from './cli/get-home-dir.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const runFileManager = async () => {
    const args = parseArgs();
    //validate arguments
    if (!args || args[0].username === undefined) {
        console.error(`Invalid Argument. Please, start application using following format:
            \"npm run start -- --username=your_username\"`);
        process.exit(1);
    }
    const userName = args[0].username;

    let workDir = getHomeDir();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: `You are currently in ${workDir}\n`
    });

    console.log(`Welcome to the File Manager, ${userName}!\n`);
    rl.prompt();

    rl.on('line', async (line) => {
        switch (line.trim()) {
            case 'ls':
                console.log('before_list');
                await list(__dirname);
                break;
            case '.exit':
                exitApp(userName);
                break;
            default:
                console.log(`Say what? I might have heard '${line.trim()}'`);
                break;
        }
        rl.prompt();
    }).on('close', () => {
        exitApp(userName);
    });
}

const exitApp = (userName) => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.exit(0);
}

runFileManager();