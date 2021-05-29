const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPI_KEY,
    api_secret:process.env.CLOUDAPI_SECRET,
})

module.exports = cloudinary;