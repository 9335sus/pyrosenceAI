import Task from '../models/Task.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const now = new Date();
    let filter = {};

    if (req.user.role === 'member') {
      filter = { assignedTo: req.user._id };
    }

    const tasks = await Task.find(filter);
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const pending = tasks.filter((t) => t.status !== 'completed').length;
    const overdue = tasks.filter(
      (t) => t.status !== 'completed' && new Date(t.dueDate) < now
    ).length;

    const byStatus = {
      todo: tasks.filter((t) => t.status === 'todo').length,
      in_progress: tasks.filter((t) => t.status === 'in_progress').length,
      completed,
    };

    const byPriority = {
      low: tasks.filter((t) => t.priority === 'low').length,
      medium: tasks.filter((t) => t.priority === 'medium').length,
      high: tasks.filter((t) => t.priority === 'high').length,
    };

    res.json({
      success: true,
      data: {
        total,
        completed,
        pending,
        overdue,
        byStatus,
        byPriority,
      },
    });
  } catch (error) {
    next(error);
  }
};
