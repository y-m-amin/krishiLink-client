import { useNavigate } from 'react-router';

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <h1 className='text-4xl font-bold text-error'>Payment Failed ❌</h1>
      <p className='mt-2'>Payment was cancelled or failed.</p>

      <button
        onClick={() => navigate('/my-interests')}
        className='btn btn-outline mt-6'
      >
        Try Again Later
      </button>
    </div>
  );
};

export default PaymentFailed;
