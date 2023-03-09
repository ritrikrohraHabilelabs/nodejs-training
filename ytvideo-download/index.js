const fs = require('fs');
const ytdl = require('ytdl-core');

ytdl('https://youtu.be/MNzH-emA3Sk')
  .pipe(fs.createWriteStream('video.mp4'));