const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

function traverseDirectory(dir, callback) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverseDirectory(fullPath, callback);
        } else {
            if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
                callback(fullPath);
            }
        }
    });
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content;

    const replacements = [
        { regex: /from-\[rgba\(1,96,114,0\.7\)\]/g, replacement: 'from-[var(--gradient-from)]' },
        { regex: /to-\[rgba\(44,112,91,0\.7\)\]/g, replacement: 'to-[var(--gradient-to)]' }
    ];

    replacements.forEach(({ regex, replacement }) => {
        newContent = newContent.replace(regex, replacement);
    });

    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

traverseDirectory(directoryPath, processFile);
console.log('Gradient replacement complete.');
