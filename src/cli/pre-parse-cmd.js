
const preParseCmd = (line) => {
    const cmdArr = line.trim().split(/\s+/);
    //if 'disk_letter:' command entered than convert it to 'cd disk_letter:'
    if (cmdArr[0].match(/^[A-Za-z]:$/)) cmdArr.unshift('cd');
    //if 'up' command entered convert it to 'cd ..'
    if (cmdArr[0].match(/^up$/i)) {
        cmdArr.unshift('cd');
        cmdArr[1] = '..';
    }
    return [cmdArr[0], cmdArr.slice(1)];
}

export default preParseCmd;