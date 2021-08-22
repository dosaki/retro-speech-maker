# Live demo
See https://retro-speech.dosaki.net/

# Usage

The basic usage is as below:

```javascript
RetroSpeech.speak(length, gender, wave);
```

## As a module

```javascript
const { RetroSpeech } = require('./retro-speech.module.min');
RetroSpeech.speak(10, "female", "sawtooth");
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
const { RetroSpeech } = require('./retro-speech.module.min');
RetroSpeech.speak(10, "female", "sawtooth");
```