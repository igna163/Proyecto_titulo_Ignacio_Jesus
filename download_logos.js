const fs = require('fs');
const https = require('https');
const path = require('path');

const imgDir = path.join(__dirname, 'img');

if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
}

const imagesToDownload = [
    { name: 'logo-nexxos.png', url: 'https://logo.clearbit.com/nexxos.cl', fallback: 'https://ui-avatars.com/api/?name=Nexxos&background=fff&color=333&size=200' },
    { name: 'logo-mercadolibre.png', url: 'https://logo.clearbit.com/mercadolibre.cl', fallback: 'https://ui-avatars.com/api/?name=Mercado+Libre&background=FFE600&color=2D3277&size=200' },
    { name: 'logo-toctoc.png', url: 'https://logo.clearbit.com/toctoc.com', fallback: 'https://ui-avatars.com/api/?name=TOC+TOC&background=00d2b6&color=fff&size=200' },
    { name: 'logo-goplaceit.png', url: 'https://logo.clearbit.com/goplaceit.com', fallback: 'https://ui-avatars.com/api/?name=Goplaceit&background=ff4d4d&color=fff&size=200' },
    { name: 'logo-notarias.png', url: 'https://ui-avatars.com/api/?name=Notarias+de+Confianza&background=bfa378&color=fff&size=200', fallback: null }
];

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302) {
                if (res.statusCode === 301 || res.statusCode === 302) {
                    // Redirect
                    downloadFile(res.headers.location, dest).then(resolve).catch(reject);
                    return;
                }
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else {
                reject(new Error(`Failed with status code: ${res.statusCode}`));
            }
        }).on('error', (err) => {
            if (fs.existsSync(dest)) fs.unlinkSync(dest);
            reject(err);
        });
    });
}

async function run() {
    for (const item of imagesToDownload) {
        const dest = path.join(imgDir, item.name);
        try {
            console.log(`Downloading ${item.name} from clearbit...`);
            await downloadFile(item.url, dest);
            console.log(`Success: ${item.name}`);
        } catch (err) {
            console.log(`Failed for ${item.name}: ${err.message}. Trying fallback...`);
            if (item.fallback) {
                try {
                    await downloadFile(item.fallback, dest);
                    console.log(`Success (fallback): ${item.name}`);
                } catch (errFallback) {
                    console.log(`Fallback failed: ${errFallback.message}`);
                }
            }
        }
    }
}

run();
