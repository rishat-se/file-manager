import process from 'node:process';

const parseArgs = () => {
    const args = [];
    for (let i = 2; i < process.argv.length; i++) {
        const matchRes = process.argv[i].match(/^--(\w+)=(\w+)$/);
        if (matchRes) {
            args.push({ [matchRes[1]]: matchRes[2] });
        }
    }
    return args.length ? args : null;
}


export default parseArgs;