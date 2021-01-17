const fs = require("fs")
const path = require("path")
const sharp = require("sharp")
const _ = require("lodash")

const imagesPath = path.resolve(__dirname, "static", "img")

let staticImagesArray = fs.readdirSync(imagesPath)

let staticImagesNames = []
let freshImageName = []

staticImagesArray.forEach(staticImage => {
  staticImagesNames.push(staticImage.split(".").slice(0, -1).join("."))
})

let excludeThumbnails = staticImagesArray.filter(imageName => {
  return !imageName.endsWith("-thumbnail.webp")
})

for (let j = 0; j < staticImagesNames.length; j++) {
  freshImageName.push(staticImagesNames[j].split("-thumbnail").join(""))
}

let uniqueNamesArray = _.uniq(freshImageName)
let excludeThumbnailsUnique = _.uniq(excludeThumbnails)

console.log(excludeThumbnailsUnique)

for (let index = 0; index < uniqueNamesArray.length; index++) {
  const staticImage = excludeThumbnailsUnique[index]

  console.log(staticImage)

  sharp(path.join(imagesPath, staticImage))
    .sharpen()
    .toBuffer()
    .then(result => {
      sharp(result)
        .toFile(
          path.resolve(
            imagesPath,
            uniqueNamesArray[index] + "-thumbnail" + ".webp"
          )
        )
        .then(fileCreatedResult => {
          console.log("file created")
        })
        .catch(error => {
          console.log(error)
        })
    })
    .catch(error => {
      console.log(error)
    })
}

console.log(staticImagesArray.length)
