const fs = require('fs');

const files = [
    'index.html',
    'venta.html',
    'reparacion-propiedad.html',
    'instalador_paneles_solares.html',
    'favoritos.html'
];

for (const f of files) {
    if (fs.existsSync(f)) {
        let content = fs.readFileSync(f, 'utf8');
        // Match from <div id="chatbot-widget" to the end of <button id="chatbot-toggle" ... </button>
        // Use non-greedy wildcard [\s\S]*?
        const rx = /<div id="chatbot-widget"[\s\S]*?id="chatbot-toggle"[\s\S]*?<\/button>/i;
        content = content.replace(rx, '');
        fs.writeFileSync(f, content, 'utf8');
        console.log('Processed', f);
    }
}
