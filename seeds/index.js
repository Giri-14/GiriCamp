
const cities = require('./indianCities');
const { places, descriptors } = require('./seedHelpers');
const mongoose = require('mongoose');

const Campground = require('../models/campground');
mongoose.connect('mongodb://localhost:27017/Yelp-Camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connection successful");
}).catch((e) => {
  console.log("No connection");
});

const db = mongoose.connection;

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  try {
    await Campground.deleteMany({});

    for (let i = 0; i < 200; i++) {
      const randomIndex = Math.floor(Math.random() * cities.length);
      const randomCity = cities[randomIndex];

      if (!randomCity || !randomCity.City || !randomCity.State) {
        console.error("Invalid city data:", randomCity);
        continue; // Skip this iteration and move to the next one
      }

      const price = Math.floor(Math.random() * 10) * 1000;
      const c = new Campground({
        author: '658dd72c87bd87f353e13c87',
        location: `${randomCity.City}, ${randomCity.State}`,
        title: `${sample(descriptors)},${sample(places)}`,
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. In explicabo excepturi aliquid perferendis fugit corrupti ipsa quod fugiat asperiores fuga earum, adipisci similique provident iste suscipit libero dolorum unde consequatur?",
        price: price,
        geometry: {
          type: 'Point',
          coordinates: [
            randomCity.Longitude,
            randomCity.Latitude
          ]
        },
        images: [
          {
            url: 'https://res.cloudinary.com/dwihu6106/image/upload/v1704299993/DCamp/s6g752dzfnxtgmhfuxeb.jpg',
            filename: 'DCamp/s6g752dzfnxtgmhfuxeb',
          },
          {
            url: 'https://res.cloudinary.com/dwihu6106/image/upload/v1704299988/DCamp/qug7e0hqrkhobfy5rmg6.jpg',
            filename: 'DCamp/qug7e0hqrkhobfy5rmg6',
          }
        ]
      });
      await c.save();
    }
    console.log("Seed data inserted successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
