import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import howImg1 from '../../assets/howImg1.png';
import howImg2 from '../../assets/howImg2.png';
import howImg3 from '../../assets/howImg3.png';
import howImg4 from '../../assets/howImg4.png';

const HOW_STEPS = [
  {
    title: '1. Register or Login to your account',
    img: howImg1,
  },
  {
    title: '2. Post your crops or browse available listings',
    img: howImg2,
  },
  {
    title: '3. Send/receive interests to connect and trade',
    img: howImg3,
  },
  {
    title: '4. Accept/reject requests and track your activity',
    img: howImg4,
  },
];
const HowTo = () => {
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
    <>
      {' '}
      <section className='max-w-6xl m-3  xl:mx-auto'>
        <h2 className='text-4xl  font-bold text-primary text-center my-10'>
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
    </>
  );
};

export default HowTo;
