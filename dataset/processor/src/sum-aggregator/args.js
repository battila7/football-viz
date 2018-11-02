module.exports = require('yargs')
    .option('sourceFile')
    .alias('s', 'sourceFile')
    .option('destinationFile')
    .alias('d', 'destinationFile')
    .demandOption(['sourceFile', 'destinationFile'])
    .argv;
