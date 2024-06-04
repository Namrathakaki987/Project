const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10; // Number of posts per page
    const skip = (page - 1) * limit;

    try {
        const posts = await Post.find().skip(skip).limit(limit);
        res.json(posts);
    } catch (err) {
        res.status(400).send(err);
    }
};

