export const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const isOverdue = (dueDate, status) => {
  if (status === 'completed') return false;
  return new Date(dueDate) < new Date();
};

export const statusLabel = {
  todo: 'Todo',
  in_progress: 'In Progress',
  completed: 'Completed',
};

export const priorityLabel = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const statusColors = {
  todo: 'bg-slate-100 text-slate-700',
  in_progress: 'bg-amber-100 text-amber-800',
  completed: 'bg-emerald-100 text-emerald-800',
};

export const priorityColors = {
  low: 'bg-sky-100 text-sky-800',
  medium: 'bg-orange-100 text-orange-800',
  high: 'bg-red-100 text-red-800',
};
