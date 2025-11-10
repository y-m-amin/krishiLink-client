import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import CropCard from '../components/CropCard';

const AllCrops = () => {
  const [crops, setCrops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCrops = (query = '') => {
    setLoading(true);
    let url = `${API_BASE_URL}/crops`;
    if (query) {
      url += `?search=${encodeURIComponent(query)}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCrops(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch crops:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCrops(searchTerm.trim());
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-4">All Crops</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          placeholder="Search crops..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {/* Crop Grid */}
      {loading ? (
        <p>Loading crops...</p>
      ) : crops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {crops.map((crop) => (
            <CropCard key={crop._id} crop={crop} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No crops found for "{searchTerm}"</p>
      )}
    </div>
  );
};

export default AllCrops;
