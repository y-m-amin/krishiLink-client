import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router';

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
        alert('Crop added successfully!');
        navigate('/my-posts');
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Crop</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Crop Name" onChange={handleChange} required className="w-full border p-2" />
        <input name="type" placeholder="Type (e.g., Vegetable)" onChange={handleChange} required className="w-full border p-2" />
        <input name="pricePerUnit" type="number" placeholder="Price per unit" onChange={handleChange} required className="w-full border p-2" />
        <select name="unit" onChange={handleChange} className="w-full border p-2">
          <option value="kg">kg</option>
          <option value="ton">ton</option>
          <option value="bag">bag</option>
        </select>
        <input name="quantity" type="number" placeholder="Estimated Quantity" onChange={handleChange} required className="w-full border p-2" />
        <input name="location" placeholder="Location" onChange={handleChange} required className="w-full border p-2" />
        <input name="image" placeholder="Image URL" onChange={handleChange} required className="w-full border p-2" />
        <textarea name="description" placeholder="Description" onChange={handleChange} required className="w-full border p-2"></textarea>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Crop</button>
      </form>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default AddCrop;
