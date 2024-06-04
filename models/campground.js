const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;


// https://res.cloudinary.com/douqbebwk/image/upload/w_300/v1600113904/YelpCamp/gxgle1ovzd2f3dgcpass.png

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };


const CampgroundSchema = new mongoose.Schema({
    title:String,
    images:[ImageSchema],  
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }, 
    // geometry:{
    //     "type":"Point",
    //     "coordinates":[-90.73333,14,56667]
    // },
    price:Number,
    description:String,
    location:String,
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
},opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
    <p>${this.description.substring(0,20)}...</p>
    `;
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('campgrounds',CampgroundSchema);