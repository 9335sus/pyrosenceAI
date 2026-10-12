import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskAPI, projectAPI, userAPI } from '../services/api';

const CreateTask = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    project: '',
    assignedTo: '',
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [projRes, memRes] = await Promise.all([
          projectAPI.getAll(),
          userAPI.getMembers(),
        ]);
        setProjects(projRes.data.data);
        setMembers(memRes.data.data);
        if (projRes.data.data.length) {
          setForm((f) => ({ ...f, project: projRes.data.data[0]._id }));
        }
        if (memRes.data.data.length) {
          setForm((f) => ({ ...f, assignedTo: memRes.data.data[0]._id }));
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load form data');
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await taskAPI.create(form);
      navigate('/tasks');
    } catch (err) {
      const errors = err.response?.data?.errors;
      setError(
        errors ? errors.map((e) => e.message).join(', ') : err.response?.data?.message || 'Failed to create task'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Create Task</h2>
        <p className="text-slate-500">Assign a new task to a team member</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
          <input type="text" name="title" className="input-field" value={form.title} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <textarea
            name="description"
            className="input-field"
            rows={3}
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Project</label>
            <select name="project" className="input-field" value={form.project} onChange={handleChange} required>
              <option value="">Select project</option>
              {projects.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Assign to</label>
            <select name="assignedTo" className="input-field" value={form.assignedTo} onChange={handleChange} required>
              <option value="">Select member</option>
              {members.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.name} ({m.email})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select name="status" className="input-field" value={form.status} onChange={handleChange}>
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
            <select name="priority" className="input-field" value={form.priority} onChange={handleChange}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              className="input-field"
              value={form.dueDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Task'}
          </button>
          <button type="button" className="btn-secondary" onClick={() => navigate('/tasks')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
