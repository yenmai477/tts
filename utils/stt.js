// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const fileToBase64 = require("./fileToBase64")

const client = new speech.SpeechClient();

/**
 * Calls the Speech-to-Text API on a demo audio file.
 */
async function speechToTextFromGGStorage(path) {
// The path to the remote LINEAR16 file stored in Google Cloud Storage
  // STOPSHIP: 12/15/23  Please make sure file have to in google storage or make it to base 64??
  // const gcsUri = 'gs://cloud-samples-data/speech/brooklyn_bridge.raw';
  const gcsUri = path;

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    uri: gcsUri,
  };
  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  };
  const request = {
    audio: audio,
    config: config,
  };

  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
  console.log(`Transcription: ${transcription}`);
}


/**
 * Calls the Speech-to-Text API on a demo audio file.
 */
async function speechToTextFromLocalFile(path) {
  // The path to the remote LINEAR16 file stored in Google Cloud Storage
    // STOPSHIP: 12/15/23  Please make sure file have to in google storage or make it to base 64??
    // const gcsUri = 'gs://cloud-samples-data/speech/brooklyn_bridge.raw';
    const content = await fileToBase64(path)

    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
      content
    };
    const config = {
      encoding: 'MP3',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
    };
    const request = {
      audio: audio,
      config: config,
    };

    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    console.log(`Transcription: ${transcription}`);
  }

  module.exports = { speechToTextFromGGStorage, speechToTextFromLocalFile}
