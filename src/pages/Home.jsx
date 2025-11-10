import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { Link } from 'react-router';
import CropCard from '../components/CropCard';

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
      <section className="bg-green-100 p-6 text-center">
        <h1 className="text-3xl font-bold">Welcome to KrishiLink 🌾</h1>
        <p className="text-lg">Connecting farmers with buyers directly.</p>
        {/* You can integrate a slider here later */}
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

      {/* Extra Section 2: Testimonials */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">What Our Users Say</h2>
        <blockquote className="border-l-4 pl-4 italic text-gray-600">
          "KrishiLink helped me sell my tomatoes within days! Highly recommend to all farmers." – Rafiq, Farmer
        </blockquote>
      </section>
    </div>
  );
};

export default Home;
