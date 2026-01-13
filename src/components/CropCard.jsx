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
    verified,
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
        <h2 className='card-title text-lg font-semibold flex justify-between items-start gap-2'>
          <span className='flex items-center gap-2'>{name}</span>

          <div className='flex flex-col items-end gap-1'>
            <span className='text-primary font-bold text-sm'>
              ৳{pricePerUnit}/{unit}
            </span>
            {verified && (
              <span
                className='tooltip tooltip-bottom'
                data-tip='Verified Seller'
              >
                <span className='badge badge-accent text-white text-xs'>
                  ✔ Verified
                </span>
              </span>
            )}
          </div>
        </h2>

        <p className='text-sm text-base-content/70 flex items-center gap-1'>
          {location}
        </p>

        <div className='flex flex-wrap gap-2 mt-3'>
          {type && (
            <div className='badge badge-outline badge-primary'>{type}</div>
          )}
          <div className='badge  badge-primary text-white'>
            Qty: {quantity} {unit}
          </div>
        </div>

        <div className='card-actions  mt-4'>
          <Link
            to={`/crops/${_id}`}
            className='btn btn-md btn-primary text-white hover:text-neutral hover:btn-accent transition-all duration-400 ease-in-out'
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CropCard;
