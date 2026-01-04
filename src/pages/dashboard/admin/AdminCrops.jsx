import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import instance from '../../../api/axios';
import { Link } from 'react-router';

const AdminCrops = () => {
  const [loading, setLoading] = useState(true);

  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0, limit: 10 });

  const [search, setSearch] = useState('');
  const [q, setQ] = useState('');

  const [status, setStatus] = useState(''); // '', active, blocked
  const [verified, setVerified] = useState(''); // '', true, false

  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchCrops = async () => {
    setLoading(true);
    try {
      const res = await instance.get('/admin/crops', {
        params: { search: q, status, verified, page, limit },
      });
      setRows(res.data?.data || []);
      setMeta(res.data?.meta || { page: 1, totalPages: 1, total: 0, limit });
    } catch (e) {
      console.error(e);
      swal('Error', e.response?.data?.error?.message || 'Failed to load crops', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrops();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, status, verified, page]);

  const submitSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setQ(search.trim());
  };

  const toggleStatus = async (crop) => {
    const next = crop.status === 'blocked' ? 'active' : 'blocked';
    const ok = await swal({
      title: `${next === 'blocked' ? 'Block' : 'Unblock'} this crop?`,
      text: crop.name,
      icon: 'warning',
      buttons: ['Cancel', 'Yes'],
      dangerMode: next === 'blocked',
    });
    if (!ok) return;

    try {
      await instance.patch(`/admin/crops/${crop._id}/status`, { status: next });
      swal({ title: 'Updated', text: `Crop is now ${next}`, icon: 'success', timer: 1200, buttons: false });
      fetchCrops();
    } catch (e) {
      console.error(e);
      swal('Error', e.response?.data?.error?.message || 'Update failed', 'error');
    }
  };

  const toggleVerify = async (crop) => {
    const next = !crop.verified;
    const ok = await swal({
      title: `${next ? 'Verify' : 'Unverify'} this crop?`,
      text: crop.name,
      icon: 'warning',
      buttons: ['Cancel', 'Yes'],
      dangerMode: false,
    });
    if (!ok) return;

    try {
      await instance.patch(`/admin/crops/${crop._id}/verify`, { verified: next });
      swal({ title: 'Updated', text: `verified = ${String(next)}`, icon: 'success', timer: 1200, buttons: false });
      fetchCrops();
    } catch (e) {
      console.error(e);
      swal('Error', e.response?.data?.error?.message || 'Verify failed', 'error');
    }
  };

  const canPrev = meta.page > 1;
  const canNext = meta.page < meta.totalPages;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Admin Crops</h2>
          <p className="text-sm opacity-70">Total: {meta.total}</p>
        </div>

        <form onSubmit={submitSearch} className="flex flex-col sm:flex-row gap-2">
          <input
            className="input input-bordered input-sm w-60"
            placeholder="Search name/type/location/seller"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select className="select select-bordered select-sm" value={status} onChange={(e) => { setPage(1); setStatus(e.target.value); }}>
            <option value="">All status</option>
            <option value="active">active</option>
            <option value="blocked">blocked</option>
          </select>

          <select className="select select-bordered select-sm" value={verified} onChange={(e) => { setPage(1); setVerified(e.target.value); }}>
            <option value="">All verified</option>
            <option value="true">verified</option>
            <option value="false">unverified</option>
          </select>

          <button className="btn btn-sm btn-primary" type="submit">Search</button>

          {(q || status || verified) && (
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              onClick={() => {
                setSearch('');
                setQ('');
                setStatus('');
                setVerified('');
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
            <div className="p-4">Loading crops...</div>
          ) : rows.length === 0 ? (
            <div className="p-4 opacity-70">No crops found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Crop</th>
                    <th>Seller</th>
                    <th>Status</th>
                    <th>Verified</th>
                    <th>Created</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((c) => (
                    <tr key={c._id}>
                      <td>
                        <Link className="font-semibold hover:underline" to={`/crops/${c._id}`}>
                          {c.name}
                        </Link>
                        <div className="text-xs opacity-70">{c.type} • {c.location}</div>
                      </td>
                      <td>
                        <div className="font-medium">{c.owner?.ownerName || '—'}</div>
                        <div className="text-xs opacity-70">{c.owner?.ownerEmail || '—'}</div>
                      </td>
                      <td>
                        <span className={`badge ${c.status === 'blocked' ? 'badge-error' : 'badge-success'}`}>
                          {c.status || 'active'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${c.verified ? 'badge-info' : 'badge-ghost'}`}>
                          {c.verified ? 'verified' : 'unverified'}
                        </span>
                      </td>
                      <td className="text-xs opacity-70">{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '—'}</td>
                      <td className="text-right space-x-2">
                        <button className="btn btn-xs btn-outline" onClick={() => toggleVerify(c)}>
                          {c.verified ? 'Unverify' : 'Verify'}
                        </button>
                        <button className={`btn btn-xs ${c.status === 'blocked' ? 'btn-success' : 'btn-error'}`} onClick={() => toggleStatus(c)}>
                          {c.status === 'blocked' ? 'Unblock' : 'Block'}
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

      <div className="flex items-center justify-between">
        <p className="text-sm opacity-70">Page {meta.page} of {meta.totalPages}</p>
        <div className="join">
          <button className="btn btn-sm join-item" disabled={!canPrev} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
          <button className="btn btn-sm join-item" disabled={!canNext} onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default AdminCrops;
