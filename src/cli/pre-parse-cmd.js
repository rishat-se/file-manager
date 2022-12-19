
const preParseCmd = (line) => {
    if (!line.length) return ['', []];
    line = `${line} `;
    const cmdArgs = [];
    let arg = '';
    for (let i = 0; i < line.length; i++) {
        if (line[i] === '"') {
            let j = i + 1;
            if (arg.length || line[j].match(/\s/)) throw new Error('Invalid input');
            while (line[j] !== '"') {
                if (j === line.length) throw new Error('Invalid input');
                j++;
            }
            arg = line.substring(i + 1, j)
            if (!arg.length || line[j - 1].match(/\s/)) throw new Error('Invalid input');
            if (j !== line.length && !(line[j + 1].match(/\s/))) throw new Error('Invalid input');
            i = j + 1;
        }
        if (line[i].match(/\s/)) {
            if (arg.length) {
                cmdArgs.push(arg);
                arg = '';
            }
        } else {
            arg = `${arg}${line[i]}`;
        }
    }
    //if 'disk_letter:' command entered than convert it to 'cd disk_letter:'
    if (cmdArgs[0].match(/^[A-Za-z]:$/)) cmdArgs.unshift('cd');
    //if 'up' command entered convert it to 'cd ..'
    if (cmdArgs[0].match(/^up$/i)) {
        cmdArgs.unshift('cd');
        cmdArgs[1] = '..';
    }
    return [cmdArgs[0], cmdArgs.slice(1)];
}

export default preParseCmd;