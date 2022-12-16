import process from 'node:process';

const parseArgs = () => {
    const args = {};
    for (let i = 2; i < process.argv.length; i++) {
        const matchRes = process.argv[i].match(/^--(\w+)=(\w+)$/);
        if (matchRes) {
            args[matchRes[1]] = matchRes[2];
        }
    }
    return Object.keys(args).length ? args : null;
}


export default parseArgs;