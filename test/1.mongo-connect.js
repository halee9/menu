import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

let options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};
mongoose.connect("mongodb://localhost:27017/test", options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

export default db;
