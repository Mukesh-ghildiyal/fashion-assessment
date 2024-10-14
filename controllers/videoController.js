const Video = require('../models/Video');
const { getPaginatedResults } = require('../utils/pagination');
const { cache, getCachedData } = require('../utils/cache');

exports.getVideos = async (req, res) => {
    const { limit = 10, cursor = null } = req.query;

    try {
        // Try to get from cache first
        const cachedData = await getCachedData('videos');
        if (cachedData) {
            return res.json(cachedData);
        }

        const query = cursor ? { _id: { $gt: cursor } } : {};
        console.log("Querying with: ", query);  // Debugging query

        const videos = await Video.find(query)
            .sort({ created_at: 1 })
            .limit(parseInt(limit));

        console.log("Videos found: ", videos);  // Debugging result

        const nextCursor = videos.length ? videos[videos.length - 1]._id : null;

        const result = {
            videos,
            pagination: {
                limit,
                next_cursor: nextCursor,
            },
        };

        // Cache the result
        cache('videos', result);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
