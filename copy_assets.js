const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\acer\\.gemini\\antigravity-ide\\brain\\beed7116-11cd-4744-9c04-820d9d7924b3';
const destDir = 'c:\\Users\\acer\\Documents\\bila';

const filesToCopy = [
    { src: 'stippled_red_heart_1785176222954.png', dest: 'stippled_red_heart.png' },
    { src: 'mini_red_love_cursor_1785176239691.png', dest: 'mini_love.png' },
    { src: 'closed_envelope_wax_seal_1785176257635.png', dest: 'closed_envelope.png' }
];

filesToCopy.forEach(file => {
    const srcPath = path.join(srcDir, file.src);
    const destPath = path.join(destDir, file.dest);
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${file.src} -> ${file.dest}`);
    } else {
        console.error(`File not found: ${srcPath}`);
    }
});
