const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { 
    collection:"categories",
    timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;