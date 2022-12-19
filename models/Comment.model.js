const {Schema, model} = require('mongoose');

const commentSchema = new Schema({
   body: String,
   author: {type: Schema.Types.ObjectId, ref: 'User'}
 },
   {
      timestamps: true,
      timeseries: true
   }
 );

 const Comment = model('Comment', commentSchema);

 module.exports = Comment;