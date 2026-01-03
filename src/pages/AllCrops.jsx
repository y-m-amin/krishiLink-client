import { useEffect, useState } from 'react';
import CropCard from '../components/CropCard';
import Loading from '../components/Loading';
import { API_BASE_URL } from '../config';

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
        setCrops(data.data);
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

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      fetchCrops();
    }
  };

  return (
    <div className='p-6 max-w-6xl mx-auto'>
      {/* Heading */}
      <h2 className='text-4xl font-bold text-center text-primary mb-8'>
        All Crops
      </h2>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className='flex flex-col sm:flex-row justify-center items-center gap-3 mb-10'
      >
        <input
          type='text'
          placeholder='Search crops...'
          value={searchTerm}
          onChange={handleSearchChange}
          className='input input-bordered w-full sm:w-72 focus:outline-none focus:ring focus:ring-primary'
        />
        <button
          type='submit'
          className='btn btn-primary w-full sm:w-auto text-white hover:text-neutral hover:btn-accent transition-all duration-400 ease-in-out'
        >
          Search
        </button>
      </form>

      {/* Crop Grid */}
      {loading ? (
        <div className='flex justify-center'>
          <Loading />
        </div>
      ) : crops.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 mx-15 md:mx-2'>
          {crops.map((crop) => (
            <CropCard key={crop._id} crop={crop} />
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-500'>
          No crops found for "{searchTerm}"
        </p>
      )}
    </div>
  );
};

export default AllCrops;
