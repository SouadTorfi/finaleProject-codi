const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const MedicineSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    expiredDate: {
      type: String,
      required: true,
    },

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    image: {
      type: Array,
      required: true,
    },
  },
  {
    collection: "medicines",
    timestamps: true,
  }
);

const Medicine = mongoose.model("Medicine", MedicineSchema);
module.exports = Medicine;
