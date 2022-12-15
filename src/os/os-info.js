import * as os from 'node:os';

const osInfo = (cmdArgs) => {
    if (cmdArgs.length !== 1) throw new Error('Invalid input');
    const matchRes = cmdArgs[0].match(/^--(.+)/);
    if (!matchRes) throw new Error('Invalid Input');
    switch (matchRes[1].toLowerCase()) {
        case 'eol':
            console.log(JSON.stringify(os.EOL));
            break;
        case 'cpus':
            console.log(`Number of CPUs: ${os.cpus().length}`);
            console.log(os.cpus().map(item => {
                return { model: item.model, speed: Math.round(item.speed / 1000) }
            }));
            break;
        case 'homedir':
            console.log(os.homedir());
            break;
        case 'username':
            console.log(os.userInfo().username);
            break;
        case 'architecture':
            console.log(os.arch());
            break;
        default:
            throw new Error('Invalid input');
    }
}

export default osInfo;