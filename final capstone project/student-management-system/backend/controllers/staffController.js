import User from "../models/User.js";

// @desc    Get all staff members
// @route   GET /api/staff
// @access  Private
export const getStaffMembers = async (req, res, next) => {
  try {
    const { search, role } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    if (role && (role === "admin" || role === "staff")) {
      query.role = role;
    }

    const staffMembers = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: staffMembers.length,
      staff: staffMembers
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single staff member
// @route   GET /api/staff/:id
// @access  Private
export const getStaffMember = async (req, res, next) => {
  try {
    const staff = await User.findById(req.params.id).select("-password");

    if (!staff) {
      return res.status(404).json({
        message: "Staff member not found"
      });
    }

    res.json({
      success: true,
      staff
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new staff member
// @route   POST /api/staff
// @access  Private
export const createStaffMember = async (req, res, next) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        message: "Permission denied. Only administrators can add staff members."
      });
    }

    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and temporary password are required"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "A staff account with this email already exists"
      });
    }

    const newStaff = await User.create({
      name,
      email,
      password,
      role: role === "admin" ? "admin" : "staff"
    });

    res.status(201).json({
      success: true,
      message: "Staff member registered successfully",
      staff: {
        _id: newStaff._id,
        name: newStaff.name,
        email: newStaff.email,
        role: newStaff.role,
        createdAt: newStaff.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update staff member
// @route   PUT /api/staff/:id
// @access  Private
export const updateStaffMember = async (req, res, next) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        message: "Permission denied. Only administrators can edit staff members."
      });
    }

    const { name, email, role, password } = req.body;
    const staff = await User.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({
        message: "Staff member not found"
      });
    }

    if (email && email.toLowerCase() !== staff.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "Email address is already used by another account"
        });
      }
      staff.email = email;
    }

    if (name) staff.name = name;
    if (role && (role === "admin" || role === "staff")) {
      staff.role = role;
    }

    if (password && password.trim().length >= 6) {
      staff.password = password;
    }

    await staff.save();

    res.json({
      success: true,
      message: "Staff member updated successfully",
      staff: {
        _id: staff._id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
        updatedAt: staff.updatedAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete staff member
// @route   DELETE /api/staff/:id
// @access  Private
export const deleteStaffMember = async (req, res, next) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        message: "Permission denied. Only administrators can delete staff members."
      });
    }

    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({
        message: "You cannot delete your own active account"
      });
    }

    const staff = await User.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({
        message: "Staff member not found"
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Staff member deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};
