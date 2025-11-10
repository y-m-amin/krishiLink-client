import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config';

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const [crops, setCrops] = useState([]);
  const [editingCrop, setEditingCrop] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMyCrops = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/crops`)
      .then((res) => res.json())
      .then((data) => {
        const myCrops = data.filter(crop => crop.owner?.ownerEmail === user.email);
        setCrops(myCrops);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMyCrops();
  }, [user]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this crop?')) return;
    const res = await fetch(`${API_BASE_URL}/crops/${id}`, { method: 'DELETE' });
    if (res.ok) {
      alert('Deleted successfully');
      setCrops(crops.filter(crop => crop._id !== id));
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
      fetchMyCrops();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Crop Posts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : crops.length === 0 ? (
        <p>No crops posted yet.</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Unit</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {crops.map(crop => (
              <tr key={crop._id}>
                <td>{crop.name}</td>
                <td>{crop.quantity}</td>
                <td>৳{crop.pricePerUnit}</td>
                <td>{crop.unit}</td>
                <td>{crop.location}</td>
                <td>
                  <button onClick={() => setEditingCrop(crop)} className="bg-yellow-400 px-2 py-1 mr-2">Edit</button>
                  <button onClick={() => handleDelete(crop._id)} className="bg-red-500 text-white px-2 py-1">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      {editingCrop && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <form onSubmit={handleEdit} className="bg-white p-6 space-y-3 rounded shadow-md w-full max-w-lg">
            <h3 className="text-xl font-bold">Edit Crop</h3>
            <input name="name" defaultValue={editingCrop.name} required className="w-full border p-2" />
            <input name="type" defaultValue={editingCrop.type} required className="w-full border p-2" />
            <input name="pricePerUnit" type="number" defaultValue={editingCrop.pricePerUnit} required className="w-full border p-2" />
            <select name="unit" defaultValue={editingCrop.unit} className="w-full border p-2">
              <option value="kg">kg</option>
              <option value="ton">ton</option>
              <option value="bag">bag</option>
            </select>
            <input name="quantity" type="number" defaultValue={editingCrop.quantity} required className="w-full border p-2" />
            <input name="location" defaultValue={editingCrop.location} required className="w-full border p-2" />
            <input name="image" defaultValue={editingCrop.image} required className="w-full border p-2" />
            <textarea name="description" defaultValue={editingCrop.description} required className="w-full border p-2" />
            <div className="flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
              <button onClick={() => setEditingCrop(null)} type="button" className="bg-gray-400 px-4 py-2 rounded">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
