import * as  readline from 'node:readline';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import list from './fs/list.js';
import parseArgs from './cli/args.js';
import getHomeDir from './cli/get-home-dir.js';
import changeDir from './fs/change-dir.js';
import preParseCmd from './cli/pre-parse-cmd.js';
import cat from './fs/cat.js';

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
        const [command, cmdArgs] = preParseCmd(line);
        switch (command.toLowerCase()) {
            case 'cat':
                try {
                    await cat(workDir, cmdArgs);
                } catch (err) {
                    console.log(err.message);
                }
                break;
            case 'cd':
                try {
                    workDir = await changeDir(workDir, cmdArgs);
                    rl.setPrompt(`You are currently in ${workDir}\n`);
                } catch (err) {
                    console.log(err.message);
                }
                break;
            case 'ls':
                try {
                    if (cmdArgs.length) throw new Error('Invalid Input');
                    await list(workDir);
                } catch (err) {
                    console.log(err.message);
                }
                break;
            case '.exit':
                exitApp(userName);
                break;
            default:
                console.log(`Invalid Input ${command}`);
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