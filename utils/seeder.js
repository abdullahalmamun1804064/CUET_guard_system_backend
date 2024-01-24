
const Post = require('../models/post');



const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const post = require('../data/post.json');


// Setting dotenv file
dotenv.config({ path: 'config/config.env' })
dotenv.config({ path: 'config/config.env' })

connectDatabase();

const seedProducts = async () => {
    try {
        // Modify the data before inserting

        await Post.deleteMany();
        console.log('Products are deleted');

        await Post.insertMany(post); // Insert the modified data
        console.log('All Products are added.')

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts();
