
const mongoose = require('mongoose');

const connectionDB = async () => {
    const uri = process.env.MONGOOSE_URL;

    if (!uri) {
        throw new Error('MONGOOSE_URL is missing');
    }

    await mongoose.connect(uri);

    console.log('MongoDB connected successfully');
};

module.exports = connectionDB;
