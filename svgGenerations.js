const crypto = require('crypto'); // For generating colors
const fs = require('fs'); // For saving the SVG to a file

function generateSVG(minterAddress, blockNumber, tokenId) {
    // Generate a unique color based on minter's address and block number
    const hash = crypto.createHash('sha256').update(minterAddress + blockNumber).digest('hex');
    const globeColor = `#${hash.slice(0, 6)}`; // Use the first 6 characters of the hash as the dynamic globe color

    // Define the gradient colors with larger differences in HSL values
    const gradientColors = [
        { offset: '0%', color: 'hsl(0, 90%, 80%)' },
        { offset: '20%', color: 'hsl(60, 90%, 80%)' },
        { offset: '40%', color: 'hsl(120, 90%, 80%)' },
        { offset: '60%', color: 'hsl(180, 90%, 80%)' },
        { offset: '80%', color: 'hsl(240, 90%, 80%)' },
        { offset: '100%', color: 'hsl(300, 90%, 80%)' },
    ];

    // Create the gradient stops based on the defined colors
    const gradientStops = gradientColors.map(({ offset, color }) => (
        `<stop offset="${offset}" stop-color="${color}" />`
    )).join('');

    // Create the SVG string with the specified size and gradient
    const svgString = `
        <svg width="550" height="550" xmlns="http://www.w3.org/2000/svg">
            <!-- Transparent background rectangle -->
            <rect width="100%" height="100%" fill="none" />

            <!-- Define the radial gradient for the globe -->
            <defs>
                <radialGradient id="gzr" gradientTransform="translate(275 275)" gradientUnits="userSpaceOnUse" r="225" cx="0" cy="0">
                    ${gradientStops}
                </radialGradient>
            </defs>

            <!-- Globe with radial gradient -->
            <circle cx="275" cy="275" r="225" fill="url(#gzr)" />

            <!-- Dynamic color globe -->
            <circle cx="275" cy="275" r="180" fill="${globeColor}" />

            <!-- Text elements -->
            <text x="50%" y="45%" font-size="20" text-anchor="middle" dominant-baseline="middle">Zora Mint Button</text>
            <text x="50%" y="55%" font-size="14" text-anchor="middle">Block: ${blockNumber}</text>
            <text x="50%" y="59%" font-size="14" text-anchor="middle">Token ID: ${tokenId}</text>
        </svg>
    `;

    // Save the SVG to a file (optional)
    fs.writeFileSync('output.svg', svgString);

    return svgString;
}

module.exports = generateSVG;
