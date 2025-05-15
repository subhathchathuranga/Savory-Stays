import { Link } from "react-router-dom";
import { PhoneCall, Mail, MapPin, Clock, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8" data-id="2kw4uvmvo" data-path="src/components/layout/Footer.tsx">
      <div className="container mx-auto px-4" data-id="3kqb2lhqv" data-path="src/components/layout/Footer.tsx">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-id="w10we381q" data-path="src/components/layout/Footer.tsx">
          {/* About Section */}
          <div data-id="k7mivru4q" data-path="src/components/layout/Footer.tsx">
            <h3 className="text-xl font-bold mb-4 text-orange-400" data-id="681sclhjx" data-path="src/components/layout/Footer.tsx">Savory Stays</h3>
            <p className="text-gray-300 mb-4" data-id="05fq9vvz7" data-path="src/components/layout/Footer.tsx">
              Offering delicious cuisine and comfortable accommodations in one 
              convenient location. Experience the perfect blend of culinary 
              excellence and warm hospitality.
            </p>
            <div className="flex space-x-4" data-id="cj1p76emv" data-path="src/components/layout/Footer.tsx">
              <a href="https://facebook.com" className="text-gray-300 hover:text-orange-400 transition-colors" data-id="rfvapuga2" data-path="src/components/layout/Footer.tsx">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-orange-400 transition-colors" data-id="qfwouzrnx" data-path="src/components/layout/Footer.tsx">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-orange-400 transition-colors" data-id="456vcpyke" data-path="src/components/layout/Footer.tsx">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div data-id="neu10013j" data-path="src/components/layout/Footer.tsx">
            <h3 className="text-xl font-bold mb-4 text-orange-400" data-id="l1u1zgv4s" data-path="src/components/layout/Footer.tsx">Quick Links</h3>
            <ul className="space-y-2" data-id="q9ejfioac" data-path="src/components/layout/Footer.tsx">
              <li data-id="14akqat2s" data-path="src/components/layout/Footer.tsx">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li data-id="i69x0qaf8" data-path="src/components/layout/Footer.tsx">
                <Link to="/menu" className="text-gray-300 hover:text-white transition-colors">
                  Restaurant Menu
                </Link>
              </li>
              <li data-id="dna23j58p" data-path="src/components/layout/Footer.tsx">
                <Link to="/rooms" className="text-gray-300 hover:text-white transition-colors">
                  Rooms & Suites
                </Link>
              </li>
              <li data-id="91xocr9u1" data-path="src/components/layout/Footer.tsx">
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li data-id="qu6htg9sv" data-path="src/components/layout/Footer.tsx">
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div data-id="ghhcm9h8n" data-path="src/components/layout/Footer.tsx">
            <h3 className="text-xl font-bold mb-4 text-orange-400" data-id="2zuv8cz8c" data-path="src/components/layout/Footer.tsx">Contact Info</h3>
            <ul className="space-y-3" data-id="behov5pwi" data-path="src/components/layout/Footer.tsx">
              <li className="flex items-start" data-id="7hjshwafg" data-path="src/components/layout/Footer.tsx">
                <MapPin className="mr-2 h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300" data-id="ruvbg7g5y" data-path="src/components/layout/Footer.tsx">
                  123 Culinary Lane, Gourmet City, GC 12345
                </span>
              </li>
              <li className="flex items-center" data-id="g5eajnr1o" data-path="src/components/layout/Footer.tsx">
                <PhoneCall className="mr-2 h-5 w-5 text-orange-400 flex-shrink-0" />
                <a href="tel:+11234567890" className="text-gray-300 hover:text-white transition-colors" data-id="rotdyn7ky" data-path="src/components/layout/Footer.tsx">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center" data-id="1illk33wa" data-path="src/components/layout/Footer.tsx">
                <Mail className="mr-2 h-5 w-5 text-orange-400 flex-shrink-0" />
                <a href="mailto:info@savorystays.com" className="text-gray-300 hover:text-white transition-colors" data-id="p3pshh0xc" data-path="src/components/layout/Footer.tsx">
                  info@savorystays.com
                </a>
              </li>
              <li className="flex items-start" data-id="2ubdajbvf" data-path="src/components/layout/Footer.tsx">
                <Clock className="mr-2 h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div className="text-gray-300" data-id="4jgcmpwii" data-path="src/components/layout/Footer.tsx">
                  <div data-id="drcg4lr7w" data-path="src/components/layout/Footer.tsx">Restaurant: 7 AM - 10 PM</div>
                  <div data-id="5cveeodho" data-path="src/components/layout/Footer.tsx">Reception: 24/7</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div data-id="u95ar0pyr" data-path="src/components/layout/Footer.tsx">
            <h3 className="text-xl font-bold mb-4 text-orange-400" data-id="4vs6wuh8s" data-path="src/components/layout/Footer.tsx">Newsletter</h3>
            <p className="text-gray-300 mb-4" data-id="76ty3hwj4" data-path="src/components/layout/Footer.tsx">
              Subscribe to our newsletter for special deals and updates
            </p>
            <form className="space-y-2" data-id="zaknf1015" data-path="src/components/layout/Footer.tsx">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                required data-id="54u9z0rfb" data-path="src/components/layout/Footer.tsx" />

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded transition-colors" data-id="3d1qwb814" data-path="src/components/layout/Footer.tsx">

                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-400 text-center" data-id="n5wf1yu5n" data-path="src/components/layout/Footer.tsx">
          <p data-id="60h2jo70u" data-path="src/components/layout/Footer.tsx">© {new Date().getFullYear()} Savory Stays. All rights reserved.</p>
          <div className="mt-2 space-x-4" data-id="9qpzma77x" data-path="src/components/layout/Footer.tsx">
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>);

};

export default Footer;