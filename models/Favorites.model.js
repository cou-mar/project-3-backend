const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoritesSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  myEvent: {type: Schema.Types.ObjectId, ref: 'Event'}
});

const Favorite = mongoose.model('Favorite', favoritesSchema);

module.exports = Favorite;