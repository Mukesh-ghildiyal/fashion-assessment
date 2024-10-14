const getPaginatedResults = async (model, query = {}, limit = 10, cursor) => {
    const searchQuery = cursor ? { _id: { $gt: cursor }, ...query } : query;
    const results = await model.find(searchQuery).limit(limit).exec();
    const nextCursor = results.length ? results[results.length - 1]._id : null;

    return { results, nextCursor };
};

module.exports = { getPaginatedResults };
