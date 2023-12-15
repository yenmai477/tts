
const util = require('util');
const exec = util.promisify(require('child_process').exec);


async function edge_tts(text) {
  const { stdoutList, stderrList } = await exec("edge-tts --list-voices");
  console.log('list:', stdoutList);

  const { stdout, stderr } = await exec(`edge-tts -t "${text}" --write-media outputs/output_${Date.now()}.mp3`);
  // console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}


module.exports = {edge_tts}
