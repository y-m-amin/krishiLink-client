import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { API_BASE_URL } from '../config';
import { AuthContext } from '../contexts/AuthContext';

const MyInterests = () => {
  const { user } = useContext(AuthContext);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${API_BASE_URL}/my-interests?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setInterests(data);
        console.log('My interests data:', data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching interests:', err);
        setLoading(false);
      });
  }, [user]);

  return (
    <div className='p-6 w-5/7 mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>My Interests</h2>

      {loading ? (
        <p>Loading...</p>
      ) : interests.length === 0 ? (
        <p>No interests sent yet.</p>
      ) : (
        <ul className='list bg-base-100 rounded-box shadow-md divide-y divide-base-300'>
          <li className='p-4 pb-2 text-xs opacity-60 tracking-wide'>
            My Sent Interests
          </li>

          {interests.map((item, i) => (
            <li
              key={i}
              className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 hover:bg-base-200 transition'
            >
              {/* Left side: crop info */}
              <div className='flex-1'>
                <Link
                  to={`/crops/${item.cropId}`}
                  className='font-semibold text-base hover:font-bold hover:underline'
                >
                  {item.cropName || 'Unknown Crop'}
                </Link>
                <div className='text-xs uppercase font-semibold opacity-60'>
                  Qty: {item.quantity} • Owner: {item.owner}
                </div>
                <p className='text-sm mt-1'>{item.message}</p>
              </div>

              {/* Right side: status */}
              <div className='flex justify-between sm:justify-end items-center w-full sm:w-auto'>
                <span
                  className={`badge text-sm font-semibold px-3 py-2 ${
                    item.status === 'pending'
                      ? 'badge-warning text-yellow-900'
                      : item.status === 'accepted'
                      ? 'badge-success text-green-900'
                      : 'badge-error text-red-900'
                  }`}
                >
                  {item.status
                    ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
                    : 'Unknown'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyInterests;
