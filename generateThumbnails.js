const fs = require("fs")
const path = require("path")
const sharp = require("sharp")
const _ = require("lodash")

const imagesPath = path.resolve(__dirname, "static", "img")
const rootPath = path.resolve(__dirname, "fileNames.txt")

let staticImagesFolder = fs.readdirSync(imagesPath)
let staticImagesFiles = [...staticImagesFolder]

let isWebp = /^.*\.webp$/
let isThumbnail = /-thumbnail\.webp$/
let sharpSupportedFormats = /^.*\.jpg$|^.*\.png$|^.*\.jpeg$|^.*\.avif$|^.*\.tiff$|^.*\.webp$/

const writeFileNamesToLog = () => {
  fs.readFile(rootPath, { encoding: "utf-8" }, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      if (data.length > 0) {
        fs.truncate(rootPath, 0, error => {
          if (error) {
            console.log(error)
          } else {
            staticImagesArray.forEach(imageFile => {
              let fileHeader

              staticImagesArray[0] == imageFile
                ? (fileHeader =
                    "FILES THAT WERE PRESENT ON THE PREVIOUS SUCCESSFULL CYCLE \n  ====================================================== \n \n")
                : (fileHeader = "")

              fs.writeFile(rootPath, imageFile + "\n", { flag: "a" }, error => {
                if (error) {
                  console.log(error)
                } else {
                  console.log("File name written succesfully")
                }
              })
            })
          }
        })
      } else {
        staticImagesArray.forEach(imageFile => {
          fs.writeFile(rootPath, imageFile + "\n", { flag: "a" }, error => {
            if (error) {
              console.log(error)
            } else {
              console.log("File name written succesfully")
            }
          })
        })
      }
    }
  })
}

const removeFileExtension = array => {
  let fileNames = array.map(image => {
    return image.split(".").slice(0, -1).join(".")
  })

  return fileNames
}

let isImage = staticImagesFiles.every(file => {
  return sharpSupportedFormats.test(file)
})

let notImage = staticImagesFiles.filter(file => {
  return !sharpSupportedFormats.test(file)
})

if (!isImage) {
  console.error(
    "Unsupported file type detected: Use .jpg, .png. jpeg, .avif, .tiff or .webp files \n\nThe following files are unsupported:"
  )

  notImage.forEach(notImageFile => {
    console.log(notImageFile + "\n")
  })

  return
}

const main = () => {
  let noThumb = staticImagesFiles.filter(imageFile => {
    return !isThumbnail.test(imageFile)
  })

  let noThumbNoExt = removeFileExtension(noThumb)

  for (let i = 0; i < noThumb.length; i++) {
    let imageFile = noThumb[i]

    sharp(path.join(imagesPath, imageFile))
      .sharpen()
      .toBuffer()
      .then(imageFileBuffer => {
        sharp(imageFileBuffer)
          .toFile(path.resolve(imagesPath, `${noThumbNoExt[i]}-thumbnail.webp`))
          .then(() => {
            console.log(`Thumbnail created for file ${imageFile}`)
          })
          .catch(error => {
            console.log(error, `Error creating thumbnail for file ${imageFile}`)
          })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

main()
