import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import CropCard from '../components/CropCard';
import Blogs from '../components/Home/Blogs';
import HeroSlider from '../components/Home/HeroSlider';
import HowTo from '../components/Home/HowTo';
import Testimonials from '../components/Home/Testimonials';
import Loading from '../components/Loading';
import { API_BASE_URL } from '../config';

const Home = () => {
  const [latestCrops, setLatestCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/latest-crops`)
      .then((res) => res.json())
      .then((data) => {
        setLatestCrops(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch latest crops:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
      offset: 120,
    });
    setTimeout(() => AOS.refresh(), 500);
  }, []);

  return (
    <div className='space-y-16'>
      {/* HERO SECTION */}
      <HeroSlider />

      {/* LATEST CROPS */}
      <section className='max-w-7xl m-3   xl:mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-4xl font-bold text-primary'>Latest Crops</h2>
          <Link
            to='/crops'
            className='btn btn-outline btn-primary btn-md hover:text-white'
          >
            View All
          </Link>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
            {latestCrops.map((crop) => (
              <CropCard key={crop._id} crop={crop} />
            ))}
          </div>
        )}
      </section>

      {/* HOW IT WORKS */}
      <HowTo />

      {/*  BLOG SECTION */}
      <Blogs />

      {/* WHY KRISHILINK */}
      <section className='bg-base-200 rounded-2xl py-10 px-6 max-w-7xl mx-3 my-10 xl:mx-auto shadow-md'>
        <h2 className='text-4xl font-bold text-primary mb-4'>
          Why KrishiLink?
        </h2>
        <ul className='list-disc pl-6 space-y-2 text-base'>
          <li>Direct farmer-to-buyer communication</li>
          <li>Transparent and fair pricing</li>
          <li>Efficient crop marketing & demand matching</li>
        </ul>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />
    </div>
  );
};

export default Home;
