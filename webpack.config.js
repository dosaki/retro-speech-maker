const path = require('path');

module.exports = [
    {
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, 'app', 'js'),
            filename: 'main.js'
        },
        devtool: 'source-map'
    },
    {
        entry: './src/speech.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'retro-speech.min.js',
            library: {
                name:'RetroSpeech',
                type: 'window'
            }
        },
        devtool: 'source-map'
    },
    {
        entry: './src/speech.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'retro-speech.module.min.js',
            library: {
                name:'RetroSpeech',
                type: 'commonjs'
            }
        },
        devtool: 'source-map'
    }
];
