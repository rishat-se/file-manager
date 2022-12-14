
const isValidFileName = (fileName) => {
    return !/[\\/:\*\?"<>\|]+/.test(fileName);
}

export default isValidFileName;