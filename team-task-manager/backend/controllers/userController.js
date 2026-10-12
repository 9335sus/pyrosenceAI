import User from '../models/User.js';

export const getMembers = async (req, res, next) => {
  try {
    const members = await User.find({ role: 'member' })
      .select('name email role')
      .sort({ name: 1 });

    res.json({ success: true, data: members });
  } catch (error) {
    next(error);
  }
};
