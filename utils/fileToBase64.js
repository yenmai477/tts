const fs = require('fs').promises;

const fileToBase64 = async (path) => {
  const content = await fs.readFile(path, {encoding: 'base64'});
  return content;
}

module.exports = fileToBase64
