const fs = require('fs');
import Promise from 'bluebird';

const songDataStream = fs.createReadStream('songinfo.json');

//this can tell you how many bytes of data are coming in
songDataStream.on('data', (chunk) => {
  console.log(chunk)
  console.log(`REceived ${chunk.length} bytes of data.`)
})

const genPercentThresholdMap = (songs, pfcSort) => {
  //set a score threshold
  const scoreThreshold = pfcSort ? 999000 : 990000
  return new Promise((resolve, reject) => {
    const output = [];
    songs.forEach((song, index, array) => {
      axiosHelpers.fetchScoreInfo(song[0], song[1], (data) => {
        let thresholdNumber = data.filter((score) => {
          return score >= scoreThreshold;
        }).length
        let thresholdPercent = (thresholdNumber / data.length) * 100.0;
        output.push([thresholdPercent, song])
        if (index === array.length - 1) {
          resolve(output)
          //we would have defined a reject here if it was capable of happening.
        }
      })
    })
  })
}

//this function calls the above
const gradeSort = (songs, pfcSort) => {
  //gradesort returns a promise that uses the arguments in grade sort.
  return new Promise((resolve, reject) => {
    //when we call gradesort, code stuff happens.
    //genpercentthresholdmap is called, which is a promise. When we invoke it, it needs to happen before anything else in the function.
    //We're saying first generate the threshold map, then resolve the map. So it would be called like "gradeSort(songs, pfcSort).then"
    genPercentThresholdMap(songs, pfcSort).then((tuples) => {
      tuples = mergeSort(tuples)
      const map = tuples.map((tuple) => {
        return tuple[1]
      })
      resolve(map)
      //we would have defined a reject here if it was capable of happening
    })
  })
}