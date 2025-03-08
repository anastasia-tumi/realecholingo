const express = require('express');
const fs = require('fs');
const path = require('path');
const textToSpeech = require('@google-cloud/text-to-speech');
const app = express();
const client = new textToSpeech.TextToSpeechClient();

// Set the path to your service account key file
const keyPath = 'echolingo-453116-56239aef94de.json';
process.env.GOOGLE_APPLICATION_CREDENTIALS = keyPath;

// Parse incoming JSON bodies
app.use(express.json());

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

app.post('/synthesize', async (req, res) => {
    try {
        const { text } = "hello"; // The text to be converted to speech

        // Set up the request for the API
        const request = {
            input: { text: text },
            voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
            audioConfig: { audioEncoding: 'MP3' },
        };

        // Call the Google Cloud Text-to-Speech API
        const [response] = await client.synthesizeSpeech(request);

        // Send the audio file as response
        res.set('Content-Type', 'audio/mpeg');
        res.send(response.audioContent);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error converting text to speech');
    }
});

//comment

/Users/anastasia/EchoLingo-1/EchoLingo/text-to-speech/index.js