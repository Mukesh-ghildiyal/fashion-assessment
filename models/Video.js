// models/Video.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    original_price: Number,
    discount_percentage: Number,
    image_url: String,
    timestamp: Number,
    in_stock: Boolean,
    currency: String,
    store: {
        id: Number,
        name: String,
        logo_url: String,
    },
    variants: [{
        id: Number,
        name: String,
        options: [String],
    }],
});

const videoSchema = new mongoose.Schema({
    id: Number,
    video_url: String,
    thumbnail_url: String,
    description: String,
    view_count: Number,
    duration: Number,
    created_at: Date,
    user: {
        id: Number,
        username: String,
        display_name: String,
        profile_picture_url: String,
        bio: String,
        followers_count: Number,
        verified: Boolean,
    },
    products: [productSchema],
    likes_count: Number,
    comments_count: Number,
    shares_count: Number,
    is_liked: Boolean,
    is_bookmarked: Boolean,
    music: {
        id: Number,
        name: String,
        artist: String,
        cover_url: String,
    },
    hashtags: [String],
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
