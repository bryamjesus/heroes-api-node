const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const objetoSchema = new Schema({
  name: {type: String, require:true},
  img: {type: String, require:true}
});

module.exports = mongoose.model('heroe', objetoSchema)
