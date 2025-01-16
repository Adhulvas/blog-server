const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    imagePath: {
      type: String, 
      required: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'USER', 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('POST', postSchema);
