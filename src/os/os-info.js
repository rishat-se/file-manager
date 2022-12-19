import * as os from 'node:os';

const osInfo = (cmdArgs) => {
    if (cmdArgs.length !== 1) throw new Error('Invalid input');
    const matchRes = cmdArgs[0].match(/^--(.+)/);
    if (!matchRes) throw new Error('Invalid Input');
    switch (matchRes[1].toLowerCase()) {
        case 'eol':
            console.log('\x1b[34m', JSON.stringify(os.EOL), '\x1b[0m');
            break;
        case 'cpus':
            console.log('\x1b[34m', `Number of CPUs: ${os.cpus().length}`, '\x1b[0m');
            console.log(os.cpus().map(item => {
                return { model: item.model, speed: Math.round(item.speed / 1000) }
            }));
            break;
        case 'homedir':
            console.log('\x1b[34m', os.homedir(), '\x1b[0m');
            break;
        case 'username':
            console.log('\x1b[34m', os.userInfo().username, '\x1b[0m');
            break;
        case 'architecture':
            console.log('\x1b[34m', os.arch(), '\x1b[0m');
            break;
        default:
            throw new Error('Invalid input');
    }
}

export default osInfo;