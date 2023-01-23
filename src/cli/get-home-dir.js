import { homedir } from 'node:os';

const getHomeDir = () => {
    return homedir();
};

export default getHomeDir;