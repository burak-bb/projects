function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        const { protocol, hostname } = new URL(url);
        const lib = protocol === 'https:' ? https : http;

        lib.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }

            let data = '';
            response.on('data', (chunk) => { data += chunk; });
            response.on('end', () => resolve({ hostname, data }));
        }).on('error', (error) => reject(error));
    });
}


async function main(filename) {
    try {
        const urls = fs.readFileSync(filename, 'utf-8').split('\n').filter(Boolean);

        const downloadPromises = urls.map(async (url) => {
            try {
                const { hostname, data } = await fetchUrl(url);
                fs.writeFileSync(`${hostname}.html`, data);
                console.log(`Wrote to ${hostname}`);
            } catch (error) {
                console.error(`Couldn't download ${url}`);
            }
        });

        await Promise.all(downloadPromises);
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
    }
}

if (process.argv.length !== 3) {
    console.error('Usage: node urls.js FILENAME');
    process.exit(1);
}

const filename = process.argv[2];
main(filename);