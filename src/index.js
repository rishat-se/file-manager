import * as  readline from 'node:readline';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import list from './fs/list.js';
import parseArgs from './cli/args.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const runFileManager = async () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'You are currently in path_to_working_directory\n'
    });
    console.log('Welcome to the File Manager, Username!\n');
    rl.prompt();

    rl.on('line', async (line) => {
        switch (line.trim()) {
            case 'ls':
                console.log('before_list');
                await list(__dirname);
                break;
            case '.exit':
                exitApp();
                break;
            default:
                console.log(`Say what? I might have heard '${line.trim()}'`);
                break;
        }
        rl.prompt();
    }).on('close', () => {
        exitApp();
    });
}

const exitApp = () => {
    console.log('Thank you for using File Manager, Username, goodbye!');
    process.exit(0);
}

runFileManager();