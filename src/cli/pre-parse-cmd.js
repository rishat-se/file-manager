
const preParseCmd = (line) => {
    const cmdArr = line.trim().split(/\s+/);
    //if disk_letter: command entered than convert it to cd disk_letter:
    if (cmdArr[0].match(/^[A-Za-z]:$/)) cmdArr.unshift('cd');
    return [cmdArr[0], cmdArr.slice(1)];
}

export default preParseCmd;