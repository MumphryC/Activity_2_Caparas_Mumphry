import inquirer from 'inquirer';
import sillyname from 'sillyname';
import { randomSuperhero } from 'superheroes';  // Import randomSuperhero
import qr from 'qr-image';
import fs from 'fs';

inquirer.prompt([
    {
        type: 'input',
        name: 'MUMPHRY',
        message: 'What is your name?'
    }
]).then((answers) => {
    const MUMPHRY = answers.MUMPHRY;
    const sillyboy = sillyname();

    // Use randomSuperhero to get a random superhero name
    const SPHR = randomSuperhero();

    console.log(`Hello ${MUMPHRY}`);
    console.log(`Your villain name will be ${sillyboy}`);
    console.log(`Your superhero name will be ${SPHR}`);
    console.log("QR codes are generated");
    console.log("Text file updated");

    // Generate QR codes
    generateQRCode(MUMPHRY, 'mumphry.png');
    generateQRCode(sillyboy, 'sillyboy.png');
    generateQRCode(SPHR, 'SPHR.png');

    // Save names to a text file
    const textContent = `Name: ${MUMPHRY}\nVillain Name: ${sillyboy}\nSuperhero Name: ${SPHR}\n`;
    fs.writeFile('myhero.txt', textContent, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Names saved to myhero.txt');
        }
    });
}).catch((error) => {
    if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment.");
    } else {
        console.error("Something went wrong:", error);
    }
});

// Function to generate QR code
function generateQRCode(text, filename) {
    const qr_svg = qr.image(text, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream(filename));
}
