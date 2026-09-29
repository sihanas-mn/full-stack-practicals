import Notice from "../models/Notice.js";

// Sample realistic notices for initial seeding
const DEFAULT_NOTICES = [
  {
    title: "Mid-Term Examination Timetable & Hall Allocations Released",
    content: "The mid-term examination timetable for all ongoing semester batches is now finalized. Students must carry their valid Digital Student ID card to examination halls.",
    category: "Exam",
    priority: "High",
    postedBy: "Office of the Controller of Examinations"
  },
  {
    title: "Campus Library Digital Access & Project Repository Maintenance",
    content: "Scheduled routine maintenance of the online student portal and digital thesis repository this Saturday from 11:00 PM to 03:00 AM. Please save your work beforehand.",
    category: "Urgent",
    priority: "Urgent",
    postedBy: "Campus IT & Infrastructure"
  },
  {
    title: "Annual Tech Symposium & Innovation Hackathon 2026",
    content: "Registration is now open for the Inter-University Hackathon. Teams of up to 4 students can register with their faculty advisor by next Friday.",
    category: "Event",
    priority: "Normal",
    postedBy: "Student Affairs & Innovation Club"
  },
  {
    title: "Course Re-registration & Batch Swap Deadline Notice",
    content: "All active students seeking elective course transfers or batch slot adjustments must submit requests via the administration desk before the end of this week.",
    category: "Academic",
    priority: "Normal",
    postedBy: "Academic Registry"
  }
];

export const getNotices = async (req, res, next) => {
  try {
    let notices = await Notice.find().sort({ createdAt: -1 });

    // Seed defaults if empty
    if (notices.length === 0) {
      await Notice.insertMany(DEFAULT_NOTICES);
      notices = await Notice.find().sort({ createdAt: -1 });
    }

    res.json({
      success: true,
      notices
    });
  } catch (error) {
    next(error);
  }
};

export const createNotice = async (req, res, next) => {
  try {
    const { title, content, category, priority } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and announcement content are required"
      });
    }

    const postedBy = req.user?.name ? `${req.user.name} (${req.user.role === 'admin' ? 'Administrator' : 'Faculty Staff'})` : "Academic Registry";

    const notice = await Notice.create({
      title,
      content,
      category: category || "General",
      priority: priority || "Normal",
      postedBy
    });

    res.status(201).json({
      success: true,
      message: "Notice published successfully to campus noticeboard",
      notice
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNotice = async (req, res, next) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found"
      });
    }

    res.json({
      success: true,
      message: "Notice deleted from campus noticeboard"
    });
  } catch (error) {
    next(error);
  }
};
