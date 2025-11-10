import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { Link } from 'react-router';
import CropCard from '../components/CropCard';
 import { Swiper, SwiperSlide } from 'swiper/react';
 import { Autoplay, Pagination } from 'swiper/modules';
 import 'swiper/css';
import 'swiper/css/pagination';
 import Marquee from 'react-fast-marquee';

 const HERO_SLIDES = [
   {
     title: 'Welcome to KrishiLink 🌾',
     subtitle: 'Connecting farmers with buyers directly.',
     image: 'https://images.unsplash.com/photo-1500937386664-56f3b6b0e3a5?q=80&w=1600&auto=format&fit=crop',
   },
   {
     title: 'Fair Prices. Fast Deals.',
     subtitle: 'Post your crops and start getting offers today.',
     image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1600&auto=format&fit=crop',
   },
   {
     title: 'From Field to Market',
     subtitle: 'Your produce, your terms—no middlemen.',
     image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
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

  return (
    <div className="p-4 space-y-10">
      {/* Hero Section */}
      <section className="rounded-lg overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="w-full"
        >
          {HERO_SLIDES.map((s, i) => (
            <SwiperSlide key={i}>
              <div
                className="relative h-[280px] md:h-[420px] flex items-center justify-center text-center"
                style={{
                  backgroundImage: `url(${s.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* overlay */}
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 px-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow">
                    {s.title}
                  </h1>
                  <p className="mt-2 text-white/90 text-lg">{s.subtitle}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Latest Crops */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Latest Crops</h2>
          <Link to="/crops" className="text-blue-600 underline">View All</Link>
        </div>
        {loading ? (
          <p>Loading crops...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latestCrops.map(crop => (
              <CropCard key={crop._id} crop={crop} />
            ))}
          </div>
        )}
      </section>

      {/* How it works */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
        <ol className="list-decimal pl-6">
          <li>Register or Login to your account</li>
          <li>Post your crops or browse available listings</li>
          <li>Send/receive interests to connect and trade</li>
          <li>Accept/reject requests and track your activity</li>
        </ol>
      </section>

      {/* Agro News or Blogs */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Agro News</h2>
        <p>[Placeholder for agro news / blogs. You can fetch external blogs later.]</p>
      </section>

      {/* Extra Section 1: Why KrishiLink */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Why KrishiLink?</h2>
        <ul className="list-disc pl-6">
          <li>Direct farmer-to-buyer communication</li>
          <li>Transparent and fair pricing</li>
          <li>Efficient crop marketing & demand matching</li>
        </ul>
      </section>

   {/* Extra Section 2: Testimonials  */}
<section className="overflow-hidden">
  <h2 className="text-2xl font-semibold mb-3">What Our Users Say</h2>
  <Marquee
    pauseOnHover
    speed={40}
    gradient={false}
    className="py-2"
    style={{ overflow: 'hidden', overflowY: 'hidden' }}
  >
    {TESTIMONIALS.map((t, i) => (
      <div key={i} className="mx-3 md:mx-4">
        <div className="flex items-center gap-4 bg-base-200 rounded-xl p-4 shadow-sm min-w-[290px]">
          <img
            src={t.img}
            alt={`${t.name} ${t.role}`}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <p className="italic text-sm md:text-base text-base-content/80">
              “{t.quote}”
            </p>
            <p className="mt-1 text-xs md:text-sm text-base-content/60">
              — {t.name}, {t.role}
            </p>
          </div>
        </div>
      </div>
    ))}
  </Marquee>
</section>

    </div>
  );
};

export default Home;
