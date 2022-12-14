import { readdir } from 'node:fs/promises';

const list = async (folderPath) => {
    try {
        const files = (await readdir(folderPath, { withFileTypes: true }))
            .sort((a, b) => {
                if (a.isDirectory() !== b.isDirectory()) return b.isDirectory() - a.isDirectory();
                return a.name.localeCompare(b.name);
            })
            .map(item => { return { Name: item.name, Type: item.isDirectory() ? 'directory' : 'file' } });
        files.length ? console.table(files) : console.log('Directory is empty');
    } catch {
        throw new Error('Operation Failed');
    }
}

export default list;