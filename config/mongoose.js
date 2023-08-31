// Declare mongoose as global
const mongoose = require('mongoose');

// In Separate file
async function main() {
  const db = await mongoose.connect(`mongodb://127.0.0.1:27017/codial_development`);
  module.exports = db;
}

main()
.then(() => console.log('Database Connected')) //if connected
.catch(err => console.log(err));