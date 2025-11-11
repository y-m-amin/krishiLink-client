import { BsTwitterX } from 'react-icons/bs';
import { FaFacebookSquare, FaYoutube } from 'react-icons/fa';
const Footer = () => (
  <footer className='footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4'>
    <aside className='grid-flow-col items-center'>
      🌾 KrishiLink
      <p>Copyright © 2025 - All right reserved</p>
    </aside>
    <nav className='grid-flow-col gap-4 md:place-self-center md:justify-self-end'>
      <a>
        <BsTwitterX />
      </a>
      <a>
        <FaYoutube />
      </a>
      <a>
        <FaFacebookSquare />
      </a>
    </nav>
  </footer>
);

export default Footer;
