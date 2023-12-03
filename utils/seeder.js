const Department = require('../models/department');
const Batch = require('../models/batch');
const JobField = require('../models/jobField');
const JobOrganization = require('../models/jobOrg');
const Event = require('../models/event');
const JobPost = require('../models/jobPost');
const Committee = require('../models/committee');



const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const dept = require('../data/dept');
const batch = require('../data/batch');
const jb = require('../data/jobField');
const jobOrg = require('../data/jobOrg');
const event = require('../data/event');
const jobPost = require('../data/jobPost.json');
const committee= require('../data/committee.json');


// Setting dotenv file
dotenv.config({ path: 'config/config.env' })
dotenv.config({ path: 'config/config.env' })

connectDatabase();

const seedProducts = async () => {
    try {
        // Modify the data before inserting

        await JobPost.deleteMany();
        console.log('Products are deleted');

        await JobPost.insertMany(jobPost); // Insert the modified data
        console.log('All Products are added.')

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts();
