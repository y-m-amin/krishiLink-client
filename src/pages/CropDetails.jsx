import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config';

const CropDetails = () => {
  const crop = useLoaderData(); // ⬅️ this replaces the fetch
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [interestSent, setInterestSent] = useState(false);
  const [formData, setFormData] = useState({ quantity: 1, message: '' });

  const isOwner = user?.email === crop?.owner?.ownerEmail;

  useEffect(() => {
    if (crop?.interests?.some(i => i.userEmail === user?.email)) {
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

    if (res.ok) {
      window.location.reload(); // quick and dirty refresh
    }
  };

  if (!crop) return <p>Crop not found</p>;

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">{crop.name}</h2>
      <img src={crop.image} alt={crop.name} className="h-60 object-cover" />
      <p>Type: {crop.type}</p>
      <p>Price: ৳{crop.pricePerUnit}/{crop.unit}</p>
      <p>Quantity: {crop.quantity} {crop.unit}</p>
      <p>Description: {crop.description}</p>
      <p>Location: {crop.location}</p>

      {!isOwner && user && !interestSent && (
        <form onSubmit={handleInterestSubmit} className="border p-4 rounded space-y-2">
          <h3 className="text-lg font-semibold">Send Interest</h3>
          <input
            type="number"
            min={1}
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
            className="border p-2 w-full"
            placeholder="Quantity"
          />
          <input
            type="text"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="border p-2 w-full"
            placeholder="Message"
          />
          <p>Total Price: ৳{formData.quantity * crop.pricePerUnit}</p>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit Interest</button>
        </form>
      )}

      {!isOwner && interestSent && <p className="text-green-700">You’ve already sent an interest.</p>}

      {isOwner && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Received Interests</h3>
          {crop.interests?.length > 0 ? (
            <table className="table-auto w-full mt-2">
              <thead>
                <tr>
                  <th>Buyer</th>
                  <th>Qty</th>
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
                    <td>{i.status}</td>
                    <td>
                      {i.status === 'pending' && (
                        <>
                          <button onClick={() => handleAction(i._id, 'accepted', i.quantity)} className="bg-green-500 text-white px-2 mr-2">Accept</button>
                          <button onClick={() => handleAction(i._id, 'rejected', 0)} className="bg-red-500 text-white px-2">Reject</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No interests yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CropDetails;
