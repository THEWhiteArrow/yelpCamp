const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
   console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
   await Campground.deleteMany({});
   for (let i = 0; i < 400; i++) {
      const random1000 = Math.floor(Math.random() * 1000);
      const price = Math.floor(Math.random() * 20) + 10;
      const camp = new Campground({
         author: '5ffdac3ced40892568433a78',
         location: `${cities[random1000].city}, ${cities[random1000].state}`,
         title: `${sample(descriptors)} ${sample(places)}`,
         geometry: {
            type:'Point',
            coordinates: [
               cities[random1000].longitude,
               cities[random1000].latitude
            ]
         },
         date:'2021-1-20',
         images: [
            {
               url: 'https://res.cloudinary.com/dcj6ujzqj/image/upload/v1611164755/YelpCamp/app_files/daan-weijers-pSaEMIiUO84-unsplash_n3d2tz.jpg',
               filename: 'YelpCamp/daan-weijers-pSaEMIiUO84-unsplash_n3d2tz'
            },
            {
               url: 'https://res.cloudinary.com/dcj6ujzqj/image/upload/v1611163785/YelpCamp/app_files/kilarov-zaneit-Hxs6EAdI2Q8-unsplash_h4n7hs.jpg',
               filename: 'YelpCamp/kilarov-zaneit-Hxs6EAdI2Q8-unsplash_h4n7hs'
            }
         ],
         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
         price
      })
      await camp.save();
   }
}

seedDB().then(() => {
   mongoose.connection.close();
})