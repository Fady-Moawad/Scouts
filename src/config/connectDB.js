const mongoose = require('mongoose')
const connectionDB = () => {
    mongoose.connect(process.env.MONGOOSE_URL)
        .then(() => {
            console.log('mongoBD connection')  
        }
        ).catch((err) => {
            console.log(err);
        })

}
module.exports = connectionDB
