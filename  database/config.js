const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('DB Online');
    } catch (error) {
        console.warn(error);
        throw new Error(error);
    }
};

module.exports = {
    dbConnection,
};
