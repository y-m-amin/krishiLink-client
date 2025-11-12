import Marquee from 'react-fast-marquee';
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
const Testimonials = () => {
  return (
    <>
      <section className='relative overflow-hidden max-w-7xl mx-auto bg-base-100 py-12'>
        <h2 className='text-4xl font-bold text-primary mb-8 text-center'>
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
    </>
  );
};

export default Testimonials;
