import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import swal from 'sweetalert';
import instance from '../api/axios';

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    const sessionId = params.get('session_id');

    if (!sessionId) {
      swal('Error', 'Invalid payment session', 'error');
      navigate('/');
      return;
    }

    instance
      .post('/payments/confirm', { sessionId })
      .then(() => {
        swal({
          title: 'Payment Successful 🎉',
          text: 'Your payment has been confirmed.',
          icon: 'success',
          timer: 1500,
          buttons: false,
        });

        setTimeout(() => navigate('/my-interests'), 1600);
      })
      .catch((err) => {
        console.error('Payment confirm error:', err);
        swal('Error', 'Payment confirmation failed', 'error');
        navigate('/payment-failed');
      });
  }, [params, navigate]);

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <h2 className='text-2xl font-semibold text-primary'>
        Processing your payment...
      </h2>
    </div>
  );
};

export default PaymentSuccess;
