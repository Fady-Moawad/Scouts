const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
   
    userId: {
      type:mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type:String,
      required: true,
    },
    phase: {
      type:String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
attendanceSchema.index(
  {
    userId: 1,
    date: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("Attendance", attendanceSchema);