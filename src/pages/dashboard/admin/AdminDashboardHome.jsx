import { useEffect, useMemo, useState } from 'react';
import instance from '../../../api/axios';

const money = (n) => `৳${Number(n || 0).toLocaleString()}`;

const StatCard = ({ title, value, hint }) => {
  return (
    <div className='card bg-base-100 border shadow-sm'>
      <div className='card-body p-4'>
        <p className='text-xs opacity-70'>{title}</p>
        <p className='text-3xl font-bold mt-1'>{value}</p>
        {hint ? <p className='text-xs opacity-60 mt-2'>{hint}</p> : null}
      </div>
    </div>
  );
};

const AdminDashboardHome = () => {
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    setErrMsg('');
    try {
      const res = await instance.get('/admin/dashboard');
      setStats(res.data?.data || null);
    } catch (e) {
      console.error('admin/dashboard error:', e);
      setErrMsg(
        e?.response?.data?.error?.message || 'Failed to load admin stats'
      );
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cards = useMemo(() => {
    const s = stats || {};
    return [
      {
        title: 'Total Users',
        value: Number(s.totalUsers || 0).toLocaleString(),
        hint: 'All registered users',
      },
      {
        title: 'Total Crops',
        value: Number(s.totalCrops || 0).toLocaleString(),
        hint: 'All crop listings',
      },
      {
        title: 'Total Payments',
        value: Number(s.totalPayments || 0).toLocaleString(),
        hint: 'Successful payment records stored',
      },
      {
        title: 'Platform Earnings (1%)',
        value: money(s.platformEarnings || 0),
        hint: 'Sum of platformFee from payments',
      },
    ];
  }, [stats]);

  return (
    <div className='p-4 space-y-4'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
        <div>
          <h2 className='text-2xl font-bold'>Admin Dashboard</h2>
          <p className='text-sm opacity-70'>
            Overview of users, crops, payments, and platform earnings.
          </p>
        </div>

        <button
          className={`btn btn-sm ${loading ? 'btn-disabled' : 'btn-outline'}`}
          onClick={fetchStats}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Error */}
      {errMsg ? (
        <div className='alert alert-error'>
          <span>{errMsg}</span>
        </div>
      ) : null}

      {/* Loading skeleton */}
      {loading ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
          {[1, 2, 3, 4].map((k) => (
            <div key={k} className='card bg-base-100 border'>
              <div className='card-body p-4'>
                <div className='skeleton h-3 w-28 mb-3' />
                <div className='skeleton h-8 w-40' />
                <div className='skeleton h-3 w-44 mt-4' />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Cards */
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
          {cards.map((c) => (
            <StatCard
              key={c.title}
              title={c.title}
              value={c.value}
              hint={c.hint}
            />
          ))}
        </div>
      )}

      {/* Quick note box */}
      {!loading && stats ? (
        <div className='card bg-base-100 border'>
          <div className='card-body p-4'>
            <p className='font-semibold mb-1'>Notes</p>
            <ul className='list-disc pl-5 text-sm opacity-80 space-y-1'>
              <li>Blocked users: {stats.blockedUsers}</li>
              <li>Blocked crops: {stats.blockedCrops}</li>
              <li>Unverified crops: {stats.unverifiedCrops}</li>
              <li>Open reports: {stats.openReports}</li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminDashboardHome;
