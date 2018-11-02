module.exports = require('yargs')
    .option('sourceDirectory')
    .alias('s', 'sourceDirectory')
    .option('destinationDirectory')
    .alias('d', 'destinationDirectory')
    .demandOption(['sourceDirectory', 'destinationDirectory'])
    .argv;
