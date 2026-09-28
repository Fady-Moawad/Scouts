const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
      trim: true,
    },
    email: {
      type: String,
      // required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      // required: true,
    },
    phone: {
      type: String,
      // required: true,
      unique: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["admin", "assistant", "user"],
      default: "user",
    },
    profileCompleted :{
      type:Boolean,
      default:false
    },
    phase:{type:String,
      default:'مرحلة جامعه'
    }

    // isActive: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);