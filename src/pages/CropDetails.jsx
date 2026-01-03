import { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData, useParams } from 'react-router';
import swal from 'sweetalert';
import instance from '../api/axios';
import { AuthContext } from '../contexts/AuthContext';

const CropDetails = () => {
  const crop = useLoaderData();
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [interestSent, setInterestSent] = useState(false);
  const [formData, setFormData] = useState({ quantity: 1, message: '' });

  const isOwner = user?.email === crop?.data.owner?.ownerEmail;

  useEffect(() => {
    if (crop?.data.interests?.some((i) => i.userEmail === user?.email)) {
      setInterestSent(true);
    }
  }, [crop, user]);

  const handleInterestSubmit = async (e) => {
    e.preventDefault();

    if (formData.quantity < 1) {
      swal('Invalid Quantity', 'Quantity must be at least 1.', 'warning');
      return;
    }

    if (formData.quantity > crop.data.quantity) {
      swal(
        'Insufficient Quantity',
        `Only ${crop.data.quantity} ${crop.data.unit} available.`,
        'error'
      );
      return;
    }

    try {
      const res = await instance.post(`/crops/${id}/interests`, {
        quantity: formData.quantity,
        message: formData.message,
      });

      if (res.data?.success) {
        swal({
          title: 'Interest Submitted!',
          text: 'Your interest has been sent to the seller.',
          icon: 'success',
          buttons: false,
          timer: 1500,
        });

        setInterestSent(true);
      }
    } catch (error) {
      console.error(error);

      swal(
        'Error',
        error.response?.data?.message || 'Failed to send interest',
        'error'
      );
    }
  };

  const handleAction = async (interestId, status, reduceQuantityBy) => {
    const confirmAction = await swal({
      title:
        status === 'accepted'
          ? 'Accept this interest?'
          : 'Reject this interest?',
      icon: 'warning',
      buttons: ['Cancel', 'Yes'],
      dangerMode: status === 'rejected',
    });

    if (!confirmAction) return;

    const res = await instance.patch(`/interests/${id}/${interestId}`, {
      status,
      reduceQuantityBy,
    });

    if (res.data?.success) {
      swal({
        title:
          status === 'accepted' ? 'Interest Accepted' : 'Interest Rejected',
        icon: status === 'accepted' ? 'success' : 'error',
        buttons: false,
        timer: 1200,
      });
      setTimeout(() => window.location.reload(), 400);
    } else {
      swal({
        title: 'Error',
        text: 'Failed to update interest status.',
        icon: 'error',
      });
    }
  };

  if (!crop)
    return <p className='text-center text-gray-500 mt-10'>Crop not found.</p>;

  return (
    <div className='min-h-screen bg-base-200 py-10'>
      {/* Crop Details Card */}
      <div className='max-w-6xl mx-3 xl:mx-auto bg-base-100 shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row hover:shadow-2xl transition-all duration-300'>
        {/* Image Section */}
        <div className='md:w-1/2 relative'>
          <img
            src={crop.data.image}
            alt={crop.data.name}
            className='w-full h-80 md:h-full object-cover'
          />
          {crop.isNew && (
            <span className='absolute top-3 left-3 badge badge-secondary'>
              NEW
            </span>
          )}
        </div>

        {/* Crop Info */}
        <div className='flex-1 p-6 space-y-4'>
          <h2 className='text-3xl font-bold text-primary'>{crop.data.name}</h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-base'>
            <p>
              <span className='font-semibold text-accent'>Type:</span>{' '}
              {crop.data.type}
            </p>
            <p>
              <span className='font-semibold text-accent'>Price:</span> ৳
              {crop.data.pricePerUnit}/{crop.data.unit}
            </p>
            <p>
              <span className='font-semibold text-accent'>Quantity:</span>{' '}
              {crop.data.quantity} {crop.data.unit}
            </p>
            <p>
              <span className='font-semibold text-accent'>Location:</span>{' '}
              {crop.data.location}
            </p>
          </div>

          <div className='border-t border-base-300 pt-3'>
            <p className='font-semibold text-secondary'>
              Seller:{' '}
              <span className='font-normal text-base-content'>
                {crop.data.owner?.ownerName}
              </span>
            </p>
            <p className='text-sm text-base-content/70'>
              {crop.data.owner?.ownerEmail}
            </p>
          </div>

          {crop.data.description && (
            <p className='mt-3 text-base-content/80 leading-relaxed'>
              {crop.data.description}
            </p>
          )}
        </div>
      </div>

      {/* Interest Form for Buyers */}
      {!isOwner && user && !interestSent && (
        <div className='max-w-4xl mx-3 xl:mx-auto mt-10 bg-base-100 rounded-2xl shadow-md p-6'>
          <h3 className='text-2xl font-semibold text-center text-primary mb-4'>
            Send Your Interest
          </h3>
          <form
            onSubmit={handleInterestSubmit}
            className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto'
          >
            <input
              type='number'
              min={1}
              max={crop.data.quantity}
              value={formData.quantity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quantity: parseInt(e.target.value) || 1,
                })
              }
              className='input input-bordered input-accent w-full'
              placeholder={`Quantity (${crop.data.unit})`}
              required
            />
            <input
              type='text'
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className='input input-bordered input-accent w-full'
              placeholder='Message to Seller (optional)'
            />
            <p className='text-center font-bold text-secondary md:col-span-2'>
              Total Price: ৳{formData.quantity * crop.data.pricePerUnit}
            </p>
            <button
              type='submit'
              className='btn btn-md btn-primary text-white hover:text-neutral hover:btn-accent transition-all duration-400 ease-in-out w-full md:col-span-2 mt-2'
            >
              Submit Interest
            </button>
          </form>
        </div>
      )}

      {/* Already Sent Message */}
      {!isOwner && interestSent && (
        <p className='text-success text-center font-medium mt-8'>
          ✅ You’ve already sent an interest for this crop.{' '}
          <Link
            to='/my-interests'
            className='underline text-primary hover:text-secondary'
          >
            Click here to check your interests.
          </Link>{' '}
        </p>
      )}

      {/* Interests Table for Owner */}
      {isOwner && (
        <div className='max-w-6xl mx-3 xl:mx-auto bg-base-100 rounded-2xl shadow-md p-6 mt-10'>
          <h3 className='text-2xl font-semibold text-primary mb-4'>
            Received Interests
          </h3>

          {crop.data.interests?.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className='table w-full'>
                <thead className='bg-base-300 text-base-content font-semibold'>
                  <tr>
                    <th>Buyer</th>
                    <th>Quantity</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {crop.data.interests.map((i) => (
                    <tr key={i._id}>
                      <td>{i.userName}</td>
                      <td>{i.quantity}</td>
                      <td>{i.message}</td>
                      <td
                        className={`font-semibold ${
                          i.status === 'accepted'
                            ? 'text-success'
                            : i.status === 'rejected'
                            ? 'text-error'
                            : 'text-warning'
                        }`}
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
            <p className='text-gray-500 text-center'>No interests yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CropDetails;
