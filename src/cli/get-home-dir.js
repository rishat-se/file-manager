import process from 'node:process';
import { join } from 'node:path';

const getHomeDir = () => {
    return join(process.env.HOMEDRIVE, process.env.HOMEPATH);
};

export default getHomeDir;