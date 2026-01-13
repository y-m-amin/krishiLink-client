import { useEffect, useMemo, useState } from 'react';
import CropCard from '../components/CropCard';
import Loading from '../components/Loading';
import { API_BASE_URL } from '../config';

const PAGE_SIZE = 8;

const AllCrops = () => {
  const [allCrops, setAllCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters & sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('name-asc');

  // pagination
  const [page, setPage] = useState(1);

  /* ---------------- fetch once ---------------- */
  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/crops`)
      .then((res) => res.json())
      .then((data) => {
        setAllCrops(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch crops:', err);
        setLoading(false);
      });
  }, []);

  /* ---------------- derived data ---------------- */
  const filteredAndSorted = useMemo(() => {
    let data = [...allCrops];

    // search
    if (searchTerm.trim()) {
      data = data.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // category
    if (category !== 'all') {
      data = data.filter((c) => c.type === category);
    }

    // verified
    if (verifiedOnly) {
      data = data.filter((c) => c.verified === true);
    }

    // sorting
    switch (sortBy) {
      case 'name-desc':
        data.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        data.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
        break;
      case 'price-desc':
        data.sort((a, b) => b.pricePerUnit - a.pricePerUnit);
        break;
      default:
        data.sort((a, b) => a.name.localeCompare(b.name));
    }

    return data;
  }, [allCrops, searchTerm, category, verifiedOnly, sortBy]);

  const totalPages = Math.ceil(filteredAndSorted.length / PAGE_SIZE);

  const paginatedCrops = filteredAndSorted.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  /* ---------------- handlers ---------------- */
  const resetPage = () => setPage(1);

  return (
    <div className='p-6 max-w-6xl mx-auto'>
      <h2 className='text-4xl font-bold text-center text-primary mb-8'>
        All Crops
      </h2>

      {/* Controls */}
      <div className='flex flex-col lg:flex-row gap-4 mb-8 justify-between'>
        <input
          type='text'
          placeholder='Search crops...'
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            resetPage();
          }}
          className='input input-bordered w-full lg:w-64'
        />

        <select
          className='select select-bordered w-full lg:w-48'
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            resetPage();
          }}
        >
          <option value='all'>All Categories</option>
          <option value='Vegetable'>Vegetable</option>
          <option value='Fruit'>Fruit</option>
          <option value='Grain'>Grain</option>
        </select>

        <select
          className='select select-bordered w-full lg:w-56'
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value='name-asc'>Name (A–Z)</option>
          <option value='name-desc'>Name (Z–A)</option>
          <option value='price-asc'>Price (Low → High)</option>
          <option value='price-desc'>Price (High → Low)</option>
        </select>

        <label className='flex items-center gap-2 cursor-pointer'>
          <input
            type='checkbox'
            className='checkbox checkbox-primary'
            checked={verifiedOnly}
            onChange={(e) => {
              setVerifiedOnly(e.target.checked);
              resetPage();
            }}
          />
          <span className='text-sm'>Verified only</span>
        </label>
      </div>

      {/* Grid */}
      {loading ? (
        <div className='flex justify-center'>
          <Loading />
        </div>
      ) : paginatedCrops.length ? (
        <>
          <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6'>
            {paginatedCrops.map((crop) => (
              <CropCard key={crop._id} crop={crop} />
            ))}
          </div>

          {/* Pagination */}
          <div className='flex justify-center mt-10 gap-2'>
            <button
              className='btn btn-sm'
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </button>

            <span className='btn btn-sm btn-ghost'>
              Page {page} of {totalPages}
            </span>

            <button
              className='btn btn-sm'
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className='text-center text-gray-500'>No crops found</p>
      )}
    </div>
  );
};

export default AllCrops;
