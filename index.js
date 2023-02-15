// comment all code
const fs = require('fs');
const readline = require('readline');

const userInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questionToBuild = (question) => {
  return new Promise((resolve) => {
    userInput.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const generateSVG = (width, height, color, shape, text, fontSize) => {
  width = parseInt(width, 10);
  height = parseInt(height, 10);
  fontSize = parseInt(fontSize, 10);

  // Check if the shape is rectangle or circle
  if (shape !== 'rectangle' && shape !== 'circle') {
    throw new Error('Shape must be either rectangle or circle');
  }

  let shapeSVG;
  // Generate svg code depending on shape
  if (shape === 'rectangle') {
    shapeSVG = `<rect width="${width}" height="${height}" fill="${color}"/>`;
  } else {
    const dimensions = Math.min(width, height) / 2;
    shapeSVG = `<circle cx="${width / 2}" cy="${height / 2}" r="${dimensions}" fill="${color}"/>`;
  }

  // Generate the SVG with the provided parameters
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    ${shapeSVG}
    <text x="${width / 2}" y="${height / 2}" text-anchor="middle" fill="white" font-size="${fontSize}">${text}</text>
  </svg>`;
}; 

(async () => {
  try {
    // Ask and receive answers to several questions
    const color = await questionToBuild('Enter a color for the logo: ');
    const shape = await questionToBuild('Enter a shape for the logo (rectangle or Circle?): ');
    const width = await questionToBuild('Enter the width of the logo: ');
    const height = await questionToBuild('Enter the height of the logo: ');
    const text = await questionToBuild('Enter the text for the logo: ');
    const fontSize = await questionToBuild('Enter the font size for the text: ');

    const svg = generateSVG(width, height, color, shape, text, fontSize);

    // Write the generated SVG to a file
    fs.writeFileSync('logo.svg', svg);

    console.log('Logo generated and saved as logo.svg');

    // Close the user input interface
    userInput.close();
  } catch (error) {
    console.error(error)
  };
})();
