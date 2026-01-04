import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import instance from '../api/axios';
import Loading from '../components/Loading';
import { AuthContext } from '../contexts/AuthContext';

const MyInterests = () => {
  const { user } = useContext(AuthContext);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('');
//console.log('MyInterests mounted ✅', { userEmail: user?.email });

  useEffect(() => {
    if (!user) return;

    instance
      .get('/my-interests')
      .then((res) => {
        setInterests(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching interests:', err);
        setLoading(false);
      });
  }, [user]);

  // sorting logic
  const handleSort = (option) => {
    setSortOption(option);

    const sorted = [...interests].sort((a, b) => {
      switch (option) {
        case 'cropNameAsc':
          return (a.cropName || '').localeCompare(b.cropName || '');
        case 'cropNameDesc':
          return (b.cropName || '').localeCompare(a.cropName || '');
        case 'statusAsc':
          return (a.status || '').localeCompare(b.status || '');
        case 'statusDesc':
          return (b.status || '').localeCompare(a.status || '');
        case 'qtyAsc':
          return (a.quantity || 0) - (b.quantity || 0);
        case 'qtyDesc':
          return (b.quantity || 0) - (a.quantity || 0);
        default:
          return 0;
      }
    });

    setInterests(sorted);
  };


  
  return (
    <div className='p-6 w-5/7 mx-auto'>
     
      <div className='flex flex-col sm:flex-row justify-between items-center mb-4 gap-3'>
        <h2 className='text-4xl font-bold text-primary'>My Interests</h2>

        {/* Sort Dropdown */}
        <div className='dropdown dropdown-end'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-outline btn-primary btn-md m-1 hover:text-white'
          >
            Sort
          </div>
          <ul
            tabIndex={0}
            className='dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow'
          >
            <li>
              <button onClick={() => handleSort('cropNameAsc')}>
                Crop Name ↑
              </button>
            </li>
            <li>
              <button onClick={() => handleSort('cropNameDesc')}>
                Crop Name ↓
              </button>
            </li>
            <li>
              <button onClick={() => handleSort('statusAsc')}>Status ↑</button>
            </li>
            <li>
              <button onClick={() => handleSort('statusDesc')}>Status ↓</button>
            </li>
            <li>
              <button onClick={() => handleSort('qtyAsc')}>Quantity ↑</button>
            </li>
            <li>
              <button onClick={() => handleSort('qtyDesc')}>Quantity ↓</button>
            </li>
          </ul>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : !Array.isArray(interests) || interests.length === 0 ? (
        <p>No interests sent yet.</p>
      ) : (
        <ul className='list bg-base-100 rounded-box shadow-md divide-y divide-base-300'>
          <li className='p-4 pb-2 text-xs opacity-60 tracking-wide'>
            My Sent Interests
          </li>
        

         {interests.map((item, i) => {
              const status = String(item?.status || '').toLowerCase();
              const pay = String(item?.paymentStatus || '').toLowerCase();

              const isAccepted = status === 'accepted';
              const isPaid = pay === 'paid';
              const isUnpaid = pay === 'unpaid';

              // 
              console.log('interest row:', {
                cropName: item.cropName,
                status: item.status,
                paymentStatus: item.paymentStatus,
              });

              return (
                <li
                  key={i}
                  className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 hover:bg-base-200 transition'
                >
                  {/* crop info */}
                  <div className='flex-1'>
                    <Link
                      to={`/crops/${item.cropId}`}
                      className='font-semibold text-base hover:font-bold hover:underline'
                    >
                      {item.cropName || 'Unknown Crop'}
                    </Link>
                    <div className='text-xs uppercase font-semibold opacity-60'>
                      Qty: {item.quantity} • Owner: {item.sellerName}
                    </div>
                    <p className='text-sm mt-1'>{item.message || ''}</p>
                  </div>

                  {/* status + payment */}
                  <div className='flex flex-col sm:flex-row gap-2 items-end sm:items-center'>
                    <span
                      className={`badge text-sm font-semibold px-3 py-2 ${
                        status === 'pending'
                          ? 'badge-warning text-yellow-900'
                          : status === 'accepted'
                          ? 'badge-success text-green-900'
                          : 'badge-error text-red-900'
                      }`}
                    >
                      {item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
                    </span>

                    {isAccepted && isPaid && (
                      <span className='badge badge-info text-sm font-semibold px-3 py-2'>
                        Paid 
                      </span>
                    )}

                    {isAccepted && isUnpaid && (
                      <button
                        onClick={async () => {
                          try {
                            const res = await instance.post('/payments/create', {
                              amount: item.totalAmount * 100,
                              cropId: item.cropId,
                              interestId: item.interestId,
                              sellerId: item.sellerId,
                            });
                            window.location.href = res.data.url;
                          } catch (e) {
                            console.error(e);
                            alert(e.response?.data?.error?.message || 'Payment start failed');
                          }
                        }}
                        className='btn btn-sm btn-primary ml-2'
                      >
                        Pay Now
                      </button>
                    )}
                  </div>
                </li>
              );
          })}

        </ul>
      )}
    </div>
  );
};

export default MyInterests;
