import { BsTwitterX } from 'react-icons/bs';
import { FaFacebookSquare, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router';
const Footer = () => (
  <footer className='footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4'>
    <aside className='grid-flow-col items-center'>
      <Link to='/' className='btn btn-ghost text-xl font-bold'>
        Krishi<span className='text-emerald-500 font-inherit'>Link</span>
      </Link>
      <p>Copyright © 2025 - All right reserved</p>
    </aside>
    <nav className='grid-flow-col gap-4 md:place-self-center md:justify-self-end text-2xl'>
      <a
        href='https://x.com'
        target='_blank'
        rel='noopener noreferrer'
        className='hover:text-blue-500 transition-colors'
      >
        <BsTwitterX />
      </a>
      <a
        href='https://youtube.com'
        target='_blank'
        rel='noopener noreferrer'
        className='hover:text-red-500 transition-colors'
      >
        <FaYoutube />
      </a>
      <a
        href='https://facebook.com'
        target='_blank'
        rel='noopener noreferrer'
        className='hover:text-blue-600 transition-colors'
      >
        <FaFacebookSquare />
      </a>
    </nav>
  </footer>
);

export default Footer;
