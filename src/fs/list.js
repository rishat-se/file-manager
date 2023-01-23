import { readdir } from 'node:fs/promises';

const list = async (folderPath) => {
    try {
        const files = (await readdir(folderPath, { withFileTypes: true }))
            .sort((a, b) => {
                if (a.isDirectory() !== b.isDirectory()) return b.isDirectory() - a.isDirectory();
                return a.name.localeCompare(b.name);
            })
            .map(item => { return { Name: item.name, Type: item.isDirectory() ? 'directory' : 'file' } });
        files.length ? console.table(files) : console.log('\x1b[34m', 'Directory is empty', '\x1b[0m');
    } catch {
        throw new Error('Operation failed');
    }
}

export default list;