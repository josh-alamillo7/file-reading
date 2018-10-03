const fs = require('fs');

const songDataStream = fs.createReadStream('songinfo.json');

//this can tell you how many bytes of data are coming in
songDataStream.on('data', (chunk) => {
  console.log(chunk)
  console.log(`REceived ${chunk.length} bytes of data.`)
})