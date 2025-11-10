import { useCallback, useContext, useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinFill } from 'react-icons/ri';
import { Link } from 'react-router';
import { API_BASE_URL } from '../config';
import { AuthContext } from '../contexts/AuthContext';

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const [crops, setCrops] = useState([]);
  const [editingCrop, setEditingCrop] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ useCallback to fix React Hook warning
  const fetchMyCrops = useCallback(() => {
    if (!user?.email) return;
    setLoading(true);
    fetch(`${API_BASE_URL}/crops`)
      .then((res) => res.json())
      .then((data) => {
        const myCrops = data.filter(
          (crop) => crop.owner?.ownerEmail === user.email
        );
        setCrops(myCrops);
        setLoading(false);
      });
  }, [user?.email]);

  useEffect(() => {
    fetchMyCrops();
  }, [fetchMyCrops]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this crop?')) return;
    const res = await fetch(`${API_BASE_URL}/crops/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      alert('Deleted successfully');
      setCrops(crops.filter((crop) => crop._id !== id));
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      name: form.name.value,
      type: form.type.value,
      pricePerUnit: parseFloat(form.pricePerUnit.value),
      unit: form.unit.value,
      quantity: parseFloat(form.quantity.value),
      description: form.description.value,
      location: form.location.value,
      image: form.image.value,
    };

    const res = await fetch(`${API_BASE_URL}/crops/${editingCrop._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });

    if (res.ok) {
      alert('Crop updated!');
      setEditingCrop(null);
      document.getElementById('edit_modal').close();
      fetchMyCrops();
    }
  };

  return (
    <div className='p-6 w-5/7 mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>My Crop Posts</h2>

      {loading ? (
        <p>Loading...</p>
      ) : crops.length === 0 ? (
        <p>No crops posted yet.</p>
      ) : (
        <ul className='list bg-base-100 rounded-box shadow-md divide-y divide-base-300'>
          <li className='p-4 pb-2 text-xs opacity-60 tracking-wide'>
            My Posted Crops
          </li>

          {crops.map((crop) => (
            <li
              key={crop._id}
              className='list-row flex items-center gap-4 p-3 hover:bg-base-200 transition'
            >
              {/* Thumbnail */}
              <img
                src={crop.image || 'https://via.placeholder.com/50'}
                alt={crop.name}
                className='w-12 h-12 rounded-box object-cover'
              />

              {/* Crop Info */}
              <div className='flex-1'>
                <Link
                  to={`/crops/${crop._id}`}
                  className='font-semibold text-base hover:underline'
                >
                  {crop.name}
                </Link>
                <div className='text-xs uppercase font-semibold opacity-60'>
                  {crop.quantity} {crop.unit} • ৳{crop.pricePerUnit} per{' '}
                  {crop.unit} • {crop.location}
                </div>
              </div>

              {/* Buttons */}
              <button
                className='btn btn-square btn-ghost'
                onClick={() => {
                  setEditingCrop(crop);
                  document.getElementById('edit_modal').showModal();
                }}
                title='Edit'
              >
                <FiEdit className='size-[1.2em]' />
              </button>

              <button
                className='btn btn-square btn-ghost text-error'
                onClick={() => handleDelete(crop._id)}
                title='Delete'
              >
                <RiDeleteBinFill className='size-[1.2em]' />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* DaisyUI Modal */}
      <dialog id='edit_modal' className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg mb-2'>Edit Crop</h3>
          {editingCrop && (
            <form onSubmit={handleEdit} className='space-y-3'>
              <input
                name='name'
                defaultValue={editingCrop.name}
                required
                className='input input-bordered w-full'
              />
              <input
                name='type'
                defaultValue={editingCrop.type}
                required
                className='input input-bordered w-full'
              />
              <input
                name='pricePerUnit'
                type='number'
                defaultValue={editingCrop.pricePerUnit}
                required
                className='input input-bordered w-full'
              />
              <select
                name='unit'
                defaultValue={editingCrop.unit}
                className='select select-bordered w-full'
              >
                <option value='kg'>kg</option>
                <option value='ton'>ton</option>
                <option value='bag'>bag</option>
              </select>
              <input
                name='quantity'
                type='number'
                defaultValue={editingCrop.quantity}
                required
                className='input input-bordered w-full'
              />
              <input
                name='location'
                defaultValue={editingCrop.location}
                required
                className='input input-bordered w-full'
              />
              <input
                name='image'
                defaultValue={editingCrop.image}
                required
                className='input input-bordered w-full'
              />
              <textarea
                name='description'
                defaultValue={editingCrop.description}
                required
                className='textarea textarea-bordered w-full'
              />

              <div className='modal-action'>
                <button type='submit' className='btn btn-success text-white'>
                  Save
                </button>
                <form method='dialog'>
                  <button className='btn' onClick={() => setEditingCrop(null)}>
                    Cancel
                  </button>
                </form>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyPosts;
