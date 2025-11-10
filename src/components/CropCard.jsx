import React from 'react';
import { Link } from 'react-router';

const CropCard = ({ crop }) => {
  return (
    <div className="border p-4 rounded shadow">
      <img src={crop.image} alt={crop.name} className="h-40 w-full object-cover rounded" />
      <h3 className="text-xl font-bold mt-2">{crop.name}</h3>
      <p>{crop.type} - {crop.unit}</p>
      <p>Price: ৳{crop.pricePerUnit}/{crop.unit}</p>
      <p>Qty: {crop.quantity} {crop.unit}</p>
      <p className="text-sm text-gray-500">{crop.location}</p>
      <Link to={`/crops/${crop._id}`} className="mt-2 inline-block text-blue-600 underline">View Details</Link>
    </div>
  );
};

export default CropCard;
