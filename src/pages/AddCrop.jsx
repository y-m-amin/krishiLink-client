import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import swal from 'sweetalert';
import { API_BASE_URL } from '../config';
import { AuthContext } from '../contexts/AuthContext';

const AddCrop = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    type: '',
    pricePerUnit: '',
    unit: 'kg',
    quantity: '',
    description: '',
    location: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cropData = {
      ...form,
      pricePerUnit: parseFloat(form.pricePerUnit),
      quantity: parseFloat(form.quantity),
      owner: {
        ownerEmail: user.email,
        ownerName: user.displayName,
      },
    };

    try {
      const res = await fetch(`${API_BASE_URL}/crops`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cropData),
      });

      if (res.ok) {
        // ✅ SweetAlert (v1) success message
        swal({
          title: 'Crop Added!',
          text: `${cropData.quantity} ${cropData.unit} ${cropData.name} added successfully.`,
          icon: 'success',
          buttons: false, // hides default "OK" button
          timer: 1500, // auto-close after 1.5s
        });

        // ⏱️ Delay before redirecting
        setTimeout(() => {
          navigate('/my-posts');
        }, 400);
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to add crop.');
      }
    } catch (err) {
      console.error(err);
      setError('Server error.');
    }
  };

  return (
    <div className='hero bg-base-200 min-h-screen'>
      <div className='hero-content flex-col w-full'>
        <div className='text-center mb-6'>
          <h1 className='text-4xl font-bold text-primary'>Add New Crop</h1>
          <p className='py-4 max-w-md mx-auto text-base-content/80'>
            Provide detailed information about your crop listing so others can
            easily view and contact you.
          </p>
        </div>

        <div className='card bg-base-100 w-full max-w-2xl shadow-2xl'>
          <form
            onSubmit={handleSubmit}
            className='card-body grid grid-cols-1 md:grid-cols-2 gap-4'
          >
            <div className='form-control col-span-1 md:col-span-2'>
              <label className='label'>
                <span className='label-text'>Crop Name</span>
              </label>
              <input
                name='name'
                placeholder='e.g. Tomato'
                onChange={handleChange}
                required
                className='input input-bordered w-full'
              />
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Type</span>
              </label>
              <input
                name='type'
                placeholder='e.g. Vegetable'
                onChange={handleChange}
                required
                className='input input-bordered w-full'
              />
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Location</span>
              </label>
              <input
                name='location'
                placeholder='e.g. Rajshahi'
                onChange={handleChange}
                required
                className='input input-bordered w-full'
              />
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Price per Unit</span>
              </label>
              <input
                name='pricePerUnit'
                type='number'
                placeholder='e.g. 50'
                onChange={handleChange}
                required
                className='input input-bordered w-full'
              />
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Unit</span>
              </label>
              <select
                name='unit'
                onChange={handleChange}
                className='select select-bordered w-full'
              >
                <option value='kg'>Kilogram</option>
                <option value='ton'>Ton</option>
                <option value='bag'>Bag</option>
              </select>
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Estimated Quantity</span>
              </label>
              <input
                name='quantity'
                type='number'
                placeholder='e.g. 100'
                onChange={handleChange}
                required
                className='input input-bordered w-full'
              />
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Image URL</span>
              </label>
              <input
                name='image'
                placeholder='Paste an image URL'
                onChange={handleChange}
                required
                className='input input-bordered w-full'
              />
            </div>

            <div className='form-control col-span-1 md:col-span-2'>
              <label className='label'>
                <span className='label-text'>Description</span>
              </label>
              <textarea
                name='description'
                placeholder='Add details about quality, freshness, or any special notes...'
                onChange={handleChange}
                required
                className='textarea textarea-bordered w-full h-24'
              ></textarea>
            </div>

            {error && <p className='text-error col-span-2'>{error}</p>}

            <div className='form-control mt-4 col-span-1 md:col-span-2'>
              <button type='submit' className='btn btn-primary w-full'>
                Add Crop
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCrop;
