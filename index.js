const fs          = require('fs');
const BINARY_FILE = 'data.bin';
const JSON_FILE   = 'data.json';

const writeFile = (data, file) => {
    return new Promise((resolve, reject) => {
        fs.writeFileSync(file, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

const readFile = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

const populateTextFile = async () => {
    const data = [];
    for (let i = 0; i < 10000; i++) {
        if( i % 2 === 0) {
            data.push(i);
        }
    }
    await writeFile(JSON.stringify(data), JSON_FILE);
}

const populateBinaryFile = async () => {
    const data = [1];
    for (let i = 0; i < 10000; i++) {
        if( i % 2 === 0) {
            data.push(i);
        }
    }

    let buffer = Buffer.from(data);
    await writeFile(buffer, BINARY_FILE);
}

const searchEvenIndex = async (type) => {
    let data = [];
    console.time(type);

    if( type === 'json') {
        let jsonData = await readFile(JSON_FILE);
        data         = JSON.parse(jsonData);
    } else {
        let binaryData = await readFile(BINARY_FILE);
        data           = Buffer.from(binaryData).toJSON().data;
    }

    const index = data.indexOf(56);
    console.timeEnd(type);
}

(async () => {
    try {
        // await populateBinaryFile();
        // await populateTextFile();

        await searchEvenIndex('json');
        await searchEvenIndex('binary');

    } catch (err) {
        console.log(err);
    }
})();
