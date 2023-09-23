const crypto = require('crypto'); // For generating colors
const fs = require('fs'); // For saving the SVG to a file

function generateSVG(minterAddress, blockNumber, tokenId) {
    // Generate a unique color based on minter's address and block number
    const hash = crypto.createHash('sha256').update(minterAddress + blockNumber).digest('hex');
    const dynamicColor = `#${hash.slice(0, 6)}`; // Use the first 6 characters of the hash as the dynamic color

    // Calculate the brightness of the dynamic color (higher value means brighter color)
    const brightness = calculateBrightness(dynamicColor);

    // Determine the text color based on the brightness
    const textColor = brightness > 128 ? 'black' : 'white';

    // Create the SVG string with the specified size
    const svgString = `
        <svg width="550" height="550" xmlns="http://www.w3.org/2000/svg">
            <!-- Transparent background rectangle -->
            <rect width="100%" height="100%" fill="none" />

            <!-- Slightly thinner black edge circle -->
            <circle cx="275" cy="275" r="245" fill="black" />

            <!-- Button with gradient -->
            <defs>
                <radialGradient id="buttonGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" style="stop-color:${dynamicColor};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:rgba(255,255,255,0.5);stop-opacity:1" />
                </radialGradient>
            </defs>
            <circle cx="275" cy="275" r="200" fill="url(#buttonGradient)" />

            <!-- Text elements with dynamically determined text color -->
            <text x="50%" y="45%" font-size="20" text-anchor="middle" dominant-baseline="middle" fill="${textColor}">Zora Mint Button</text>
            <text x="50%" y="55%" font-size="14" text-anchor="middle" fill="${textColor}">Block: ${blockNumber}</text>
            <text x="50%" y="59%" font-size="14" text-anchor="middle" fill="${textColor}">Token ID: ${tokenId}</text>
        </svg>
    `;

    // Save the SVG to a file (optional)
    fs.writeFileSync('output.svg', svgString);

    return svgString;
}

// Function to calculate brightness from a hex color code
function calculateBrightness(hexColor) {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
}

module.exports = generateSVG;
