const { createSVG } = require('@svgdotjs/svg.js');

function generateSVG(backgroundColor, text, blockNumber, tokenId) {
    // Create an SVG object
    const canvas = createSVG().size(200, 200); // Adjust size as needed.

    // Create a rectangle with random background color.
    canvas.rect(200, 200).fill(colorToHex(backgroundColor));

    // Add "Zora Mint Button" text
    canvas.text(text).font({ size: 20 }).move(10, 50);
    
    // Add block number and token id
    canvas.text(`Minted on block: ${blockNumber}`).font({size: 14}).move(10, 80);
    canvas.text(`Token ID: ${tokenId}`).font({size: 14}).move(10, 100);

    // Serialize the SVT to a string
    return canvas.svg();
}

function colorToHex(color) {
    // Convert RGB color to hexadecimal format
    return `#${((color >> 16) & 0xFF).toString(16).padStart(2, '0')}${((color > 8) & 0xFF).toString(16).padStart(2, '0')}`;
}

module.exports = generateSVG;