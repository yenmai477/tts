/**
 * Lists available voices for the specified language.
 *
 * @param {string} languageCode - The language code.
 */
async function listVoices(languageCode) {
  const textToSpeech = require('@google-cloud/text-to-speech');

  const client = new textToSpeech.TextToSpeechClient();

  const [result] = await client.listVoices({languageCode});
  const voices = result.voices;

  voices.forEach((voice) => {
    console.log(`${voice.name} (${voice.ssmlGender}): ${voice.languageCodes}`);
  });
}


/**
 * Sythesizes sample text into an .mp3 file.
 */
async function synthesize(text) {
  const textToSpeech = require('@google-cloud/text-to-speech');
  const fs = require('fs');
  const util = require('util');

  const client = new textToSpeech.TextToSpeechClient();

  const request = {
    input: {text: text},
    voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    audioConfig: {audioEncoding: 'MP3'},
  };

  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(`./outputs/output_${Date.now()}.mp3`, response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
}
module.exports = {listVoices, synthesize}
