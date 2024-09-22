const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    image: { type: String }, // optional field for image URL
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // array of users who liked the post
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // user who commented
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  }, { timestamps: true }); // adds createdAt and updatedAt fields automatically
  
// Virtual field to get the number of likes
postSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

// Virtual field to get the number of comments
postSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

// Ensure virtual fields are included when the document is serialized to JSON or objects
postSchema.set("toJSON", { virtuals: true });
postSchema.set("toObject", { virtuals: true });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
