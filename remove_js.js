const fs = require('fs');
const file = 'script.js';

if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    const startStr = "/* ================================================================= */\r\n/* 3. CEREBRO DEL CHATBOT";
    const startIdx = content.indexOf(startStr);
    
    const endStr = "/* ================= LOGIN/REGISTRO ================= */";
    const endIdx = content.indexOf(endStr);
    
    if (startIdx !== -1 && endIdx !== -1) {
        // Remove everything between startIdx and endIdx (exclusive of endStr)
        const newContent = content.substring(0, startIdx) + content.substring(endIdx);
        fs.writeFileSync(file, newContent, 'utf8');
        console.log("Removed chat logic from script.js");
    } else {
        console.log("Could not find start or end markers for chat logic in script.js");
        if (startIdx === -1) {
            const startStr2 = "/* ================================================================= */\n/* 3. CEREBRO DEL CHATBOT";
            const startIdx2 = content.indexOf(startStr2);
            if (startIdx2 !== -1) {
                const newContent2 = content.substring(0, startIdx2) + content.substring(endIdx);
                fs.writeFileSync(file, newContent2, 'utf8');
                console.log("Removed chat logic from script.js using fallback newline");
            }
        }
    }
}
