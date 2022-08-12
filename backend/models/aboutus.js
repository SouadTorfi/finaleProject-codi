const mongoose = require("mongoose");

const AboutUsSchema = mongoose.Schema(
  {
    title1: {
      type: String,
      required: true,
    },
    paragraphe1: {
      type: String,
      required: true,
    },
    paragraphe2: {
      type: String,
      required: true,
    },
    paragraphe3: {
      type: String,
      required: true,
    },
    paragraphe4: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
  },
  {
    collection: "aboutus",
    timestamps: true,
  }
);

const AboutUs = mongoose.model("AboutUs", AboutUsSchema);
module.exports = AboutUs;
