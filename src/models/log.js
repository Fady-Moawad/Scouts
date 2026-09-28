const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      enum: [
        "REGISTER_ATTENDANCE",
        "CREATE_USER",
        "UPDATE_USER",
        "DELETE_USER",
      ],
      required: true,
    },

    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    adminName: {
      type: String,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    attendanceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendance",
      default: null,
    },

    details: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Log", logSchema);