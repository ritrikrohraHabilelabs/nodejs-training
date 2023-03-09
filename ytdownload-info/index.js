const fs = require("fs");
const path = require("path");
const ytdl = require("ytdl-core");
const mime = require('mime-types')

const videoURL = [
  "https://youtu.be/ok-plXXHlWw",
  "https://youtu.be/DHjqpvDnNGE",
  "https://youtu.be/Tn6-PIqc4UM",
  "https://youtu.be/-bt_y4Loofg",
  "https://youtu.be/NrO0CJCbYLA",
];

const dirPath = path.join(__dirname, "assets/videos");
const fileInfo = []

try {
  fs.mkdirSync(dirPath, { recursive: true });

  videoURL.map((url, index) =>
    ytdl(`${url}`).pipe(fs.createWriteStream(`${dirPath}/video${index}.mp4`))
  );

  const dirContainedFiles = fs.readdirSync(`${dirPath}`)

  dirContainedFiles.map((file, index)=>{
    const file_extension = path.extname(file);
    const file_size = parseInt(fs.statSync(`${dirPath}/video${index}.mp4`).size * 0.000001) + "mb"
    const file_created_time = fs.statSync(`${dirPath}/video${index}.mp4`).birthtime.toLocaleDateString()
    const file_mime_type = mime.lookup(`${dirPath}/video${index}.mp4`)
    fileInfo.push({file_name : file, file_extension, file_mime_type, file_size, file_created_time})
  });

  console.log(fileInfo)
  console.table(fileInfo)

} catch (error) {
  console.log(error);
}
