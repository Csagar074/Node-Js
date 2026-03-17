const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { 
    type: String,
     required: true 
    },
  content: {
     type: String, 
     required: true 
    },
  category: {
     type: String,
      required: true 
    },
  authorId: {
     type: mongoose.Schema.Types.ObjectId, ref: "User"
     },
  isPublished: {
     type: Boolean,
      default: false 
    },
  isDeleted: {
     type: Boolean,
      default: false },
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema,"Blog");