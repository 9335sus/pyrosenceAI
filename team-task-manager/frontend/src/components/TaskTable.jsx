import { formatDate, isOverdue, statusLabel, priorityLabel, statusColors, priorityColors } from '../utils/helpers';

const TaskTable = ({ tasks, showAssignee = true, onStatusChange, canUpdateStatus = false }) => {
  if (!tasks?.length) {
    return (
      <div className="card text-center py-12 text-slate-500">
        No tasks found.
      </div>
    );
  }

  return (
    <div className="card overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Title</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden md:table-cell">Project</th>
              {showAssignee && (
                <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden lg:table-cell">Assignee</th>
              )}
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Priority</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Due Date</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-800">{task.title}</p>
                  {task.description && (
                    <p className="text-xs text-slate-500 mt-0.5 truncate max-w-xs">{task.description}</p>
                  )}
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-slate-600">
                  {task.project?.name || '—'}
                </td>
                {showAssignee && (
                  <td className="px-4 py-3 hidden lg:table-cell text-slate-600">
                    {task.assignedTo?.name || '—'}
                  </td>
                )}
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                    {priorityLabel[task.priority]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={isOverdue(task.dueDate, task.status) ? 'text-red-600 font-medium' : 'text-slate-600'}>
                    {formatDate(task.dueDate)}
                    {isOverdue(task.dueDate, task.status) && (
                      <span className="block text-xs text-red-500">Overdue</span>
                    )}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {canUpdateStatus && onStatusChange ? (
                    <select
                      value={task.status}
                      onChange={(e) => onStatusChange(task._id, e.target.value)}
                      className="text-xs border border-slate-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="todo">Todo</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  ) : (
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                      {statusLabel[task.status]}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
