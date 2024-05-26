const process = require('process');
const fs = require('fs');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error: ${err}`);
            return
        }
        console.log(data);
    });
}

cat(process.argv[2]);

