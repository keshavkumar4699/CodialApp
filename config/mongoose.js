// Declare mongoose as global
global.mongoose = require('mongoose');

// In Separate file
const url = "mongodb://0.0.0.0:27017/codial_development";

//BUILD A CONNECTION
mongoose.connect(url).then(() => { console.log('Connected To database :)')})
.catch( err => console.log('error', err));

module.exports.mongoose = mongoose;