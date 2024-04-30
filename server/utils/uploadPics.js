const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Log the configuration
console.log(cloudinary.config());

const upload = (directoryPath) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.log('error: ', err);
      return;
    }

    const imageFiles = files.filter(file => path.extname(file).toLowerCase() === '.png');

    imageFiles.forEach(imageFile => {
      const imagePath = path.join(directoryPath, imageFile);
      cloudinary.uploader
      .upload(imagePath, {
        use_filename: true})
      .then(result=>console.log(result));
    })
  })
};

// upload('/path/to/image/folder');