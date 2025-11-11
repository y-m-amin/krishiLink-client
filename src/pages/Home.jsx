import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import howImg1 from '../assets/howImg1.png';
import howImg2 from '../assets/howImg2.png';
import howImg3 from '../assets/howImg3.png';
import howImg4 from '../assets/howImg4.png';
import CropCard from '../components/CropCard';
import { API_BASE_URL } from '../config';

const HERO_SLIDES = [
  {
    title: 'Welcome to KrishiLink 🌾',
    subtitle: 'Connecting farmers with buyers directly.',
    image:
      'https://images.unsplash.com/photo-1500937386664-56f3b6b0e3a5?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Fair Prices. Fast Deals.',
    subtitle: 'Post your crops and start getting offers today.',
    image:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'From Field to Market',
    subtitle: 'Your produce, your terms—no middlemen.',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
  },
];

const HOW_STEPS = [
  {
    title: 'Register or Login to your account',
    img: howImg1,
  },
  {
    title: 'Post your crops or browse available listings',
    img: howImg2,
  },
  {
    title: 'Send/receive interests to connect and trade',
    img: howImg3,
  },
  {
    title: 'Accept/reject requests and track your activity',
    img: howImg4,
  },
];

const TESTIMONIALS = [
  {
    img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=400&auto=format&fit=crop',
    quote: 'KrishiLink helped me sell my tomatoes within days!',
    name: 'Rafiq',
    role: 'Farmer',
  },
  {
    img: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=400&auto=format&fit=crop',
    quote: 'Found reliable suppliers at fair prices—super easy.',
    name: 'Nadia',
    role: 'Buyer',
  },
  {
    img: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=400&auto=format&fit=crop',
    quote: 'Direct deals saved me time and transport costs.',
    name: 'Kamal',
    role: 'Farmer',
  },
  {
    img: 'https://images.unsplash.com/photo-1590080875831-16cdb4c5b0bd?q=80&w=400&auto=format&fit=crop',
    quote:
      'I found trusted wholesale rice buyers through KrishiLink — it boosted my sales big time!',
    name: 'Selina',
    role: 'Paddy Farmer',
  },
];

const BLOGS = [
  {
    title: '5 Smart Irrigation Tips for Water Efficiency',
    img: 'https://images.unsplash.com/photo-1524593119771-d04e33dc5e9b?q=80&w=800&auto=format&fit=crop',
    desc: 'Learn how to conserve water while keeping your crops healthy using efficient irrigation systems.',
  },
  {
    title: 'Organic Fertilizers vs Chemical Fertilizers',
    img: 'https://images.unsplash.com/photo-1581092919535-7146ffbe2f3d?q=80&w=800&auto=format&fit=crop',
    desc: 'Explore the benefits and tradeoffs between natural and chemical fertilizers for better soil health.',
  },
  {
    title: 'Best Seasonal Crops to Grow in Bangladesh',
    img: 'https://images.unsplash.com/photo-1603570417039-76be1f5d8a17?q=80&w=800&auto=format&fit=crop',
    desc: 'A guide to the top-performing crops throughout different seasons to maximize your farm’s yield.',
  },
  // {
  //   title: 'Modern Tools Every Farmer Should Know',
  //   img: 'https://images.unsplash.com/photo-1616784037746-4b2a4e7f8b09?q=80&w=800&auto=format&fit=crop',
  //   desc: 'Discover new technologies that make farming easier, faster, and more profitable.',
  // },
];

const Home = () => {
  const [latestCrops, setLatestCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/latest-crops`)
      .then((res) => res.json())
      .then((data) => {
        setLatestCrops(data);
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
      <section className='w-full overflow-hidden shadow-lg'>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className='w-full'
        >
          {HERO_SLIDES.map((s, i) => (
            <SwiperSlide key={i}>
              <div
                className='relative h-[300px] md:h-[460px] flex items-center justify-center text-center'
                style={{
                  backgroundImage: `url(${s.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className='absolute inset-0 bg-black/40' />
                <div className='relative z-10 px-4'>
                  <h1 className='text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg'>
                    {s.title}
                  </h1>
                  <p className='mt-3 text-white/90 text-lg md:text-xl'>
                    {s.subtitle}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* LATEST CROPS */}
      <section className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-3xl font-bold text-primary'>Latest Crops</h2>
          <Link to='/crops' className='btn btn-outline btn-primary btn-sm'>
            View All
          </Link>
        </div>

        {loading ? (
          <p className='text-center text-gray-500'>Loading crops...</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
            {latestCrops.map((crop) => (
              <CropCard key={crop._id} crop={crop} />
            ))}
          </div>
        )}
      </section>

      {/* HOW IT WORKS */}
      <section className='max-w-6xl mx-auto'>
        <h2
          className='text-4xl md:text-5xl font-bold text-accent text-center mb-10'
          data-aos='fade-up'
        >
          How It Works
        </h2>
        <div className='flex flex-col gap-16'>
          {HOW_STEPS.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center justify-between gap-8 ${
                index % 2 !== 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <img
                src={step.img}
                alt={step.title}
                className='w-full md:w-[45%] rounded-2xl shadow-md'
                data-aos='zoom-in'
                data-aos-delay={index * 150}
              />
              <h3
                className='text-2xl md:text-3xl font-semibold text-center md:text-left text-secondary'
                data-aos='fade-up'
                data-aos-delay={index * 150 + 100}
              >
                {step.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/*  BLOG SECTION */}
      <section className='max-w-7xl mx-auto'>
        <h2 className='text-4xl font-bold text-accent text-center mb-10'>
          Agro News & Tips
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {BLOGS.map((blog, i) => (
            <div
              key={i}
              className='card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300'
              data-aos='fade-up'
              data-aos-delay={i * 100}
            >
              <figure>
                <img
                  src={blog.img}
                  alt={blog.title}
                  className='w-full h-56 object-cover'
                />
              </figure>
              <div className='card-body'>
                <h3 className='card-title text-lg font-bold'>{blog.title}</h3>
                <p className='text-gray-600 text-sm'>{blog.desc}</p>
                <div className='card-actions justify-end mt-3'>
                  <button className='btn btn-outline btn-sm btn-primary'>
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY KRISHILINK */}
      <section className='bg-base-200 rounded-2xl py-10 px-6 max-w-7xl mx-auto shadow-md'>
        <h2 className='text-3xl font-bold text-primary mb-4'>
          Why KrishiLink?
        </h2>
        <ul className='list-disc pl-6 space-y-2 text-base'>
          <li>Direct farmer-to-buyer communication</li>
          <li>Transparent and fair pricing</li>
          <li>Efficient crop marketing & demand matching</li>
        </ul>
      </section>

      {/* TESTIMONIALS */}
      <section className='relative overflow-hidden max-w-7xl mx-auto bg-base-100 py-12'>
        <h2 className='text-4xl font-bold text-accent mb-8 text-center'>
          What Our Users Say
        </h2>

        {/* Left and Right Fade Overlays */}
        <div className='pointer-events-none absolute top-0 left-0 w-24 h-full bg-linear-to-r from-base-100 to-transparent z-10' />
        <div className='pointer-events-none absolute top-0 right-0 w-24 h-full bg-linear-to-l from-base-100 to-transparent z-10' />

        {/* Full-Width Marquee */}
        <Marquee
          pauseOnHover
          speed={45}
          gradient={false}
          className='py-4'
          style={{ overflow: 'hidden', overflowY: 'hidden' }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className='mx-4'>
              <div className='card bg-base-300 w-80 h-64 shadow-lg hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between'>
                <div className='flex items-center gap-3'>
                  <img
                    src={t.img}
                    alt={t.name}
                    className='h-14 w-14 rounded-full object-cover border-2 border-primary'
                  />
                  <div>
                    <p className='font-semibold text-lg'>{t.name}</p>
                    <p className='text-sm opacity-70'>{t.role}</p>
                  </div>
                </div>
                <p className='italic text-base text-base-content/80 leading-relaxed'>
                  “{t.quote}”
                </p>
              </div>
            </div>
          ))}
        </Marquee>
      </section>
    </div>
  );
};

export default Home;
