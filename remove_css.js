const fs = require('fs');
const file = 'style.css';

if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // Remove main chat styles block
    const mainRx = /\/\* ========================================= \*\/\s*\/\* ESTILOS DEL CHATBOT \(INTEGRADO\)[\s\S]*?\/\* Responsive Generales \*\//;
    content = content.replace(mainRx, '/* Responsive Generales */');

    // Remove .chatbot-widget inside media queries
    const mqRx = /\.chatbot-widget\s*\{[^}]+\}/g;
    content = content.replace(mqRx, '');

    // Remove any leftover .chatbot-toggle inside media queries just in case
    const tqRx = /\.chatbot-toggle\s*\{[^}]+\}/g;
    content = content.replace(tqRx, '');

    // Remove dark mode chat styles
    const darkRx1 = /body\.dark-mode\s*\.chatbot-widget[^\{]*\{[^}]+\}/g;
    const darkRx2 = /body\.dark-mode\s*\.chatbot-[^\{]*\{[^}]+\}/g;
    const darkRx3 = /body\.dark-mode\s*\.chat-[^\{]*\{[^}]+\}/g;
    content = content.replace(darkRx1, '');
    content = content.replace(darkRx2, '');
    content = content.replace(darkRx3, '');

    // Specifically for the body.dark-mode .chatbot-widget, .chat-header rules, we can just remove lines containing them until closing brace if multiline, but JS regex works fine.
    
    // Fallback: If there's a comma separated selector like `body.dark-mode .chatbot-widget, body.dark-mode .chat-header { ... }`
    const complexDarkRx = /body\.dark-mode\s*\.chatbot-widget,[\s\S]*?\{[\s\S]*?\}/g;
    content = content.replace(complexDarkRx, '');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log("Cleaned CSS");
}
