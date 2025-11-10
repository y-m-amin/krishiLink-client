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
    <div className='card bg-base-200 w-full shadow-sm'>
      <figure className='h-40'>
        <img src={image} alt={name} className='h-40 w-full object-cover' />
      </figure>

      <div className='card-body p-4'>
        <h2 className='card-title text-lg'>
          {name}
          {isNew ? <div className='badge badge-secondary'>NEW</div> : null}
        </h2>

        <p className='text-sm text-base-content/70'>{location}</p>

        <div className='flex flex-wrap gap-2 mt-1'>
          {type ? <div className='badge badge-outline'>{type}</div> : null}
          {unit ? <div className='badge badge-outline'>{unit}</div> : null}
          <div className='badge'>
            ৳{pricePerUnit}/{unit}
          </div>
          <div className='badge'>
            Qty: {quantity} {unit}
          </div>
        </div>

        <div className='card-actions justify-end mt-2'>
          <Link to={`/crops/${_id}`} className='btn btn-sm btn-primary'>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CropCard;
