const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// CLOUDINARY_CLOUD_NAME=dwihu6106
// CLOUDINARY_KEY=847532741992611
// CLOUDINARY_SECRET=tnNdvNpLRuOsrRqooN1XgubGszg


// Ensure that required environment variables are set
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_KEY || !process.env.CLOUDINARY_SECRET) {
    throw new Error('Cloudinary environment variables are missing.');
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
    folder: 'DCamp',
    allowedFormats: ['jpeg', 'png', 'jpg']
    }
});

module.exports = {
    cloudinary,
    storage
};
