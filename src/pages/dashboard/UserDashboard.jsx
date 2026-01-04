import { useEffect, useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import instance from '../../api/axios';

const money = (n) => `৳${Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;


const UserDashboard = () => {
  const [active, setActive] = useState('buying'); 
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    instance
      .get('/dashboard/me')
      .then((res) => setData(res.data.data))
      .catch((e) => console.error('dashboard/me error', e))
      .finally(() => setLoading(false));
  }, []);

  const section = useMemo(() => {
    if (!data) return null;
    return active === 'buying' ? data.buying : data.selling;
  }, [data, active]);

  if (loading) return <div className="p-4">Loading dashboard...</div>;
  if (!data) return <div className="p-4">No dashboard data found.</div>;

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2">
        <button
          className={`btn btn-sm ${active === 'buying' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActive('buying')}
        >
          Buying
        </button>
        <button
          className={`btn btn-sm ${active === 'selling' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActive('selling')}
        >
          Selling
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="card bg-base-100 border">
          <div className="card-body p-4">
            <p className="text-xs opacity-70">
              {active === 'buying' ? 'Total Spent' : 'Total Earned'}
            </p>
            <p className="text-3xl font-bold">
  {active === 'buying'
    ? money(section.totalSpent)
    : money(section.totalEarned)}
</p>
          </div>
        </div>

        <div className="card bg-base-100 border">
          <div className="card-body p-4">
            <p className="text-xs opacity-70">
              {active === 'buying' ? 'Total Orders' : 'Total Sales'}
            </p>
            <p className="text-3xl font-bold">
              {active === 'buying' ? section.totalOrders : section.totalSales}
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="card bg-base-100 border">
        <div className="card-body p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">
              {active === 'buying' ? 'Spending (last 30 days)' : 'Earnings (last 30 days)'}
            </h3>
            <span className="text-xs opacity-70">Daily totals</span>
          </div>

          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <LineChart data={section.chartByDay || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent table */}
      <div className="card bg-base-100 border">
        <div className="card-body p-4">
          <h3 className="font-semibold mb-2">
            {active === 'buying' ? 'Recent Purchases' : 'Recent Sales'}
          </h3>

          {(!section.recent || section.recent.length === 0) ? (
            <p className="opacity-70 text-sm">No records yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>{active === 'buying' ? 'Paid (Gross)' : 'Earned (Net)'}</th>
                        <th>Platform Fee (1%)</th>
                        <th>Status</th>
                    </tr>
                    </thead>

                
                  <tbody>
                    {section.recent.map((p) => (
                        <tr key={p._id}>
                        <td>{new Date(p.createdAt).toLocaleString()}</td>

                        {active === 'buying' ? (
                            <>
                            <td>{money(p.grossAmountBDT)}</td>
                            <td>{money(p.feeBDT)}</td>
                            <td>{p.status}</td>
                            </>
                        ) : (
                            <>
                            <td>{money(p.netBDT)}</td>
                            <td>{money(p.feeBDT)}</td>
                            <td>{p.status}</td>
                            </>
                        )}
                        </tr>
                    ))}
                    </tbody>

                
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
