# Live demo
See https://retro-speech.dosaki.net/

# Usage

The basic usage is as below:

```javascript
RetroSpeech.speak(length, gender, wave, tone, volume);
```
Valid tones are:
* `calm` - slows the text a little;
* `question` - starts in a high frequency and ends with low -> high -> low frequency;
* `exclamation` - a bit faster and ends in a 'climbing' tone of frequencies;
* `normal` - no changes

You can also let the sentence itself generate the right tone:

```javascript
RetroSpeech.speakText(text, gender, wave, volume);
```

## As a module

```shell
npm install retro-speech-maker
```

```javascript
const { RetroSpeech } = require('retro-speech-maker');

// Generate speech with a tone
RetroSpeech.speak(10, "female", "sawtooth", "calm", 0.8);
// or let the sentence itself generate the tone via punctuation
RetroSpeech.speakText("Hello there! How are you?", "female", "sawtooth", 1);
```

## As a script library

```html
<!-- index.html -->
<html>
    <body>
        <script src="retro-speech.min.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

```javascript
// main.js

// Generate speech with a tone
RetroSpeech.speak(10, "female", "sawtooth", "calm", 0.8);
// or let the sentence itself generate the tone via punctuation
RetroSpeech.speakText("Hello there! How are you?", "female", "sawtooth", 1);
```