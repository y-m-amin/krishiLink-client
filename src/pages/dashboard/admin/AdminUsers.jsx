import { useEffect, useMemo, useState } from 'react';
import swal from 'sweetalert';
import instance from '../../../api/axios';

const AdminUsers = () => {
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [q, setQ] = useState(''); // committed query
  const [page, setPage] = useState(1);
  const limit = 10;

  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0, limit });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await instance.get('/admin/users', {
        params: { search: q, page, limit },
      });

      setRows(res.data?.data || []);
      setMeta(res.data?.meta || { page: 1, totalPages: 1, total: 0, limit });
    } catch (e) {
      console.error('admin/users error:', e);
      swal('Error', e.response?.data?.error?.message || 'Failed to load users', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, page]);

  const canPrev = meta.page > 1;
  const canNext = meta.page < meta.totalPages;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setQ(search.trim());
  };

  const handleToggleStatus = async (user) => {
    const nextStatus = user.status === 'blocked' ? 'active' : 'blocked';

    const ok = await swal({
      title: `${nextStatus === 'blocked' ? 'Block' : 'Unblock'} this user?`,
      text: `${user.email}`,
      icon: 'warning',
      buttons: ['Cancel', 'Yes'],
      dangerMode: nextStatus === 'blocked',
    });

    if (!ok) return;

    try {
      await instance.patch(`/admin/users/${user._id}/status`, { status: nextStatus });

      swal({
        title: 'Updated',
        text: `User is now ${nextStatus}`,
        icon: 'success',
        timer: 1200,
        buttons: false,
      });

      // refresh list
      fetchUsers();
    } catch (e) {
      console.error('status update error:', e);
      swal('Error', e.response?.data?.error?.message || 'Update failed', 'error');
    }
  };

  const stats = useMemo(() => {
    const blocked = rows.filter((u) => u.status === 'blocked').length;
    const active = rows.filter((u) => (u.status || 'active') === 'active').length;
    return { active, blocked };
  }, [rows]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Admin Users</h2>
          <p className="text-sm opacity-70">
            Total: {meta.total} • Active (this page): {stats.active} • Blocked (this page): {stats.blocked}
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <input
            className="input input-bordered input-sm w-56"
            placeholder="Search name/email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-sm btn-primary" type="submit">
            Search
          </button>
          {q && (
            <button
              className="btn btn-sm btn-ghost"
              type="button"
              onClick={() => {
                setSearch('');
                setQ('');
                setPage(1);
              }}
            >
              Clear
            </button>
          )}
        </form>
      </div>

      <div className="card bg-base-100 border">
        <div className="card-body p-0">
          {loading ? (
            <div className="p-4">Loading users...</div>
          ) : rows.length === 0 ? (
            <div className="p-4 opacity-70">No users found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((u) => (
                    <tr key={u._id}>
                      <td className="font-semibold">{u.name || u.displayName || '—'}</td>
                      <td>{u.email}</td>
                      <td>
                        <span className="badge badge-ghost">{u.role || 'user'}</span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            (u.status || 'active') === 'active'
                              ? 'badge-success'
                              : 'badge-error'
                          }`}
                        >
                          {u.status || 'active'}
                        </span>
                      </td>
                      <td className="text-xs opacity-70">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                      </td>
                      <td className="text-right">
                        <button
                          className={`btn btn-xs ${
                            u.status === 'blocked' ? 'btn-success' : 'btn-error'
                          }`}
                          onClick={() => handleToggleStatus(u)}
                          disabled={u.role === 'admin'} // optional safety: don’t block admins
                          title={u.role === 'admin' ? "Can't change admin status" : ''}
                        >
                          {u.status === 'blocked' ? 'Unblock' : 'Block'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm opacity-70">
          Page {meta.page} of {meta.totalPages}
        </p>

        <div className="join">
          <button
            className="btn btn-sm join-item"
            disabled={!canPrev}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </button>
          <button
            className="btn btn-sm join-item"
            disabled={!canNext}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
