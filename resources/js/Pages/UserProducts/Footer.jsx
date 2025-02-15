import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaGooglePlay, FaApple } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 py-10 border-t border-gray-300">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-green-600">EasyClick</h2>
          <p className="mb-4 text-gray-600">Your go-to online store for the latest fashion trends at your fingertips.</p>
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} EasyClick. All rights reserved.</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-green-600">Customer Service</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#" className="hover:text-green-600">Help Center</a></li>
            <li><a href="#" className="hover:text-green-600">Returns</a></li>
            <li><a href="#" className="hover:text-green-600">Shipping Info</a></li>
            <li><a href="#" className="hover:text-green-600">Track Order</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-green-600">Quick Links</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#" className="hover:text-green-600">About Us</a></li>
            <li><a href="#" className="hover:text-green-600">Shop</a></li>
            <li><a href="#" className="hover:text-green-600">Contact</a></li>
            <li><a href="#" className="hover:text-green-600">FAQs</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-green-600">Follow Us</h3>
          <div className="flex space-x-4 mb-4 text-gray-500">
            <a href="#" className="hover:text-green-600"><FaFacebookF /></a>
            <a href="#" className="hover:text-green-600"><FaTwitter /></a>
            <a href="#" className="hover:text-green-600"><FaInstagram /></a>
            <a href="#" className="hover:text-green-600"><FaYoutube /></a>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-green-600">Download Our App</h3>
          <div className="flex space-x-4 text-gray-500">
            <a href="#" className="hover:text-green-600"><FaGooglePlay size={30} /></a>
            <a href="#" className="hover:text-green-600"><FaApple size={30} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
