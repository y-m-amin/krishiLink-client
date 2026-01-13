import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import swal from 'sweetalert';
import instance from '../api/axios';
import { AuthContext } from '../contexts/AuthContext';

/**
 * AddCrop Component
 * -----------------
 * Adds a new crop with validation and Axios API request
 */
const AddCrop = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  /**
   * Handle input change
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Basic form validation
   */
  const validateForm = () => {
    if (form.pricePerUnit <= 0) {
      return 'Price must be greater than 0';
    }

    if (form.quantity <= 0) {
      return 'Quantity must be greater than 0';
    }

    if (!form.image.startsWith('http')) {
      return 'Please provide a valid image URL';
    }

    return '';
  };

  /**
   * Submit handler
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    const cropData = {
      ...form,
      pricePerUnit: parseFloat(form.pricePerUnit),
      quantity: parseFloat(form.quantity),
    };

    try {
      await instance.post('/crops', cropData);

      swal({
        title: 'Crop Added!',
        text: `${cropData.quantity} ${cropData.unit} ${cropData.name} added successfully.`,
        icon: 'success',
        buttons: false,
        timer: 1500,
      });

      setTimeout(() => {
        navigate('/my-posts');
      }, 400);
    } catch (err) {
      console.error('Add crop error:', err);
      setError(err.response?.data?.message || 'Failed to add crop. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='hero bg-base-200 min-h-screen '>
      <div className='hero-content flex-col w-full'>
        <div className='text-center mb-6'>
          <h1 className='text-4xl font-bold text-primary'>Add New Crop</h1>
          <p className='py-4 max-w-md mx-auto text-base-content/80'>
            Provide detailed information about your crop listing.
          </p>
        </div>

        <div className='card bg-base-100 w-full max-w-2xl shadow-2xl'>
          <form
            onSubmit={handleSubmit}
            className='card-body grid grid-cols-1 md:grid-cols-2 gap-4'
          >
            {/* Crop Name */}
            <input
              name='name'
              placeholder='Crop Name'
              onChange={handleChange}
              required
              className='input input-bordered w-full md:col-span-2'
            />

            {/* Type */}
            <input
              name='type'
              placeholder='Type (Vegetable, Fruit...)'
              onChange={handleChange}
              required
              className='input input-bordered w-full'
            />

            {/* Location */}
            <input
              name='location'
              placeholder='Location'
              onChange={handleChange}
              required
              className='input input-bordered w-full'
            />

            {/* Price */}
            <input
              name='pricePerUnit'
              type='number'
              min='1'
              placeholder='Price per unit'
              onChange={handleChange}
              required
              className='input input-bordered w-full'
            />

            {/* Unit */}
            <select
              name='unit'
              onChange={handleChange}
              className='select select-bordered w-full'
            >
              <option value='kg'>Kilogram</option>
              <option value='pcs'>Piece</option>
              <option value='ton'>Ton</option>
              <option value='bag'>Bag</option>
            </select>

            {/* Quantity */}
            <input
              name='quantity'
              type='number'
              min='1'
              placeholder='Estimated quantity'
              onChange={handleChange}
              required
              className='input input-bordered w-full'
            />

            {/* Image */}
            <input
              name='image'
              placeholder='Image URL'
              onChange={handleChange}
              required
              className='input input-bordered w-full'
            />

            {/* Description */}
            <textarea
              name='description'
              placeholder='Description'
              onChange={handleChange}
              required
              className='textarea textarea-bordered w-full h-24 md:col-span-2'
            />

            {/* Error */}
            {error && <p className='text-error md:col-span-2'>{error}</p>}

            {/* Submit */}
            <button
              type='submit'
              disabled={loading}
              className='btn btn-primary md:col-span-2'
            >
              {loading ? 'Adding...' : 'Add Crop'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCrop;
