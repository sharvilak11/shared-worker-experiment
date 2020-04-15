const fs = require('fs');
const cheerio = require('cheerio');

const run = (io) => {
    // Load the gpx file
    fs.readFile(__dirname + '/selhurst-emirates.gpx', 'utf-8', (err, content) => {
        if (err) {
            console.log(err);
            return;
        }

        // Parse the gpx file
        const $ = cheerio.load(content, {
            normalizeWhitespace: true,
            xmlMode: true
        });

        // Convert the trkpt tags to normal array of objects with latitude and longitude
        const routeNodes = $('trkpt').map((i, node) => ({
            lat: Number($(node).attr('lat')),
            lng: Number($(node).attr('lon'))
        })).get();

        // Emit route to client
        if (routeNodes.length > 0) {
            let index = 0
            setInterval(() => {
                io.emit('LOCATIONUPDATED', routeNodes[index]);
                index++;
                if (index === routeNodes.length) {
                    index = 0;
                }
            }, 5000);
        }
    });
}

module.exports = {
    run
};
