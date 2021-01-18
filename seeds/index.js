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
         images: [
            {
               url: 'https://res.cloudinary.com/dcj6ujzqj/image/upload/v1610826118/YelpCamp/gvpzci51xvsfogtdrhdv.jpg',
               filename: 'YelpCamp/gvpzci51xvsfogtdrhdv'
            },
            {
               url: 'https://res.cloudinary.com/dcj6ujzqj/image/upload/v1610826118/YelpCamp/ki3a1thc2qwb3kcakp59.jpg',
               filename: 'YelpCamp/ki3a1thc2qwb3kcakp59'
            },
            {
               url: 'https://res.cloudinary.com/dcj6ujzqj/image/upload/v1610826118/YelpCamp/ljc8xrqy9prcejk4steg.jpg',
               filename: 'YelpCamp/ljc8xrqy9prcejk4steg'
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