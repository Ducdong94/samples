const fs = require('fs');
const readline = require('readline');

// Path to the file you want to read
// Link download file: https://github.com/sapics/ip-location-db
const filePath = 'geolite2-city-ipv4.csv';

// Create a read stream for the file
const fileStream = fs.createReadStream(filePath);

// Create readline interface
const rl = readline.createInterface({
    input: fileStream,
    output: process.stdout,
    terminal: false
});

let len = 0;

// Read line-by-line
rl.on('line', (line) => {
    len++
    let spl = line.split(',')
    fs.appendFileSync(`ip-location.json`, JSON.stringify({
        ip_range_start: spl[0],
        ip_range_end: spl[1],
        country_code: spl[2],
        region: spl[5],
        longitude: Number(spl[7]),
        latitude: Number(spl[8]),
    }) + `,\n`, `utf8`);
});

// Handle end of file
rl.on('close', () => {
    console.log('File reading completed. Len: ', len);
});

// Handle errors
rl.on('error', (error) => {
    console.error('Error reading file:', error);
});