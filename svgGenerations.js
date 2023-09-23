const fs = require('fs');
const svg2img = require('svg2img');

function generateSVG(backgroundColor, text, blockNumber, tokenId) {
    const svgString = `
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" fill="${colorToHex(backgroundColor)}" />
            <text x="10" y="50" font-size="20">${text}</text>
            <text x="10" y="80" font-size="14">Minted in Zora Block: ${blockNumber}</text>
            <text x="10" y="100" font-size="14">Token ID: ${tokenId}</text>
        </svg>
    `;

    svg2img(svgString, (error, buffer) => {
        if (error) {
            console.error(error);
        } else {
            fs.writeFileSync('output.png', buffer);
            console.log('SVG image saved as output.png');
        }
    });
}

function colorToHex(color) {
    return `#${((color >> 16) & 0xFF).toString(16).padStart(2, '0')}${((color >> 8) & 0xFF).toString(16).padStart(2, '0')}${(color & 0xFF).toString(16).padStart(2, '0')}`;
}

module.exports = generateSVG;
