const express = require('express');
const router = express.Router();

const { getEvents, getSingleEvent } = require('../controllers/eventController');

router.get('/', getEvents);
router.get('/:id', getSingleEvent);

module.exports = router;
