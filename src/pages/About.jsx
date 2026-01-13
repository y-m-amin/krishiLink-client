import { motion } from 'framer-motion';

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <div className='max-w-6xl mx-auto px-6 py-16 space-y-20'>
      {/* Hero Section */}
      <motion.section
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={sectionVariant}
        transition={{ duration: 0.6 }}
        className='text-center space-y-6'
      >
        <h1 className='text-4xl md:text-5xl font-bold'>
          Krishi <span className='text-emerald-500 font-inherit'>Link</span>
        </h1>
        <p className='text-lg text-base-content/70 max-w-3xl mx-auto'>
          Farmer’s Growth & Connection Platform — empowering collaboration,
          transparency, and trust across the agricultural ecosystem.
        </p>
      </motion.section>

      {/* What is KrishiLink */}
      <motion.section
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={sectionVariant}
        transition={{ duration: 0.6, delay: 0.1 }}
        className='space-y-4'
      >
        <h2 className='text-2xl font-semibold text-primary'>
          What is KrishiLink?
        </h2>
        <p className='text-base-content/80 leading-relaxed'>
          KrishiLink is a modern agro-social networking platform designed to
          connect farmers, traders, and consumers within a single digital space.
          Unlike traditional agricultural marketplaces, KrishiLink focuses on
          building meaningful connections rather than simple buying and selling.
        </p>
        <p className='text-base-content/80 leading-relaxed'>
          The platform encourages transparency, collaboration, and direct
          communication — helping users discover opportunities, share knowledge,
          and grow together as a community.
        </p>
      </motion.section>

      {/* What Users Can Do */}
      <motion.section
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={sectionVariant}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='space-y-6'
      >
        <h2 className='text-2xl font-semibold text-primary'>
          What You Can Do on KrishiLink
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='card bg-base-100 shadow-md border border-base-200'>
            <div className='card-body'>
              <h3 className='font-semibold text-lg'>🌱 Share Your Crops</h3>
              <p className='text-sm text-base-content/70'>
                Post what you are growing or selling, including crop details,
                quantity, and location.
              </p>
            </div>
          </div>

          <div className='card bg-base-100 shadow-md border border-base-200'>
            <div className='card-body'>
              <h3 className='font-semibold text-lg'>
                🧺 Explore Opportunities
              </h3>
              <p className='text-sm text-base-content/70'>
                Browse crop posts from other users and discover agricultural
                opportunities nearby.
              </p>
            </div>
          </div>

          <div className='card bg-base-100 shadow-md border border-base-200'>
            <div className='card-body'>
              <h3 className='font-semibold text-lg'>
                🤝 Connect & Collaborate
              </h3>
              <p className='text-sm text-base-content/70'>
                Show interest, connect directly, and collaborate without
                intermediaries.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Technology Stack */}
      <motion.section
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={sectionVariant}
        transition={{ duration: 0.6, delay: 0.3 }}
        className='space-y-4'
      >
        <h2 className='text-2xl font-semibold text-primary'>
          Technology & Security
        </h2>
        <p className='text-base-content/80 leading-relaxed'>
          KrishiLink is built using modern web technologies including React
          Router for seamless navigation, TailwindCSS and DaisyUI for a clean
          and responsive interface, and Firebase Authentication for secure user
          access.
        </p>
        <p className='text-base-content/80 leading-relaxed'>
          The platform prioritizes performance, usability, and data security —
          ensuring a smooth and trustworthy experience for all users.
        </p>
      </motion.section>

      {/* Vision */}
      <motion.section
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={sectionVariant}
        transition={{ duration: 0.6, delay: 0.4 }}
        className='text-center space-y-4'
      >
        <h2 className='text-2xl font-semibold text-primary'>Our Vision</h2>
        <p className='text-base-content/80 max-w-3xl mx-auto leading-relaxed'>
          KrishiLink aims to strengthen the agricultural community by removing
          barriers between producers and consumers. By enabling direct
          interaction and collaboration, we envision a future where agriculture
          is more transparent, efficient, and community-driven.
        </p>
      </motion.section>
    </div>
  );
};

export default About;
