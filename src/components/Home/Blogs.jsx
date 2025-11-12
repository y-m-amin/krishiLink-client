import 'aos/dist/aos.css';
const BLOGS = [
  {
    title: '5 Smart Irrigation Tips for Water Efficiency',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn_V78LHWaTEr6KzJEDsY9G7lqNTgm3H93LQ&s',
    desc: 'Learn how to conserve water while keeping your crops healthy using efficient irrigation systems.',
  },
  {
    title: 'Organic Fertilizers vs Chemical Fertilizers',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5FT1dNvJviUceDwtN7oeKstMLpwwqudpF3g&s',
    desc: 'Explore the benefits and tradeoffs between natural and chemical fertilizers for better soil health.',
  },
  {
    title: 'Best Seasonal Crops to Grow in Bangladesh',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6jxzi7Iv_r5NYMP1anMYsqP4DpOcemTJKeQ&s',
    desc: 'A guide to the top-performing crops throughout different seasons to maximize your farm’s yield.',
  },
  // {
  //   title: 'Modern Tools Every Farmer Should Know',
  //   img: 'https://images.unsplash.com/photo-1616784037746-4b2a4e7f8b09?q=80&w=800&auto=format&fit=crop',
  //   desc: 'Discover new technologies that make farming easier, faster, and more profitable.',
  // },
];

const Blogs = () => {
  return (
    <>
      <section className='max-w-7xl mx-3 my-10 xl:mx-auto '>
        <h2 className='text-4xl font-bold text-primary text-center my-10'>
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
                  <button className='btn btn-outline btn-sm btn-primary hover:text-white'>
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Blogs;
