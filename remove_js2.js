const fs = require('fs');
const file = 'script.js';

let content = fs.readFileSync(file, 'utf8');

const rx = /\/\* ================================================================= \*\/\s*\/\* 3\. CEREBRO DEL CHATBOT[\s\S]*?\/\* ================= LOGIN\/REGISTRO ================= \*\//;
content = content.replace(rx, "/* ================= LOGIN/REGISTRO ================= */");

fs.writeFileSync(file, content, 'utf8');
console.log("Replaced using regex.");
