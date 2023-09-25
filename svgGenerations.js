const crypto = require('crypto');
const fs = require('fs');

function generateSVG() {
    // Define an array of colors
    const colors = ['#0000FF', '#FF0000', '#800080', '#008000', '#FFA500', '#FFFF00', '#FFD700', '#FFFFFF', '#C0C0C0'];

    // Initialize an empty array to store SVG strings
    const svgStrings = [];

    // Loop through the colors and generate an SVG for each
    colors.forEach((color) => {
        // Create the SVG string with the specified size and the current color
        const svgString = `
            <svg width="550" height="550" xmlns="http://www.w3.org/2000/svg">
                <!-- Transparent background rectangle -->
                <rect width="100%" height="100%" fill="none" />

                <!-- Slightly thinner black edge circle -->
                <circle cx="275" cy="275" r="245" fill="black" />

                <!-- Button with gradient -->
                <defs>
                    <linearGradient id="buttonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
                        <stop offset="100%" style="stop-color:rgba(255,255,255,0.5);stop-opacity:1" />
                    </linearGradient>
                </defs>
                <circle cx="275" cy="275" r="200" fill="url(#buttonGradient)" />

                <!-- Text element with dynamically determined text color and Inter font -->
                <text x="50%" y="50%" font-size="20" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="Inter, sans-serif">Zora Mint Button</text>
            </svg>
        `;

        // Push the SVG string to the array
        svgStrings.push(svgString);

        // Save the SVG to a file named after the color
        const colorName = color.slice(1); // Remove the '#' character
        fs.writeFileSync(`${colorName}.svg`, svgString);
    });

    return svgStrings;
}

module.exports = generateSVG;
