
const {listVoices, synthesize} = require("./utils/tts")

// tts
// listVoices()
// synthesize('This is a demonstration of the Google Cloud Text-to-Speech API')


// stt

const {speechToTextFromLocalFile, speechToTextFromGGStorage} = require("./utils/stt")

speechToTextFromGGStorage("gs://cloud-samples-data/speech/brooklyn_bridge.raw")
speechToTextFromLocalFile("./outputs/output.mp3")
