import {resolve} from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
    {
        entry: './src/main.js',
        output: {
            path: resolve(__dirname, 'app', 'js'),
            filename: 'main.js'
        },
        devtool: 'source-map'
    },
    {
        entry: './src/speech.js',
        output: {
            path: resolve(__dirname, 'dist'),
            filename: 'retro-speech.min.js',
            library: {
                name: 'RetroSpeech',
                type: 'window'
            }
        },
        devtool: 'source-map'
    },
    {
        entry: './src/speech.js',
        output: {
            path: resolve(__dirname, 'dist'),
            filename: 'retro-speech.module.min.js',
            library: {
                name: 'RetroSpeech',
                type: 'commonjs'
            }
        },
        devtool: 'source-map'
    }
];
