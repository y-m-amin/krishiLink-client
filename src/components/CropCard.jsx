import { Link } from 'react-router';

const CropCard = ({ crop }) => {
  const {
    _id,
    image,
    name,
    type,
    unit,
    pricePerUnit,
    quantity,
    location,
    isNew,
  } = crop || {};

  return (
    <div className='card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-base-200'>
      <figure className='relative h-48 overflow-hidden rounded-t-lg'>
        <img
          src={image || '/placeholder-crop.jpg'}
          alt={name}
          className='w-full h-full object-cover transition-transform duration-500 hover:scale-105'
        />
        {isNew && (
          <div className='absolute top-2 left-2 badge badge-secondary text-xs'>
            NEW
          </div>
        )}
      </figure>

      <div className='card-body p-4'>
        <h2 className='card-title text-lg font-semibold flex justify-between items-center'>
          {name}
          <span className='text-primary font-bold text-sm'>
            ৳{pricePerUnit}/{unit}
          </span>
        </h2>

        <p className='text-sm text-base-content/70 flex items-center gap-1'>
          📍 {location}
        </p>

        <div className='flex flex-wrap gap-2 mt-3'>
          {type && (
            <div className='badge badge-outline badge-secondary'>{type}</div>
          )}
          <div className='badge badge-outline badge-accent'>
            Qty: {quantity} {unit}
          </div>
        </div>

        <div className='card-actions justify-end mt-4'>
          <Link to={`/crops/${_id}`} className='btn btn-sm btn-primary'>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CropCard;
