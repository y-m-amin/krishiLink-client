import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import instance from '../../../api/axios';
import { Link } from 'react-router';

const AdminReports = () => {
  const [loading, setLoading] = useState(true);

  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0, limit: 10 });

  const [status, setStatus] = useState('open');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await instance.get('/admin/reports', {
        params: { status, type, page, limit },
      });
      setRows(res.data?.data || []);
      setMeta(res.data?.meta || { page: 1, totalPages: 1, total: 0, limit });
    } catch (e) {
      console.error(e);
      swal('Error', e.response?.data?.error?.message || 'Failed to load reports', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, type, page]);

  const setReportStatus = async (report, next) => {
    const ok = await swal({
      title: `Mark as ${next}?`,
      text: `Report by ${report.reporterEmail}`,
      icon: 'warning',
      buttons: ['Cancel', 'Yes'],
    });
    if (!ok) return;

    try {
      await instance.patch(`/admin/reports/${report._id}/status`, { status: next });
      swal({ title: 'Updated', icon: 'success', timer: 1000, buttons: false });
      fetchReports();
    } catch (e) {
      console.error(e);
      swal('Error', e.response?.data?.error?.message || 'Update failed', 'error');
    }
  };

  const canPrev = meta.page > 1;
  const canNext = meta.page < meta.totalPages;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Reports</h2>
          <p className="text-sm opacity-70">Total: {meta.total}</p>
        </div>

        <div className="flex gap-2">
          <select className="select select-bordered select-sm" value={status} onChange={(e) => { setPage(1); setStatus(e.target.value); }}>
            <option value="open">open</option>
            <option value="resolved">resolved</option>
          </select>

          <select className="select select-bordered select-sm" value={type} onChange={(e) => { setPage(1); setType(e.target.value); }}>
            <option value="">all types</option>
            <option value="crop">crop</option>
            <option value="seller">seller</option>
          </select>
        </div>
      </div>

      <div className="card bg-base-100 border">
        <div className="card-body p-0">
          {loading ? (
            <div className="p-4">Loading reports...</div>
          ) : rows.length === 0 ? (
            <div className="p-4 opacity-70">No reports.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Target</th>
                    <th>Reason</th>
                    <th>Reporter</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r._id}>
                      <td>
                        <span className="badge badge-ghost">{r.targetType}</span>
                      </td>

                      <td>
                        {r.targetType === 'crop' ? (
                          <Link className="hover:underline font-semibold" to={`/crops/${r.targetId}`}>
                            Crop link
                          </Link>
                        ) : (
                          <span className="text-xs opacity-70 break-all">{r.targetId}</span>
                        )}
                      </td>

                      <td className="max-w-xs">
                        <div className="text-sm">{r.reason}</div>
                      </td>

                      <td className="text-xs opacity-70">{r.reporterEmail}</td>

                      <td>
                        <span className={`badge ${r.status === 'open' ? 'badge-warning' : 'badge-success'}`}>
                          {r.status}
                        </span>
                      </td>

                      <td className="text-xs opacity-70">
                        {r.createdAt ? new Date(r.createdAt).toLocaleString() : '—'}
                      </td>

                      <td className="text-right">
                        {r.status === 'open' ? (
                          <button className="btn btn-xs btn-success" onClick={() => setReportStatus(r, 'resolved')}>
                            Resolve
                          </button>
                        ) : (
                          <button className="btn btn-xs btn-outline" onClick={() => setReportStatus(r, 'open')}>
                            Reopen
                          </button>
                        )}
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

export default AdminReports;
