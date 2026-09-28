const User = require("../models/user");
const Attendance = require("../models/attendance");
const Log = require("../models/log");
const QRCode = require("qrcode");
const JWT = require('jsonwebtoken')

const userById = async (req, res) => {
  try {
    const { id } = req.params

    const user = await User.findById(id)

    return res.status(201).json({
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const allUsers = async (req, res) => {
  try {
    const users = await User.find()

    return res.status(201).json({
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const QR = async (req, res) => {
  try {
    const { id } = req.params;

    // التأكد إن المستخدم موجود
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // الرابط اللي الـ QR هيحتويه
    const url = `https://al-ra3i-scouts.bonto.run/attendance.html?id=${user._id}`;

    // إنشاء QR Code
    const qrCode = await QRCode.toDataURL(url);

    return res.status(200).json({
      message: "QR Code generated successfully",
      data: {
        userId: user._id,
        qrCode,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;


    if (!password || !email) {
      return res.status(400).json({
        message: "password and email are required",
      });
    }
    const user = await User.findOne({ email: email })

    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    if (password !== user.password) {
      return res.status(400).json({
        message: "email or password wrong",
      });
    }
    token = JWT.sign({
      'id': user._id,
      'role': user.role
    }, process.env.JWT_SECRET)

    return res.status(200).json({ 'data': token })


  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, phone, avatar, role } = req.body;

    // // Check required fields
    // if (!name || !email || !phone) {
    //   return res.status(400).json({
    //     message: "name, email and phone are required",
    //   });
    // }

    // Check if email already exists
    // const existingEmail = await User.findOne({ email });

    // if (existingEmail) {
    //   return res.status(409).json({
    //     message: "Email already exists",
    //   });
    // }

    // Check if phone already exists
    // const existingPhone = await User.findOne({ phone });

    // if (existingPhone) {
    //   return res.status(409).json({
    //     message: "Phone already exists",
    //   });
    // }

    // Create user
    const user = await User.create({
      ...req.body
    });

    return res.status(201).json({
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const attendance = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.admin
    if (!id) {
      return res.status(400).json({
        message: "userId is required",
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // تحديد بداية اليوم ونهايته
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existingAttendance = await Attendance.findOne({
      userId: id,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if (existingAttendance) {
      return res.status(409).json({
        message: "Attendance already registered today",
      });
    }

    // إنشاء سجل الحضور
    const attendance = await Attendance.create({
      userId: user._id,
      userName: user.name,
      phase: user.phase,
      date: new Date(),
    });

    const admin = await User.findById(adminId)

    // إنشاء سجل العملية
    const log = await Log.create({
      action: "REGISTER_ATTENDANCE",
      adminId: adminId,
      adminName: admin.name,
      userId: id,
      attendanceId: attendance._id,
      details: "تم تسجيل الحضور بنجاح",
    });

    return res.status(201).json({
      message: "Attendance registered successfully",
      data: {
        attendance,
        // log,
      },
    });
  } catch (error) {
    console.error("Register attendance error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const completeData = async (req, res) => {

  try {

    const { id } = req.params;
    const { name, phase } = req.body;
    // Check ID
    if (!id) {
      return res.status(400).json({
        message: "userId is required"
      });
    }
    // Find user

    const user = await User.findById(id);

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    // Update data

    if (name !== undefined) {
      user.name = name;
    }

    if (phase !== undefined) {
      user.phase = phase;
    }


    // Mark profile as completed

    user.profileCompleted = true;


    // Save changes

    await user.save();


    return res.status(200).json({

      message: "تم حفظ البيانات بنجاح",

      data: {
        user
      }

    });

  } catch (error) {

    console.error("Complete data error:", error);

    return res.status(500).json({
      message: "Internal server error"
    });

  }

};

const dashboard = async (req, res) => {
  try {
    const all = await User.countDocuments()
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const attendance = await Attendance.countDocuments({
      phase: 'جامعه',
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    })
    console.log(attendance);

    const group_1 = await User.countDocuments({ phase: 'جامعه' })
    const attendancePercentage =
      group_1 > 0
        ? ((attendance / group_1) * 100).toFixed(1)
        : 0;

    console.log(group_1);

    return res.status(200).json({
      data: {
        "totalUsers": all,
        "todayAttendance": attendance,
        'totalGroup': group_1,
        'Absence': (group_1 - attendance),
        'attendancePercentage':attendancePercentage,
      }

    })


  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error"
    });
  }
}
module.exports = {
  attendance,
  register,
  QR,
  allUsers,
  userById,
  login,
  completeData,
  dashboard,
};

