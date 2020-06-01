const dotenv = require('dotenv');

dotenv.config();

module.exports.MONGO_DB = process.env.MONGODB_URI || 'mongodb://localhost:27017/news-explorer';
module.exports.SERV_PORT = process.env.PORT || 3000;
module.exports.KEY = process.env.JWT_SECRET || 'some-secret-key';
