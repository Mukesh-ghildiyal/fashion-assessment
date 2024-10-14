const express = require('express');
const { getVideos } = require('../controllers/videoController');
const router = express.Router();

router.get('/videos', getVideos);

module.exports = router;
