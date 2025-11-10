import { useContext, useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { API_BASE_URL } from '../config';
import { AuthContext } from '../contexts/AuthContext';

const CropDetails = () => {
  const crop = useLoaderData();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [interestSent, setInterestSent] = useState(false);
  const [formData, setFormData] = useState({ quantity: 1, message: '' });

  const isOwner = user?.email === crop?.owner?.ownerEmail;

  useEffect(() => {
    if (crop?.interests?.some((i) => i.userEmail === user?.email)) {
      setInterestSent(true);
    }
  }, [crop, user]);

  const handleInterestSubmit = async (e) => {
    e.preventDefault();
    if (formData.quantity < 1) return alert('Quantity must be at least 1');

    const interest = {
      cropId: id,
      userEmail: user.email,
      userName: user.displayName,
      quantity: formData.quantity,
      message: formData.message,
      status: 'pending',
    };

    const res = await fetch(`${API_BASE_URL}/crops/${id}/interests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(interest),
    });

    if (res.ok) {
      alert('Interest submitted!');
      setInterestSent(true);
    } else {
      const err = await res.json();
      alert(err.message || 'Something went wrong');
    }
  };

  const handleAction = async (interestId, status, reduceQuantityBy) => {
    const res = await fetch(`${API_BASE_URL}/interests/${id}/${interestId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, reduceQuantityBy }),
    });

    if (res.ok) window.location.reload();
  };

  if (!crop)
    return <p className='text-center text-gray-500 mt-10'>Crop not found.</p>;

  return (
    <div className='w-full mx-auto min-h-screen'>
      {/* Crop details section */}
      <div className='w-4/5 mx-auto bg-base-300 rounded-2xl shadow-lg p-6 my-8 flex flex-col md:flex-row gap-8'>
        {/* Crop Image */}
        <img
          src={crop.image}
          alt={crop.name}
          className='w-full md:w-1/2 rounded-2xl object-cover'
        />

        {/* Crop Info */}
        <div className='flex-1 space-y-4'>
          <h2 className='text-3xl font-bold text-green-700'>{crop.name}</h2>
          <p className='text-lg'>
            <span className='font-semibold'>Type:</span> {crop.type}
          </p>
          <p className='text-lg'>
            <span className='font-semibold'>Price:</span> ৳{crop.pricePerUnit}/
            {crop.unit}
          </p>
          <p className='text-lg'>
            <span className='font-semibold'>Available Quantity:</span>{' '}
            {crop.quantity} {crop.unit}
          </p>
          <p className='text-lg'>
            <span className='font-semibold'>Location:</span> {crop.location}
          </p>
          <p className='text-lg'>
            <span className='font-semibold'>Seller:</span>{' '}
            {crop.owner?.ownerName} ({crop.owner?.ownerEmail})
          </p>
          <p className='text-sm opacity-80'>{crop.description}</p>
        </div>
      </div>

      {/* Interest Form Section */}
      {!isOwner && user && !interestSent && (
        <div className='w-4/5 mx-auto mt-10 bg-base-300 rounded-2xl p-6 mb-8'>
          <h3 className='text-2xl font-semibold mb-4 text-center text-green-700'>
            Send Interest
          </h3>
          <form
            onSubmit={handleInterestSubmit}
            className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto'
          >
            <input
              type='number'
              min={1}
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: parseInt(e.target.value) })
              }
              className='input input-bordered w-full'
              placeholder={`Quantity (${crop.unit})`}
              required
            />
            <input
              type='text'
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className='input input-bordered w-full'
              placeholder='Message'
            />
            <p className='text-center font-semibold md:col-span-2'>
              💰 Total Price: ৳{formData.quantity * crop.pricePerUnit}
            </p>
            <button
              type='submit'
              className='btn btn-success mt-2 md:col-span-2 w-full'
            >
              Submit Interest
            </button>
          </form>
        </div>
      )}

      {/* Already sent interest */}
      {!isOwner && interestSent && (
        <p className='text-green-700 text-center font-medium mb-8'>
          ✅ You’ve already sent an interest for this crop.
        </p>
      )}

      {/* Owner-only Interests Table */}
      {isOwner && (
        <div className='w-4/5 mx-auto bg-base-300 rounded-2xl shadow-lg p-6 mb-8'>
          <h3 className='text-2xl font-semibold mb-4 text-green-700'>
            Received Interests
          </h3>
          {crop.interests?.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className='table w-full'>
                <thead className='bg-green-100'>
                  <tr>
                    <th>Buyer</th>
                    <th>Quantity</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {crop.interests.map((i) => (
                    <tr key={i._id}>
                      <td>{i.userName}</td>
                      <td>{i.quantity}</td>
                      <td>{i.message}</td>
                      <td
                        className={
                          i.status === 'accepted'
                            ? 'text-green-600 font-semibold'
                            : i.status === 'rejected'
                            ? 'text-red-600 font-semibold'
                            : 'text-yellow-600 font-semibold'
                        }
                      >
                        {i.status}
                      </td>
                      <td>
                        {i.status === 'pending' && (
                          <div className='space-x-2'>
                            <button
                              onClick={() =>
                                handleAction(i._id, 'accepted', i.quantity)
                              }
                              className='btn btn-xs btn-success'
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleAction(i._id, 'rejected', 0)}
                              className='btn btn-xs btn-error'
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className='text-gray-500'>No interests yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CropDetails;
